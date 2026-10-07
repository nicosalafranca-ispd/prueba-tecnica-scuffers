select
-- 06_clientes.sql · Clientes registrados (tabla customers): país declarado y fecha de alta.
-- Sirve para separar «registrados» de «compradores» (clientes con al menos un pedido válido).
id, country as pais, to_char(created_at, 'YYYY-MM-DD') as alta
from customers
order by id
