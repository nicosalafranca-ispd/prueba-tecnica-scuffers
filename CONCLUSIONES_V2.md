# Scuffers · Conclusiones del primer semestre

> [!NOTE]
> Extracto del [README](README.md) (secciones 1 a 4) sin las queries SQL. Se genera a partir del README: si alguna vez difieren, vale el README.

---

<a id="resumen"></a>
## 1. Resumen ejecutivo

> [!IMPORTANT]
> **En una frase:** la venta (38.531 € netos) no crece y vive de clientes que repiten cada vez menos. H2 depende de captar, y captar cuesta 32–59 € por cliente en TikTok, Email y Google, frente a 167–725 € en Meta e Instagram.

### La historia en cinco pasos

Cada paso lleva al siguiente, y así está ordenado el documento:

1. **Vendimos 38.531 € netos**, unos 6.400 € al mes ([C1](#c1)).
2. **La venta no crece y vive de quien ya compraba:** en junio el 85 % viene de clientes previos y solo llegan 10 clientes nuevos ([C2](#c2)).
3. **Esa base es pequeña, muy alemana y cada vez menos fiel:** 28 alemanes hacen el 49,3 % de la venta y la recompra a 30 días cae del 82,8 % al 42,1 % ([C3](#c3), [C4](#c4)).
4. **Por eso H2 depende de captar, y el coste cambia mucho según el canal:** de 32 € a 725 € por cliente nuevo. TikTok vendió más gastando 20 veces menos ([C5](#c5), [C6](#c6)).
5. **En producto:** Deporte, en su periodo, vende menos por referencia que el resto. La nota no anticipa las devoluciones. El ingreso por código está mal medido ([C7](#c7), [C8](#c8), [C9](#c9)).

### Las 9 conclusiones de un vistazo

Confianza: 🟢 alta · 🟡 media · 🔴 baja ([qué significa](#confianza)).

| | Conclusión | Cifra clave | Qué hacer | Confianza |
|---|---|---|---|:---:|
| [**C1**](#c1) | El semestre deja 38.531 € de venta neta | 6.400 €/mes · −24 % frente al bruto | Presupuestar sobre la venta neta | 🟢 |
| [**C2**](#c2) | La venta no crece y depende de quien ya compraba | 85 % de clientes previos · 10 nuevos en junio | Recuperar Orgánico · ≥ 20 nuevos al mes | 🟡 |
| [**C3**](#c3) | Alemania hace la mitad de la venta con el 21 % de los compradores | 678 € frente a 190 € por cliente | Test de captación en Alemania · cuidar a los 20 mayores | 🟢 |
| [**C4**](#c4) | Cada cohorte repite menos | 82,8 % → 42,1 % a 30 días | Mensaje de segundo pedido | 🟡 |
| [**C5**](#c5) | Email, Google y TikTok captan mucho más barato que Meta e Instagram | 32–59 € frente a 167–725 € | Mover presupuesto a Email y Google | 🔴 🟡 |
| [**C6**](#c6) | TikTok vendió más gastando 20 veces menos | 263 € → 32 € por cliente nuevo | Subir solo por tramos | 🟡 |
| [**C7**](#c7) | Deporte, en su periodo, vende menos por referencia | 7,1 % de la venta · 472 € frente a 594–709 € | Apuesta acotada | 🔴 |
| [**C8**](#c8) | La nota no anticipa la devolución | Cargo: 5,0★ y 14,3 % · Oversize: 3,21★ y 1,2 % | Guía de tallas · medir por la devolución | 🟡 |
| [**C9**](#c9) | El ingreso por código está inflado | +9,8 % · ningún código rebaja el precio | Registrar el descuento · códigos por canal | 🟢 |

### Respuesta a las cuatro preguntas de dirección

| Pregunta | Respuesta corta | Dónde |
|---|---|---|
| **1. ¿Cuánto hemos vendido y cómo ha evolucionado?** | 38.531 € netos, sin tendencia (entre 4.738 y 8.436 € al mes) y cada vez más dependientes de clientes que ya compraban | [C1](#c1) · [C2](#c2) · [C3](#c3) · [C4](#c4) |
| **2. ¿Qué canales merecen más inversión y cuáles menos?** | **Más:** Email y Google (41 y 59 € por cliente nuevo) y TikTok por tramos (32 €). **Menos:** Meta (167 €) e Instagram (725 €) | [C5](#c5) · [C6](#c6) |
| **3. ¿Qué categorías y productos funcionan?** | En mayo–junio, Ropa hace el 42,7 % de la venta y Deporte el 7,1 % con solo 2 referencias, pero cada una vende menos (472 € frente a 594–709 €). Pantalón Cargo y Zapatillas Classic devuelven más del 13 % | [C7](#c7) · [C8](#c8) · [C9](#c9) |
| **4. ¿Qué haríamos distinto en H2, y con qué cifra?** | Mover dinero de Meta e Instagram a Email y Google, recuperar la captación orgánica, trabajar el segundo pedido y medir bien los códigos | [Plan para H2](#plan) |

---

<a id="antes"></a>
## 2. Antes de leer

> [!NOTE]
> **Venta neta** = subtotal de producto (sin IVA ni envío) de los pedidos válidos y no cancelados de H1, menos lo devuelto. **Solo cuentan las fichas activas del catálogo.** Es la cifra con la que se presupuesta, y todas las conclusiones la usan salvo que digan otra cosa. Las reglas completas están en [Modelado de datos](README.md#modelado).

<details>
<summary>📖 <b>Glosario</b> · 11 términos</summary>

| Término | Qué significa aquí |
|---|---|
| **H1** | 1 de enero a 30 de junio de 2026. Julio (hasta el día 12) se muestra aparte |
| **Venta** | Subtotal de producto de los pedidos entregados, pendientes y devueltos. Los cancelados no son venta |
| **Venta neta** | Venta menos devoluciones, totales y parciales |
| **Cliente nuevo** | Cliente en su primer pedido válido no cancelado. Se asigna al mes y al canal de ese pedido |
| **Cliente previo** | Cliente cuyo primer pedido es de un mes anterior |
| **Coste por cliente nuevo** | Gasto del canal ÷ clientes nuevos que llegaron por ese canal en el mismo tramo |
| **IEC** | Índice de Eficiencia de Canal de la nota de dirección: venta neta atribuida al canal ÷ gasto del canal |
| **Recompra a 30 días** | % de clientes de una cohorte que hacen un segundo pedido en los 30 días siguientes al primero |
| **Cohorte** | Clientes agrupados por el mes de su primer pedido |
| **Tasa de devolución** | Pedidos con alguna devolución ÷ pedidos entregados o devueltos |
| **Catálogo vivo** | Fichas de producto con `active = true` (nota de dirección 4) |

</details>

<a id="confianza"></a>
<details>
<summary>🧭 <b>Cómo se lee cada conclusión</b> · estructura y niveles de confianza</summary>

| Parte | Qué contiene | ¿Visible? |
|---|---|---|
| **Título** | La conclusión, con su cifra y su punto de comparación | Sí |
| **Ficha** (🎯 📊 🧾) | Pregunta de dirección a la que responde, confianza, dónde se ve en el panel y query principal | Sí |
| **Qué dice el dato** | El hecho, con su tabla | Sí |
| **Por qué importa** | Qué debería hacer el negocio, con cifra | Sí |
| 📐 **Cómo lo he calculado** | El criterio exacto: qué incluye y qué excluye | Desplegable |
| 🧾 **Query SQL** | La query exacta, que se copia y se ejecuta tal cual | Desplegable |
| ➕ **Más detalle** | Sensibilidades y notas de dirección, cuando las hay | Desplegable |

**Niveles de confianza:**
- 🟢 **Alta:** cifra contable, o diferencia grande con muestra suficiente.
- 🟡 **Media:** tendencia clara con grupos de 10 a 30 clientes.
- 🔴 **Baja:** pocos casos. Indica la dirección, no la magnitud.

</details>

---

<a id="conclusiones"></a>
## 3. Conclusiones

<a id="bloque-a"></a>
### Bloque A · Cuánto hemos vendido y cómo ha evolucionado

> [!NOTE]
> **Pregunta 1 de dirección.** Primero fijamos la cifra con la que se presupuesta y después vemos cómo se ha movido mes a mes.
>
> **Respuesta corta:** 38.531 € netos, sin tendencia, y cada mes con más peso de los clientes que ya compraban.

<a id="c1"></a>
#### C1 · El semestre deja 38.531 € de venta neta, unos 6.400 € al mes: un 24 % menos que los 50.827 € de subtotal bruto

> 🎯 **Responde a:** Pregunta 1 &nbsp;·&nbsp; **Confianza:** 🟢 Alta (cifra contable)<br>
> 📊 **Panel:** Resumen › Indicadores clave &nbsp;·&nbsp; 🧾 **Query:** [`c1_venta_neta_h1.sql`](sql/conclusiones/c1_venta_neta_h1.sql)

**Qué dice el dato:** En H1 hay 614 pedidos con venta, un ticket medio de 68,47 €, 1.184 unidades y 131 compradores. Del subtotal bruto a la venta neta se pierde un 24 %, sobre todo por cancelados y devoluciones:

| Paso | Pedidos | Importe |
|---|---:|---:|
| Subtotal bruto de H1, todos los pedidos | 719 | 50.827 € |
| − Pedidos excluidos (borrados o con una línea a menos del 50 % de tarifa) | −19 | −702 € |
| − Líneas de fichas inactivas (18 pedidos se quedan sin ninguna línea) | −18 | −3.358 € |
| − Cancelados | −68 | −4.727 € |
| **= Venta H1** | **614** | **42.041 €** |
| − Devoluciones (58 pedidos: 45 enteros y 13 parciales) | | −3.510 € |
| **= Venta neta H1** | **614** | **38.531 €** |

Si los códigos hubieran aplicado el descuento que prometen, la venta neta sería de **37.217 €** (−1.314 €, −3,4 %).

**Por qué importa:**
- **Base para presupuestar H2:** unos 6.400 € netos al mes, no los 50.000 € del subtotal bruto.
- **Qué cifra usar:** según la nota de dirección, finanzas usa la que no contempla descuentos (38.531 €). Si quieren contemplarlos, es 37.217 €.
- **Qué registrar desde ya:** el descuento aplicado en cada pedido (ver [C9](#c9)).

<details>
<summary>📐 <b>Cómo lo he calculado</b></summary>

- **Pedidos:** válidos de H1 y no cancelados. Los pendientes cuentan como venta.
- **Venta:** cantidad × precio cobrado, en las líneas de fichas activas. Sin IVA ni envío.
- **Devoluciones restadas:**
  - Enteras: pedidos en estado `refunded`, por todas sus líneas.
  - Parciales: el reembolso que casa con k unidades de una línea.
- **Otras queries:** el puente está en `c1b_puente_ventas.sql`. El descuento teórico (el mayor `discount_pct` del pedido) está en `c1c_descuento_teorico.sql`.
- **Julio (1 al 12), aparte:** 39 pedidos y 2.587 € netos.

</details>

<a id="c2"></a>
#### C2 · La venta no crece y depende cada vez más de quien ya compraba: en junio el 85 % viene de clientes previos y solo llegan 10 clientes nuevos

> 🎯 **Responde a:** Pregunta 1 &nbsp;·&nbsp; **Confianza:** 🟡 Media (seis meses de serie y solo 10 clientes nuevos en junio)<br>
> 📊 **Panel:** Clientes › Pedidos por mes: nuevos y recurrentes &nbsp;·&nbsp; 🧾 **Query:** [`c2_evolucion_mensual.sql`](sql/conclusiones/c2_evolucion_mensual.sql)

**Qué dice el dato:**
- **Sin tendencia:** la venta neta mensual oscila entre 4.738 y 8.436 €.
- **Más peso de los clientes previos:** pasan del 56 % de la venta en febrero al 85 % en junio.
- **Menos clientes nuevos:** caen de 29 en enero a 10 en junio. La caída de junio es de Orgánico, no de los canales de pago.

| | Ene | Feb | Mar | Abr | May | Jun |
|---|---:|---:|---:|---:|---:|---:|
| Venta neta | 7.067 € | 4.738 € | 5.992 € | 8.436 € | 6.454 € | 5.843 € |
| % de la venta de clientes previos | — | 56 % | 72 % | 72 % | 80 % | **85 %** |
| **Clientes nuevos** | **29** | **25** | **22** | **26** | **19** | **10** |
| … de Orgánico | 9 | 12 | 12 | 6 | 9 | **3** |
| … de canales de pago | 18 | 11 | 9 | 15 | 7 | 7 |
| … de Newsletter y Direct | 2 | 2 | 1 | 5 | 3 | 0 |

**Por qué importa:**
- **H2 no crecerá sin captar.** La venta de los clientes previos aguanta, pero cada cohorte repite menos ([C4](#c4)).
- **La caída de junio viene de Orgánico** (de 12 clientes nuevos en marzo a 3 en junio), no de los canales de pago (7, igual que en mayo). Antes de mover presupuesto hay que revisar el SEO y el alta web de junio.
- **Objetivo para H2:** 20 o más clientes nuevos al mes. La media de febrero a mayo fue de 23.

<details>
<summary>📐 <b>Cómo lo he calculado</b></summary>

- **Cliente nuevo:** cliente en su primer pedido válido no cancelado, en el mes y el canal de ese pedido.
- **% de clientes previos:** venta neta del mes de clientes cuyo primer pedido es de un mes anterior. En enero no se puede calcular porque no hay historia previa.
- **Canales de pago:** Email, Google, Meta, Instagram y TikTok. El origen por canal está en `c2b_nuevos_por_origen.sql`.

</details>

---

<a id="bloque-b"></a>
### Bloque B · Quién compra y si vuelve

> [!NOTE]
> **Preguntas 1 y 4.** Si la venta se sostiene en quien ya compraba, hay que saber quién es esa base y si sigue volviendo.
>
> **Respuesta corta:** es una base pequeña y concentrada en Alemania, y cada nueva cohorte repite menos que la anterior.

<a id="c3"></a>
#### C3 · 28 compradores alemanes (21,4 %) hacen el 49,3 % de la venta neta: cada uno deja 678 €, frente a 190 € uno español

> 🎯 **Responde a:** Preguntas 1 y 4 &nbsp;·&nbsp; **Confianza:** 🟢 Alta (diferencia estructural: 9,4 frente a 3,4 pedidos por cliente)<br>
> 📊 **Panel:** Clientes › Compradores por país de registro &nbsp;·&nbsp; 🧾 **Query:** [`c3_alemania_pais_registro.sql`](sql/conclusiones/c3_alemania_pais_registro.sql)

**Qué dice el dato:** Alemania y España venden casi lo mismo con un número de compradores muy distinto. Los 20 mayores clientes suman el 53,5 % de la venta neta (los 10 mayores, el 35,2 %), y 17 de esos 20 son alemanes. **Alemania y la dependencia de los mejores clientes son el mismo riesgo.**

| | 🇩🇪 Alemania | 🇪🇸 España |
|---|---:|---:|
| Compradores | 28 (21,4 %) | 103 (78,6 %) |
| Venta neta | 18.979 € (49,3 %) | 19.552 € (50,7 %) |
| Pedidos por cliente | 9,4 | 3,4 |
| **Venta neta por cliente** | **678 €** | **190 €** |
| Entre los 20 mayores clientes | 17 | 3 |
| Con 10 o más pedidos | 13 | 6 |

**Por qué importa:**
- **Un cliente alemán vale unas 3,6 veces uno español,** así que en Alemania se puede aceptar un coste por cliente nuevo mayor. Conviene probarlo con un test de captación allí.
- **Para medirlo hay que etiquetar el país en el gasto de marketing.** Hoy el gasto no tiene país.
- **Alerta de inactividad para los 20 mayores clientes,** que hacen más de la mitad de la venta.

<details>
<summary>📐 <b>Cómo lo he calculado</b></summary>

- **País:** país de registro del cliente (`customers.country`). Venta neta de H1.
- **Concentración:** en `c3b_concentracion_top20.sql`.
- **Con el país de envío de los pedidos:** el reparto apenas cambia (ver [supuestos](README.md#supuestos)).

</details>

<a id="c4"></a>
#### C4 · Cada cohorte repite menos: vuelve a comprar en 30 días el 82,8 % de los captados en enero y solo el 42,1 % de los de mayo

> 🎯 **Responde a:** Preguntas 1 y 4 &nbsp;·&nbsp; **Confianza:** 🟡 Media (cohortes de 19 a 29 clientes, pero la caída es continua durante cinco meses)<br>
> 📊 **Panel:** Clientes › Valor y frecuencia (recompra global; la recompra por cohorte solo está en la query) &nbsp;·&nbsp; 🧾 **Query:** [`c4_recompra_cohortes.sql`](sql/conclusiones/c4_recompra_cohortes.sql)

**Qué dice el dato:** La recompra a 30 días baja todos los meses, sin excepción. A 90 días, un cliente nuevo de febrero a abril deja 232 € netos, la mitad que uno de enero (464 €).

| Cohorte | Ene | Feb | Mar | Abr | May |
|---|---:|---:|---:|---:|---:|
| Clientes nuevos | 29 | 25 | 22 | 26 | 19 |
| Repiten en 30 días | 24 | 18 | 14 | 13 | 8 |
| **% que repite** | **82,8 %** | **72,0 %** | **63,6 %** | **50,0 %** | **42,1 %** |

**Por qué importa:** Captar no basta si lo captado repite cada vez menos. Para H2:
- **Mensaje de segundo pedido** a los 10 días del primero.
- **KPI mensual:** recompra a 30 días de la última cohorte.
- **Valorar la captación a 232 € por cliente a 90 días,** no con la media del semestre.

<details>
<summary>📐 <b>Cómo lo he calculado</b></summary>

- **Recompra:** un segundo pedido válido no cancelado dentro de los 30 días siguientes al primero.
- **Cohortes incluidas:** solo las que tienen 30 días observables hasta el 12 de julio (primer pedido hasta el 12 de junio). Junio queda fuera: solo 6 de sus clientes los tienen.
- **Valor a 90 días:** cohortes con primer pedido hasta el 13 de abril, en `c4b_valor_90_dias.sql`.

</details>

<details>
<summary>➕ <b>Más detalle</b> · cliente activo según la nota de dirección 3</summary>

Con la definición de **cliente activo** de la nota de dirección 3 (al menos un pedido entregado) hay 129 activos con un 75,2 % de recompra, frente a 131 compradores y un 80,2 %. La query está en `c4c_cliente_activo_nota3.sql`.

</details>

---

<a id="bloque-c"></a>
### Bloque C · Qué canales merecen más inversión

> [!NOTE]
> **Pregunta 2 de dirección.** Con una base que se desgasta, H2 depende de captar. Por el cambio de atribución de marzo, los canales se comparan de marzo a junio, y por **coste por cliente nuevo**, porque el presupuesto que se decide es de captación.
>
> **Respuesta corta:** más a Email y Google, TikTok por tramos y menos a Meta e Instagram.

<a id="c5"></a>
#### C5 · Desde marzo, captar un cliente nuevo cuesta 32–59 € en TikTok, Email y Google, frente a 167 € en Meta y 725 € en Instagram

> 🎯 **Responde a:** Pregunta 2 &nbsp;·&nbsp; **Confianza:** 🔴 Baja en las cifras exactas (TikTok capta 5 clientes, Meta 6 e Instagram 1) · 🟡 media en el orden, que no cambia al unir canales<br>
> 📊 **Panel:** Marketing › Qué canal capta clientes más barato &nbsp;·&nbsp; 🧾 **Query:** [`c5_coste_cliente_nuevo_canal.sql`](sql/conclusiones/c5_coste_cliente_nuevo_canal.sql)

**Qué dice el dato:** Por cada cliente nuevo, Meta cuesta casi 3 veces más que Google, e Instagram 12 veces más. La mayor parte de la venta que se atribuye a cada canal de pago (entre el 75,5 % y el 92,5 %) es recompra de clientes ya captados.

| Canal | Gasto | Clientes nuevos | **Coste por cliente nuevo** | % de su venta que es recompra |
|---|---:|---:|---:|---:|
| TikTok | 160 € | 5 | **32 €** | 92,5 % |
| Email | 449 € | 11 | **41 €** | 83,3 % |
| Google | 883 € | 15 | **59 €** | 75,5 % |
| Meta | 1.004 € | 6 | **167 €** | 89,8 % |
| Instagram | 725 € | 1 | **725 €** | 80,7 % |

Sin gasto, Orgánico capta 30 clientes nuevos en el mismo tramo, Newsletter 8 y Direct 1.

**Por qué importa:** Plan para H2, sin cambiar el presupuesto total:
- **Pausar Instagram como test:** 725 € en cuatro meses, unos 180 € al mes.
- **Bajar Meta.**
- **Llevar ese dinero a Email y Google,** con un tope de 59 € por cliente nuevo.
- **TikTok, solo por tramos** ([C6](#c6)).

> [!TIP]
> **Cuenta de ejemplo.** Si los unos 1.090 € que Instagram gastaría en H2 rindieran como Google (59 € por cliente), serían unos 18 clientes nuevos en vez de 1 o 2. A 232 € netos por cliente a 90 días ([C4](#c4)), son unos 4.200 € de venta. El cálculo supone que Google mantiene su coste medio con más gasto, algo que estos datos no permiten comprobar ([limitaciones](README.md#limitaciones)).

<details>
<summary>📐 <b>Cómo lo he calculado</b></summary>

- **Gasto:** del 1 de marzo al 30 de junio, en euros (Google Ads viene en céntimos) y con las filas duplicadas contadas una vez.
- **Clientes nuevos:** los clientes cuyo primer pedido válido no cancelado llegó por ese canal en ese tramo.
- **% de recompra:** parte de la venta neta atribuida al canal que no es primer pedido.
- **Canales unidos, como en el anexo** (`c5b_canales_unidos.sql`): Meta + Instagram cuestan 247 € por cliente nuevo y Email + Newsletter, 24 €. La decisión no cambia.

</details>

<details>
<summary>➕ <b>Más detalle</b> · IEC y ticket por canal (notas de dirección 1 y 6): se aplican, pero no sirven para decidir</summary>

| Canal | IEC (venta neta ÷ gasto) | Ticket medio | % de pedidos a Alemania |
|---|---:|---:|---:|
| TikTok | 15,5× | 67,6 € | 50 % |
| Email | 7,9× | 62,2 € | 25 % |
| Google | 4,3× | 61,4 € | 33 % |
| Meta | 5,0× | 78,5 € | 83 % |
| Instagram | 0,8× | 73,7 € | 75 % |

- **IEC (nota 1):** mide sobre todo recompra, así que no sirve para repartir un presupuesto de captación.
- **Ticket medio por canal (nota 6):**
  - Pone arriba a Meta e Instagram porque el 83 % y el 75 % de sus pedidos van a Alemania.
  - Mide el país, no la eficiencia del canal, y no tiene en cuenta el gasto.
  - **No creemos que sea una medida válida para comparar canales.**

</details>

<a id="c6"></a>
#### C6 · TikTok vendió más al mes gastando 20 veces menos: 788 €/mes en enero–febrero frente a 40 €/mes desde marzo

> 🎯 **Responde a:** Preguntas 2 y 4 &nbsp;·&nbsp; **Confianza:** 🟡 Media (antes y después sin grupo de control, pero con un recorte del 95 % y sin caída de venta)<br>
> 📊 **Panel:** Marketing › Evolución &nbsp;·&nbsp; 🧾 **Query:** [`c6_tiktok_antes_despues.sql`](sql/conclusiones/c6_tiktok_antes_despues.sql)

**Qué dice el dato:** Con un 95 % menos de gasto, TikTok hizo más pedidos al mes y su coste por cliente nuevo pasó de 263 € a 32 €. En el mismo cambio, el gasto total en marketing bajó un 47 % y la venta neta total subió un 13 %.

| Media mensual | Ene–feb | Mar–jun |
|---|---:|---:|
| Gasto en TikTok | 788 € | 40 € |
| Pedidos de TikTok | 9,0 | 10,5 |
| Venta neta atribuida a TikTok | 527 € | 621 € |
| Clientes nuevos de TikTok (en todo el tramo) | 6 | 5 |
| **Coste por cliente nuevo de TikTok** | **263 €** | **32 €** |
| Gasto total en marketing | 1.511 € | 805 € |
| Venta neta total | 5.903 € | 6.681 € |

**Por qué importa:** El gasto de enero y febrero no compraba ventas.
- **No volver a ese nivel:** serían unos 4.700 € en H2 sin retorno visible.
- **Si se sube, que sea por tramos:** por ejemplo, 120 € al mes durante 8 semanas. Se mantiene solo si el cliente nuevo cuesta menos de 59 €, lo que cuesta en Google.

<details>
<summary>📐 <b>Cómo lo he calculado</b></summary>

- **Medias mensuales:** los tramos duran 2 y 4 meses, así que se comparan por mes.
- **Venta atribuida:** venta neta de los pedidos con canal TikTok Ads.
- **Coste por cliente nuevo:** gasto del tramo ÷ clientes nuevos que llegaron por TikTok en ese tramo.

</details>

---

<a id="bloque-d"></a>
### Bloque D · Qué productos funcionan y qué no se puede medir

> [!NOTE]
> **Pregunta 3 de dirección.** Qué categorías y productos funcionan. Se incluyen aquí los códigos promocionales, porque cambian cómo se mide la venta.
>
> **Respuesta corta:** Deporte, en su periodo, vende menos por referencia que el resto. La nota no anticipa las devoluciones. El ingreso por código está mal medido.

<a id="c7"></a>
#### C7 · Desde que existe (mayo–junio), Deporte hace el 7,1 % de la venta con 2 referencias, pero cada una vende 472 €, por debajo de los 594–709 € del resto

> 🎯 **Responde a:** Pregunta 3 &nbsp;·&nbsp; **Confianza:** 🔴 Baja (2 referencias activas y dos meses de historia)<br>
> 📊 **Panel:** Producto › Categorías desde que existe Deporte &nbsp;·&nbsp; 🧾 **Query:** [`c7_categorias_deporte.sql`](sql/conclusiones/c7_categorias_deporte.sql)

> [!WARNING]
> **El enunciado lleva a error.** El anexo dice que las cuatro categorías están «en catálogo desde principios de año». Pero las fichas de Deporte se dan de alta el 1 de mayo, y no tiene ninguna venta antes. Si se compara el semestre entero, Deporte parece residual (2,2 % de la venta), cuando solo estuvo a la venta dos de los seis meses. **Omitimos esa indicación y comparamos las categorías solo en mayo y junio.**

**Qué dice el dato:** En mayo y junio, Deporte hace el 7,1 % de la venta con 2 de las 21 referencias activas. Por referencia vende menos que cualquier otra categoría. Por unidades vende más que Calzado, y ninguna de sus unidades se ha devuelto. Su venta es estable: 481 € en mayo y 463 € en junio.

| Categoría (may–jun) | Referencias | Venta | Peso | **Venta por referencia** | Unidades por referencia | Precio medio | Devolución (unidades) |
|---|---:|---:|---:|---:|---:|---:|---:|
| Ropa | 8 | 5.671 € | 42,7 % | **709 €** | 20,1 | 35,23 € | 8,8 % |
| Calzado | 5 | 3.103 € | 23,4 % | **621 €** | 9,4 | 66,02 € | 6,4 % |
| Accesorios | 6 | 3.564 € | 26,8 % | **594 €** | 22,7 | 26,21 € | 7,1 % |
| Deporte | 2 | 944 € | 7,1 % | **472 €** | 16,5 | 28,62 € | 0 % |

**Por qué importa:**
- **Deporte no es una categoría residual.** El 2,2 % del semestre era un efecto de calendario.
- **Aún no justifica ser la gran apuesta de H2:** cada referencia vende menos que en el resto de categorías, y la venta no crece de mayo a junio.
- **Tiene argumentos a favor:** cero devoluciones (0 de 29 unidades entregadas) y más unidades por referencia que Calzado.
- **Propuesta: apuesta acotada.**
  - Ampliar referencias por tramos.
  - Mantener cada referencia solo si alcanza la venta por referencia de Accesorios (594 € cada dos meses).
  - Antes, aclarar el estado de Mochila Deporte y Camiseta Técnica, que están marcadas como inactivas pero se venden.

<details>
<summary>📐 <b>Cómo lo he calculado</b></summary>

- **Periodo:** pedidos no cancelados del 1 de mayo al 30 de junio, el único tramo con las cuatro categorías a la venta.
- **Venta:** líneas de fichas activas, a precio cobrado y sin restar devoluciones.
- **Venta por referencia:** venta ÷ referencias con venta en el tramo.
- **Devolución:** unidades devueltas ÷ unidades de pedidos entregados o devueltos, con el mismo criterio que [C8](#c8).

</details>

<details>
<summary>➕ <b>Más detalle</b> · si se cuentan las fichas inactivas (nota de dirección 4)</summary>

La nota de dirección 4 deja fuera dos referencias de Deporte, Mochila Deporte y Camiseta Técnica, que siguen vendiendo en julio. Contándolas (`c7b_categorias_con_inactivas.sql`), Deporte sube al **15,0 %** de la venta de mayo–junio y a **544 € por referencia**. Sigue siendo la categoría que menos vende por referencia.

</details>

<a id="c8"></a>
#### C8 · La nota de las reseñas no anticipa la devolución: Pantalón Cargo (5,0★) devuelve el 14,3 % y Camiseta Oversize (3,21★) el 1,2 %

> 🎯 **Responde a:** Pregunta 3 &nbsp;·&nbsp; **Confianza:** 🟡 Media (cada producto devuelve entre 0 y 10 unidades)<br>
> 📊 **Panel:** Producto › Productos · Operaciones › Devoluciones &nbsp;·&nbsp; 🧾 **Query:** [`c8_nota_vs_devolucion.sql`](sql/conclusiones/c8_nota_vs_devolucion.sql)

**Qué dice el dato:** En H1 se devuelve el 9,9 % de los pedidos (58 de 588: 45 enteros y 13 parciales) y el 8,3 % de las unidades. En los 10 productos con 10 o más reseñas, la nota y la devolución no van juntas:

| Producto | Nota media H1 | Reseñas | **Devolución (unidades)** |
|---|---:|---:|---:|
| Pantalón Cargo | 5,0 | 16 | **14,3 %** (10 de 70) |
| Bolso Bandolera | 4,33 | 15 | 7,5 % |
| Vestido Midi | 4,27 | 11 | 10,6 % |
| Zapatillas Classic | 4,25 | 12 | **13,9 %** (5 de 36) |
| Zapatillas Running | 4,0 | 10 | 0 % |
| Gorra Bordada | 3,96 | 28 | 8,9 % |
| Gafas de Sol | 3,86 | 14 | 6,3 % |
| Top Básico | 3,7 | 20 | 7,6 % |
| Calcetines Pack 3 | 3,5 | 10 | 9,8 % |
| Camiseta Oversize | 3,21 | 14 | **1,2 %** (1 de 85) |

**Por qué importa:**
- **Medir la calidad por la devolución,** no por la nota.
- **Primer paso: guía de tallas** en Pantalón Cargo y Zapatillas Classic. Son las que más devuelven, unas 1,7 veces la media (8,3 %).
- **No frenar Camiseta Oversize** por su nota: tiene la peor nota y solo devuelve el 1,2 %.

<details>
<summary>📐 <b>Cómo lo he calculado</b></summary>

- **Unidades devueltas:**
  - Si el pedido se devolvió entero, todas sus unidades.
  - Si fue parcial, las k unidades de la línea que casa con el importe reembolsado.
- **Base:** unidades de los pedidos entregados o devueltos de H1.
- **Reseñas:** solo de H1, y solo productos con 10 o más.
- **Tasa global:** en `c8b_devolucion_global.sql`.

</details>

<a id="c9"></a>
#### C9 · El «ingreso por código» que pide la nota de dirección se infla un 9,8 % (12.311 € frente a 11.210 €), y ningún código rebaja el precio

> 🎯 **Responde a:** Preguntas 3 y 4 &nbsp;·&nbsp; **Confianza:** 🟢 Alta (es aritmética sobre la tabla de códigos)<br>
> 📊 **Panel:** Promociones › Ingreso por código: por qué no está bien medido &nbsp;·&nbsp; 🧾 **Query:** [`c9_ingreso_por_codigo.sql`](sql/conclusiones/c9_ingreso_por_codigo.sql)

**Qué dice el dato:**
- **Inflado:** cruzando pedidos y códigos tal cual, como pide la nota 7, el ingreso por código suma 12.311 €. Contando cada pedido una vez son 11.210 € (188 pedidos), porque 20 pedidos llevan dos códigos.
- **Sin descuento:** ningún pedido refleja el descuento. El precio cobrado es el mismo con código y sin él.

| Código | Descuento que promete | Usos | Ingreso cruzado |
|---|---:|---:|---:|
| Newsletter −10 % | 10 % | 98 | 5.660 € |
| Black Week | 15 % | 46 | 2.946 € |
| Bienvenida | 5 % | 43 | 2.295 € |
| Flash Sale Marzo | 20 % | 21 | 1.409 € |
| **Total del cruce** | | **208** | **12.311 €** |
| **Contando cada pedido una vez** | | **188 pedidos** | **11.210 €** |

**Por qué importa:** **No creemos que esté bien medido.** Suma venta a precio lleno, cuenta dos veces los pedidos con dos códigos y no dice si el código generó la venta. Antes de presupuestar promociones en H2:
- **Registrar** el descuento aplicado en cada pedido.
- **Usar códigos únicos por canal.**
- **Mientras tanto, usar 11.210 €** como venta de pedidos con código.

<details>
<summary>📐 <b>Cómo lo he calculado</b></summary>

- **Ingreso por código:** venta neta de los pedidos de H1 no cancelados con código, cruzados con `order_promotions`.
- **Recuento único:** en `c9b_ingreso_por_codigo_una_vez.sql`.
- **Descuento que se habría aplicado:** en `c1c_descuento_teorico.sql`.

</details>

---

<a id="plan"></a>
## 4. Plan para H2: qué hacer distinto y con qué cifra

Cada acción lleva la cifra que la justifica y cómo saber si funciona. Están ordenadas por impacto en el presupuesto de marketing.

#### 🎯 Captación y canales

| # | Qué hacer | La cifra que lo justifica | Cómo saber si funciona | Base |
|---|---|---|---|---|
| 1 | **Pausar Instagram como test y bajar Meta** | 725 € y 167 € por cliente nuevo, frente a 41–59 € en Email y Google | Coste por cliente nuevo, cada mes y por canal | [C5](#c5) |
| 2 | **Llevar ese dinero a Email y Google** | 11 y 15 clientes nuevos desde marzo. Los unos 1.090 € de Instagram en H2 serían unos 18 clientes en Google | Que su coste por cliente nuevo no pase de 59 € | [C5](#c5) |
| 3 | **TikTok, solo por tramos:** 120 €/mes durante 8 semanas | Vendió más con 40 €/mes que con 788 €/mes. Volver a 788 € serían unos 4.700 € en H2 sin retorno visible | Mantener solo si el cliente nuevo cuesta menos de 59 € | [C6](#c6) |
| 4 | **Recuperar la captación orgánica:** revisar el SEO y el alta web | Orgánico pasa de 12 clientes nuevos en marzo a 3 en junio | 20 o más clientes nuevos al mes | [C2](#c2) |

#### 🔁 Clientes

| # | Qué hacer | La cifra que lo justifica | Cómo saber si funciona | Base |
|---|---|---|---|---|
| 5 | **Trabajar el segundo pedido:** mensaje a los 10 días | Recompra a 30 días: 82,8 % en la cohorte de enero, 42,1 % en la de mayo | Recompra a 30 días de cada cohorte, cada mes | [C4](#c4) |
| 6 | **Cuidar a los 20 mayores clientes y probar captación en Alemania** | Hacen el 53,5 % de la venta. Un cliente alemán vale 678 €, uno español 190 € | Alerta de inactividad y país en cada campaña | [C3](#c3) |

#### 📦 Producto y medición

| # | Qué hacer | La cifra que lo justifica | Cómo saber si funciona | Base |
|---|---|---|---|---|
| 7 | **Guía de tallas en Pantalón Cargo y Zapatillas Classic** | Devuelven el 14,3 % y el 13,9 %, frente al 8,3 % medio | Devolución por producto, no la nota | [C8](#c8) |
| 8 | **Deporte: apuesta acotada, por tramos de referencias** | En mayo–junio es el 7,1 % de la venta con 2 referencias, pero vende 472 € por referencia frente a 594–709 €. Cero devoluciones | Mantener cada referencia solo si alcanza 594 € cada dos meses (Accesorios) | [C7](#c7) |
| 9 | **Medir bien las promociones:** descuento aplicado y códigos únicos por canal | El ingreso por código se infla un 9,8 % y ningún código rebaja el precio | Venta y descuento por pedido | [C9](#c9) |
| 10 | **Presupuestar sobre 38.531 € netos** (37.217 € si se contemplan los descuentos) | Unos 6.400 € netos al mes | — | [C1](#c1) |
