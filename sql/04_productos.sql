select
-- 04_productos.sql · Fichas activas con su valoración media. Solo reseñas del primer semestre (hasta el 30-jun).
-- La valoración solo se compara entre productos con 10 o más reseñas.
p.id,
       p.name as producto,
       p.category as categoria,
       (p.price_cents / 100.0)::float8 as tarifa_eur,
       to_char(p.created_at, 'YYYY-MM-DD') as alta,
       p.active as activo,
       count(r.id)::int as resenas,
       round(avg(r.rating), 2)::float8 as valoracion
from products p
left join product_reviews r on r.product_id = p.id and r.created_at < date '2026-07-01'
where p.active
group by p.id
order by p.id
