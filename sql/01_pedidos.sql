with
-- 01_pedidos.sql · Un registro por pedido, ya limpio y con la marca de exclusión (reglas en el README, «Modelado de datos»).
--   * excluido = pedido borrado (deleted_at), con alguna línea cobrada a menos del 50 % de la tarifa,
--                o sin ninguna línea de ficha activa
--   * las líneas con producto inexistente y las de fichas inactivas NO cuentan: el subtotal se recalcula con las líneas válidas
--   * canal normalizado: las 5 grafías de Meta Ads se unifican (Instagram Ads queda aparte)
--   * pais = país de envío del pedido · pais_cliente = país de registro del cliente
--   * nuevo_cliente = primer pedido válido y no cancelado del cliente
--   * devolución total = estado refunded (se devuelven todas sus líneas válidas)
--     devolución parcial = pedido delivered cuyo reembolso casa con k unidades de una línea válida
--   * descuento_pct = mayor discount_pct de sus códigos (el descuento no figura en los importes: el panel lo usa como sensibilidad)
lv as (
  select i.order_id, i.quantity, i.unit_price_cents
  from order_items i join products p on p.id = i.product_id and p.active
),
tot as (
  select order_id, sum(quantity * unit_price_cents) as cents, sum(quantity) as uds from lv group by 1
),
anomalo as (
  select distinct i.order_id from order_items i join products p on p.id = i.product_id
  where i.unit_price_cents < 0.5 * p.price_cents
),
reembolsos as (
  select order_id, sum(amount_cents) as amount_cents, min(created_at) as fecha, min(reason) as motivo from refunds group by 1
),
parcial as (
  select r.order_id, max(k) as uds
  from refunds r
  join orders o on o.id = r.order_id and o.status = 'delivered'
  join lv on lv.order_id = r.order_id
  cross join lateral generate_series(1, lv.quantity) k
  where k * lv.unit_price_cents = r.amount_cents
  group by 1
),
codigos as (
  select op.order_id, string_agg(pr.name, ' + ' order by pr.id) as codigos, max(pr.discount_pct) as dto
  from order_promotions op join promotions pr on pr.id = op.promotion_id group by 1
),
base as (
  select o.id, o.customer_id,
         case lower(btrim(o.channel)) when 'meta ads' then 'Meta Ads' else btrim(o.channel) end as canal,
         o.country as pais, cu.country as pais_cliente, o.status as estado, o.created_at as fecha,
         coalesce(t.cents, 0) / 100.0 as subtotal_eur,
         o.shipping_cents / 100.0 as envio_eur, o.tax_cents / 100.0 as iva_eur, o.total_amount_cents / 100.0 as total_eur,
         case when o.deleted_at is not null then 'Pedido borrado (deleted_at)'
              when a.order_id is not null  then 'Línea con precio anómalo (<50 % de tarifa)'
              when t.order_id is null      then 'Solo líneas de fichas inactivas o inexistentes'
         end as motivo_exclusion,
         c.codigos, coalesce(c.dto, 0) as descuento_pct,
         case when o.status = 'refunded' then coalesce(t.cents, 0) / 100.0
              when pa.order_id is not null then r.amount_cents / 100.0 end as reembolso_eur,
         case when o.status = 'refunded' or pa.order_id is not null then r.fecha end as fecha_reembolso,
         case when o.status = 'refunded' or pa.order_id is not null then r.motivo end as motivo_reembolso,
         coalesce(t.uds, 0) as unidades,
         case when o.status = 'refunded' then t.uds when pa.order_id is not null then pa.uds end as unidades_devueltas,
         case when o.status = 'refunded' then 'total' when pa.order_id is not null then 'parcial' end as tipo_devolucion
  from orders o
  join customers cu on cu.id = o.customer_id
  left join tot t on t.order_id = o.id
  left join anomalo a on a.order_id = o.id
  left join reembolsos r on r.order_id = o.id
  left join codigos c on c.order_id = o.id
  left join parcial pa on pa.order_id = o.id
)
select b.id, b.customer_id, b.canal, b.pais, b.pais_cliente, b.estado,
       to_char(b.fecha, 'YYYY-MM-DD') as fecha,
       b.subtotal_eur::float8 as subtotal_eur, b.envio_eur::float8 as envio_eur, b.iva_eur::float8 as iva_eur, b.total_eur::float8 as total_eur,
       b.motivo_exclusion, (b.motivo_exclusion is not null) as excluido, b.codigos,
       b.descuento_pct::int as descuento_pct,
       b.reembolso_eur::float8 as reembolso_eur, to_char(b.fecha_reembolso, 'YYYY-MM-DD') as fecha_reembolso, b.motivo_reembolso,
       b.unidades::int as unidades, b.unidades_devueltas::int as unidades_devueltas, b.tipo_devolucion,
       (b.motivo_exclusion is null and b.estado <> 'cancelled'
        and row_number() over (partition by b.customer_id
                               order by (b.motivo_exclusion is not null or b.estado = 'cancelled'), b.fecha, b.id) = 1) as nuevo_cliente
from base b
order by b.id
