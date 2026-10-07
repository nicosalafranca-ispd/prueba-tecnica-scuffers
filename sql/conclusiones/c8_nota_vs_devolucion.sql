with
-- C8 · Nota media frente a tasa de devolución, por producto (README, conclusión 8).
-- Devuelve: por producto: venta, unidades entregadas y devueltas, % de devolución, reseñas y nota media de H1.
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
-- producto: ventas H1, devolución por unidades, valoración H1 (>=10 reseñas)
dvl as (  -- unidades devueltas por línea
  select l.id, case when p.status='refunded' then l.quantity
    else coalesce((select max(k) from refunds r, generate_series(1,l.quantity) k where r.order_id=p.id and k*l.unit_price_cents=r.amount_cents),0) end ud
  from l join p on p.id=l.order_id where p.h1 and p.status in ('delivered','refunded')),
rv as (select product_id, count(*) n, round(avg(rating),2) nota from product_reviews where created_at<'2026-07-01' group by 1)
select l.name, l.category, sum(l.quantity) filter (where p.venta) uds, round(sum(l.quantity*l.unit_price_cents) filter (where p.venta)/100.0) bruto,
 sum(l.quantity) filter (where p.status in ('delivered','refunded')) entregadas, sum(dvl.ud) devueltas,
 round(100.0*sum(dvl.ud)/nullif(sum(l.quantity) filter (where p.status in ('delivered','refunded')),0),1) pct_dev, max(rv.n) resenas, max(rv.nota) nota,
 round(100*(1-avg(l.unit_price_cents::numeric/l.price_cents)),0) dto_fijo
from l join p on p.id=l.order_id and p.h1 left join dvl on dvl.id=l.id left join rv on rv.product_id=l.product_id
group by 1,2 order by bruto desc
