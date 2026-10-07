select
-- 02_lineas.sql · Líneas de pedido de fichas activas con su producto y categoría.
-- Las líneas con producto inexistente y las de fichas inactivas no entran (catálogo vivo).
i.id,
       i.order_id as pedido_id,
       i.product_id as producto_id,
       p.name as producto,
       p.category as categoria,
       p.active as activo,
       i.quantity as cantidad,
       (i.unit_price_cents / 100.0)::float8 as precio_eur,
       (i.quantity * i.unit_price_cents / 100.0)::float8 as importe_eur,
       (p.price_cents / 100.0)::float8 as tarifa_eur
from order_items i
join products p on p.id = i.product_id and p.active
order by i.id
