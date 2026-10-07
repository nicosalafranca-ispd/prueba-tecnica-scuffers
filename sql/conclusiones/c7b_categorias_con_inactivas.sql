with
-- C7 · Sensibilidad: la misma comparación de mayo-junio contando también las fichas inactivas (README, conclusión 7).
-- Devuelve: por categoría, referencias con venta, unidades, venta, peso, venta y unidades por referencia, venta de fichas inactivas y su venta de julio.
-- Reglas de limpieza (README, «Modelado de datos»): pedidos borrados o con alguna línea a <50 % de tarifa fuera, líneas con producto inexistente o ficha inactiva fuera,
-- canal normalizado, gasto en EUR con duplicados exactos contados una vez.
ex as (
  select o.id from orders o
  where o.deleted_at is not null
     or exists (select 1 from order_items i join products p on p.id = i.product_id
                where i.order_id = o.id and i.unit_price_cents < 0.5 * p.price_cents)
),
l as (
  select i.id, i.order_id, i.product_id, i.quantity, i.unit_price_cents, p.name, p.category, p.price_cents
  from order_items i join products p on p.id = i.product_id and p.active
  where i.order_id not in (select id from ex)
),
pa as (  -- todos los pedidos válidos (todas las fechas), con su venta de líneas activas
  select o.id, o.customer_id, o.country, o.status, o.created_at,
         case when lower(btrim(o.channel)) = 'meta ads' then 'Meta Ads' else btrim(o.channel) end as canal,
         sum(l.quantity * l.unit_price_cents) / 100.0 as bruto, sum(l.quantity) as uds
  from orders o join l on l.order_id = o.id
  group by 1, 2, 3, 4, 5, 6
),
dv as (  -- devuelto por pedido: entero si refunded, parcial si la línea que casa con el importe es de ficha activa
  select pa.id,
         case when pa.status = 'refunded' then pa.bruto
              else coalesce((select r.amount_cents / 100.0 from refunds r where r.order_id = pa.id
                              and exists (select 1 from l, generate_series(1, l.quantity) k
                                          where l.order_id = pa.id and k * l.unit_price_cents = r.amount_cents)), 0) end as devuelto
  from pa
),
p as (  -- pedidos válidos con venta neta, h1 = ene-jun
  select pa.*, dv.devuelto, pa.bruto - dv.devuelto as neto, pa.created_at < date '2026-07-01' as h1,
         pa.status <> 'cancelled' as venta
  from pa join dv using (id)
),
gasto as (
  select channel as canal, date as fecha,
         case when currency_unit = 'EUR_CENTS' then spend_raw / 100.0 else spend_raw end as eur
  from (select distinct channel, date, spend_raw, currency_unit from marketing_spend) d
),
nuevo as (  -- primer pedido de venta (no cancelado) de cada cliente
  select distinct on (customer_id) customer_id, id, canal, created_at
  from p where venta order by customer_id, created_at, id
),
-- líneas de TODAS las fichas (activas e inactivas) de pedidos válidos no cancelados (la CTE l solo tiene activas)
la as (
  select i.quantity, i.unit_price_cents, i.product_id, pr.category, pr.active, o.created_at f
  from order_items i join products pr on pr.id = i.product_id join orders o on o.id = i.order_id
  where i.order_id not in (select id from ex) and o.status <> 'cancelled'
),
mj as (select * from la where f >= date '2026-05-01' and f < date '2026-07-01')
select category, count(distinct product_id) refs, sum(quantity) uds,
 round(sum(quantity * unit_price_cents) / 100.0) venta,
 round(100.0 * sum(quantity * unit_price_cents) / sum(sum(quantity * unit_price_cents)) over (), 1) pct,
 round(sum(quantity * unit_price_cents) / 100.0 / count(distinct product_id)) venta_por_ref,
 round(sum(quantity)::numeric / count(distinct product_id), 1) uds_por_ref,
 round(sum(quantity * unit_price_cents) filter (where not active) / 100.0) venta_inactivas,
 (select round(sum(quantity * unit_price_cents) / 100.0) from la where la.category = mj.category and not la.active and la.f >= date '2026-07-01') julio_inactivas
from mj group by 1 order by venta desc
