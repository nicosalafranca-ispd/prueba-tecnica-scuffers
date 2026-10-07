with
-- C1 · Puente del subtotal bruto de H1 a la venta neta (README, conclusión 1).
-- Devuelve: una fila por paso, con los pedidos y el importe que entra o sale en cada uno.
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
-- puente de H1: del subtotal bruto de todos los pedidos a la venta neta
h as (select * from orders where created_at < date '2026-07-01')
select * from (values
 (1, 'Subtotal bruto H1, todos los pedidos',
     (select count(*) from h), (select round(sum(subtotal_cents)/100.0) from h)),
 (2, 'menos pedidos excluidos (borrados o con una línea a <50 % de tarifa)',
     -(select count(*) from h where id in (select id from ex)), -(select round(sum(subtotal_cents)/100.0) from h where id in (select id from ex))),
 (3, 'menos líneas de fichas inactivas (pedidos = los que se quedan sin ninguna línea)',
     -(select count(*) from h where id not in (select id from ex) and id not in (select id from pa)),
     -(select round(sum(i.quantity*i.unit_price_cents)/100.0) from order_items i join h on h.id = i.order_id join products pr on pr.id = i.product_id and not pr.active where h.id not in (select id from ex))),
 (4, 'menos cancelados',
     -(select count(*) from p where h1 and not venta), -(select round(sum(bruto)) from p where h1 and not venta)),
 (5, '= venta H1',
     (select count(*) from p where h1 and venta), (select round(sum(bruto)) from p where h1 and venta)),
 (6, 'menos devoluciones (pedidos = los que tienen alguna, siguen contando como pedido)',
     (select count(*) from p where h1 and venta and devuelto > 0), -(select round(sum(devuelto)) from p where h1 and venta)),
 (7, '= venta neta H1',
     (select count(*) from p where h1 and venta), (select round(sum(neto)) from p where h1 and venta)),
 (8, 'aparte: líneas de producto inexistente (no estaban en el subtotal de cabecera)',
     null, (select round(sum(i.quantity*i.unit_price_cents)/100.0) from order_items i join h on h.id = i.order_id left join products pr on pr.id = i.product_id where h.id not in (select id from ex) and pr.id is null))
) t(orden, paso, pedidos, eur)
order by orden
