// Presentación de dirección: presupuesto del segundo semestre.
// Uso:  NODE_PATH=./node_modules node build_deck.js   (genera Scuffers_Presupuesto_H2.pptx)
// Todas las cifras salen de las queries de sql/conclusiones (ver README) y coinciden con el panel.
const pptxgen = require('pptxgenjs');
const path = require('path');
const { applyTheme } = require('C:/Users/nicolas.salafranca/AppData/Roaming/Claude/local-agent-mode-sessions/skills-plugin/c62301c5-871b-4cf0-8209-825353256482/dd31ca51-f69b-471d-9d3a-b29a61aa0f70/skills/pptx/scripts/apply_theme.js');

const A = (f) => path.join(__dirname, 'assets', f);
const OUT = path.join(__dirname, process.env.OUT || 'Scuffers_Presupuesto_H2.pptx');

// ---------------------------------------------------------------- tema
const INK = '111513', INK2 = '4A4E4C', MUTE = '666B68', GREEN = '5B9A7B', CLAY = 'C98468', BLUE = '7C8A95', GREY1 = '2C302E', GREY2 = '9AA09D', GREY3 = 'D5D8D6';
const THEME = {
  name: 'Scuffers Data', headFontFace: 'Arial', bodyFontFace: 'Arial',
  colors: { dk1: INK, lt1: 'FFFFFF', dk2: INK2, lt2: 'F4F5F4', accent1: GREEN, accent2: CLAY, accent3: BLUE, accent4: GREY2, accent5: GREY1, accent6: GREY3, hlink: GREEN, folHlink: BLUE },
};

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = 'Presupuesto del segundo semestre';
pres.author = 'Análisis de datos';
const C = pres.SchemeColor;

// ---------------------------------------------------------------- plantillas
pres.defineSlideMaster({
  title: 'PORTADA',
  background: { path: A('fondo_oscuro.png') },
  objects: [
    { image: { x: 0.8, y: 0.7, w: 2.6, h: 0.418, path: A('logo_blanco.png') } },
    { placeholder: { options: { name: 'title', type: 'title', x: 0.8, y: 2.35, w: 11.2, h: 2.2, fontSize: 56, color: C.background1, valign: 'top', align: 'left', margin: 0 }, text: '' } },
    { placeholder: { options: { name: 'subtitle', type: 'body', x: 0.8, y: 4.75, w: 10.5, h: 1.1, fontSize: 20, color: C.accent6, valign: 'top', align: 'left', margin: 0 }, text: '' } },
  ],
});
pres.defineSlideMaster({
  title: 'CONTENIDO',
  background: { path: A('fondo_claro.png') },
  objects: [
    { image: { x: 11.2, y: 0.5, w: 1.55, h: 0.249, path: A('logo_negro.png') } },
    { text: { text: 'Presupuesto del segundo semestre · Primer semestre de 2026', options: { x: 0.6, y: 7.02, w: 9, h: 0.3, fontSize: 10, color: C.text2, margin: 0 } } },
    { placeholder: { options: { name: 'title', type: 'title', x: 0.6, y: 0.42, w: 10.3, h: 1.2, fontSize: 32, color: C.text1, valign: 'top', align: 'left', margin: 0 }, text: '' } },
  ],
  slideNumber: { x: 12.0, y: 7.02, w: 0.73, h: 0.3, fontSize: 10, color: C.text2, align: 'right' },
});

// ---------------------------------------------------------------- utilidades
let n = 0;
const nm = (s) => `${s}-${++n}`;
const sombra = () => ({ type: 'outer', color: '1B2A22', opacity: 0.1, blur: 14, offset: 3, angle: 90 });
function card(s, x, y, w, h, opts = {}) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.14, objectName: nm('tarjeta'),
    fill: opts.dark ? { color: INK, transparency: 12 } : opts.tint ? { color: 'DCECE3', transparency: 25 } : opts.clay ? { color: 'F3E3DB', transparency: 20 } : { color: 'FFFFFF', transparency: 38 },
    line: opts.dark ? { color: '2C302E', width: 0.75 } : { color: 'FFFFFF', width: 1, transparency: 25 },
    shadow: sombra(),
  });
}
function txt(s, text, o) { s.addText(text, { isTextBox: true, margin: 0, valign: 'top', objectName: nm('texto'), ...o }); }
function stat(s, x, y, w, big, label, o = {}) {
  txt(s, big, { x, y, w, h: o.bh || 0.8, fontSize: o.size || 40, color: o.color || C.text1 });
  txt(s, label, { x, y: y + (o.bh || 0.8), w, h: o.lh || 0.6, fontSize: o.lsize || 13, color: o.lcolor || C.text2 });
}
function num(s, x, y, label, color = INK, d = 0.45) {
  s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color }, line: { color, width: 0.5 }, objectName: nm('numero') });
  txt(s, label, { x, y, w: d, h: d, fontSize: 14, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
}
const chartBase = {
  showLegend: false, showTitle: false, showValue: true, valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' },
  catAxisLabelColor: MUTE, catAxisLabelFontSize: 12, catAxisLabelFontFace: '+mn-lt', catAxisLineShow: false,
  dataLabelFontSize: 12, dataLabelColor: INK2, dataLabelFontFace: '+mn-lt', valAxisLabelFontFace: '+mn-lt', valAxisLineShow: false,
};
const B = (pt, color) => [{ type: 'none' }, { type: 'none' }, { pt, color }, { type: 'none' }];
const TH = (t, left) => ({ text: t, options: { bold: true, color: MUTE, fontSize: 11, align: left ? 'left' : 'right', border: B(1, GREY3) } });
const TR = (cells, hl) => cells.map((t, k) => ({ text: t, options: { fontSize: 13, color: hl ? CLAY : INK, bold: k === 0 || hl, align: k === 0 ? 'left' : 'right', border: B(0.5, GREY3) } }));
const slideContenido = (section, title, notes) => {
  const s = pres.addSlide({ masterName: 'CONTENIDO', sectionTitle: section });
  s.addText(title, { placeholder: 'title' });
  if (notes) s.addNotes(notes);
  return s;
};
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun'];

// ================================================================ 1 · PORTADA
pres.addSection({ title: 'Portada' });
{
  const s = pres.addSlide({ masterName: 'PORTADA', sectionTitle: 'Portada' });
  s.addText('Presupuesto del segundo semestre', { placeholder: 'title' });
  s.addText('Dónde invertir, qué proteger y qué cambiar\nVentas, canales y producto · primer semestre de 2026', { placeholder: 'subtitle' });
  txt(s, 'Datos del 1 de enero al 30 de junio · Venta neta = subtotal sin IVA ni envío, sin cancelados y menos devoluciones', { x: 0.8, y: 6.7, w: 11, h: 0.3, fontSize: 12, color: C.accent4 });
  s.addNotes('Apertura. La reunión sirve para decidir el presupuesto del segundo semestre. Respondemos a cuatro preguntas: cuánto hemos vendido, qué canales merecen inversión, qué productos funcionan y qué haríamos distinto.');
}

// ================================================================ 2 · RESUMEN
pres.addSection({ title: 'Resumen' });
{
  const s = slideContenido('Resumen', 'Cuatro preguntas, cuatro respuestas',
    'Resumen ejecutivo. Cada tarjeta responde a una pregunta del encargo con su cifra principal.');
  const items = [
    ['1', '¿Cuánto hemos vendido y cómo evoluciona?', '38.531 € netos y sin crecer', 'En junio el 85 % de la venta viene de clientes que ya compraban. Los clientes nuevos caen a 10.'],
    ['2', '¿Qué canales merecen más inversión?', 'Captan Email, Google y TikTok', 'Un cliente nuevo cuesta 32–59 € en los tres primeros y 167 € y 725 € en Meta e Instagram.'],
    ['3', '¿Qué categorías y productos funcionan?', 'Ropa lidera; Deporte, por debajo', 'Desde mayo, Deporte es el 7,1 % de la venta, pero vende 472 € por referencia frente a 594–709 €.'],
    ['4', '¿Qué hacemos distinto?', 'Captar más y cuidar la recompra', 'Pausar Instagram, bajar Meta y reforzar Email y Google. La recompra a 30 días cae del 83 % al 42 %.'],
  ];
  items.forEach((it, i) => {
    const x = 0.6 + (i % 2) * 6.15, y = 1.8 + Math.floor(i / 2) * 2.55;
    card(s, x, y, 5.95, 2.35);
    num(s, x + 0.3, y + 0.3, it[0]);
    txt(s, it[1], { x: x + 1.0, y: y + 0.3, w: 4.7, h: 0.45, fontSize: 13, color: C.text2, valign: 'middle' });
    txt(s, it[2], { x: x + 0.3, y: y + 0.95, w: 5.35, h: 0.5, fontSize: 20, color: C.text1 });
    txt(s, it[3], { x: x + 0.3, y: y + 1.5, w: 5.35, h: 0.75, fontSize: 14, color: C.text2 });
  });
}

// ================================================================ 3 · VENTAS
pres.addSection({ title: '1 · Ventas y evolución' });
{
  const s = slideContenido('1 · Ventas y evolución', 'El semestre deja 38.531 € de venta neta y no crece',
    'Venta neta = subtotal de producto sin impuestos ni envío de los pedidos no cancelados, menos devoluciones, solo fichas activas. Puente: 50.827 € de subtotal bruto, −702 € de pedidos no válidos, −3.358 € de fichas inactivas, −4.727 € cancelados y −3.510 € devueltos. Si los códigos hubieran descontado, serían 37.217 €.');
  const kp = [['38.531 €', 'venta neta'], ['614', 'pedidos'], ['68,47 €', 'ticket medio'], ['131', 'compradores']];
  kp.forEach((k, i) => {
    const x = 0.6 + (i % 2) * 2.45, y = 1.8 + Math.floor(i / 2) * 2.2;
    card(s, x, y, 2.3, 2.0, { dark: i === 0 });
    txt(s, k[0], { x: x + 0.25, y: y + 0.4, w: 1.95, h: 0.7, fontSize: 28, color: i === 0 ? C.background1 : C.text1 });
    txt(s, k[1], { x: x + 0.25, y: y + 1.2, w: 1.95, h: 0.4, fontSize: 13, color: i === 0 ? C.accent6 : C.text2 });
  });
  card(s, 5.75, 1.8, 6.98, 4.2);
  txt(s, 'Venta neta por mes (€)', { x: 6.05, y: 2.0, w: 4, h: 0.35, fontSize: 14, bold: true, color: C.text1 });
  s.addChart(pres.charts.BAR, [{ name: 'Venta neta', labels: MESES, values: [7067, 4738, 5992, 8436, 6454, 5843] }], {
    ...chartBase, x: 5.95, y: 2.4, w: 6.6, h: 3.45, barDir: 'col', barGapWidthPct: 55,
    chartColors: [GREY1, GREY1, GREY1, GREEN, GREY1, GREY1], dataLabelPosition: 'outEnd', dataLabelFormatCode: '#,##0', valAxisMinVal: 0,
  });
  txt(s, 'Sin tendencia: abril (en verde) es el mejor mes. Si los códigos hubieran aplicado su descuento, la venta neta sería de 37.217 €.', { x: 0.6, y: 6.2, w: 12, h: 0.5, fontSize: 12, color: C.text2 });
}

// ================================================================ 4 · CAPTACIÓN
{
  const s = slideContenido('1 · Ventas y evolución', 'La venta se sostiene con clientes previos y la captación cae por Orgánico',
    'En junio, el 85 % de la venta neta viene de clientes captados en meses anteriores (56 % en febrero). Los clientes nuevos caen a 10 en junio. La caída es de Orgánico (de 12 a 3); los canales de pago se mantienen en 7.');
  card(s, 0.6, 1.8, 7.6, 4.6);
  txt(s, 'Clientes nuevos por mes y canal de su primer pedido', { x: 0.9, y: 2.0, w: 7, h: 0.35, fontSize: 14, bold: true, color: C.text1 });
  s.addChart(pres.charts.BAR, [
    { name: 'Orgánico', labels: MESES, values: [9, 12, 12, 6, 9, 3] },
    { name: 'Canales de pago', labels: MESES, values: [18, 11, 9, 15, 7, 7] },
    { name: 'Newsletter y directo', labels: MESES, values: [2, 2, 1, 5, 3, 0] },
  ], {
    ...chartBase, x: 0.8, y: 2.4, w: 7.2, h: 3.9, barDir: 'col', barGrouping: 'stacked', barGapWidthPct: 50,
    chartColors: [CLAY, GREY1, GREY3], dataLabelPosition: 'ctr', dataLabelColor: 'FFFFFF', dataLabelFormatCode: '0;;;',
    showLegend: true, legendPos: 'b', legendFontSize: 12, legendFontFace: '+mn-lt', legendColor: MUTE,
  });
  card(s, 8.45, 1.8, 4.28, 2.2, { dark: true });
  stat(s, 8.75, 2.0, 3.8, '85 %', 'de la venta neta de junio viene de clientes que ya compraban (56 % en febrero)', { size: 40, color: C.background1, lcolor: C.accent6, lh: 0.9 });
  card(s, 8.45, 4.2, 4.28, 2.2, { clay: true });
  stat(s, 8.75, 4.4, 3.8, '12 → 3', 'clientes nuevos de Orgánico al mes, de febrero a junio. Los de pago aguantan (11 → 7).', { size: 40, lh: 0.9 });
}

// ================================================================ 5 · ALEMANIA
pres.addSection({ title: '2 · Clientes' });
{
  const s = slideContenido('2 · Clientes', 'Alemania y los mejores clientes son el mismo riesgo',
    'Por país de registro: 28 compradores alemanes, el 21,4 %, hacen el 49,3 % de la venta neta, con 9,4 pedidos y 678 € por cliente frente a 3,4 y 190 € en España. Los 20 mayores clientes suman el 53,5 % de la venta, y 17 de ellos son alemanes. El gasto de marketing no tiene país.');
  const st = [['21,4 %', 'de los compradores son alemanes (28 de 131)'], ['49,3 %', 'de la venta neta la hacen ellos'], ['678 € / 190 €', 'venta neta por cliente, Alemania frente a España'], ['17 de 20', 'mayores clientes son alemanes; los 20 hacen el 53,5 % de la venta']];
  st.forEach((x_, i) => {
    const x = 0.6 + (i % 2) * 6.15, y = 1.8 + Math.floor(i / 2) * 2.15;
    card(s, x, y, 5.95, 1.95, { tint: i === 3 });
    stat(s, x + 0.35, y + 0.25, 5.3, x_[0], x_[1], { size: 40, bh: 0.85, lh: 0.6, lsize: 14 });
  });
  txt(s, 'Acción: etiquetar el país en cada campaña, probar captación en Alemania aceptando un coste por cliente mayor y poner una alerta de inactividad a los 20 mayores clientes.', { x: 0.6, y: 6.2, w: 12.1, h: 0.5, fontSize: 13, color: C.text2 });
}

// ================================================================ 6 · RECOMPRA
{
  const s = slideContenido('2 · Clientes', 'Cada cohorte repite menos: del 83 % al 42 % en 30 días',
    'Recompra a 30 días según el mes del primer pedido. Junio no tiene aún 30 días observables. Un cliente nuevo de febrero–abril vale 232 € netos a 90 días. Con la definición de cliente activo de la nota de dirección (al menos un pedido entregado), la recompra es del 75,2 % sobre 129 activos.');
  card(s, 0.6, 1.8, 7.6, 4.6);
  txt(s, 'Clientes que repiten en 30 días, por mes del primer pedido (%)', { x: 0.9, y: 2.0, w: 7, h: 0.35, fontSize: 14, bold: true, color: C.text1 });
  s.addChart(pres.charts.BAR, [{ name: 'Recompra a 30 días', labels: ['ene', 'feb', 'mar', 'abr', 'may'], values: [82.8, 72.0, 63.6, 50.0, 42.1] }], {
    ...chartBase, x: 0.8, y: 2.4, w: 7.2, h: 3.9, barDir: 'col', barGapWidthPct: 55,
    chartColors: [GREY1, GREY1, GREY1, GREY1, CLAY], dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0"%"', valAxisMinVal: 0, valAxisMaxVal: 100,
  });
  card(s, 8.45, 1.8, 4.28, 2.2);
  stat(s, 8.75, 2.0, 3.8, '232 €', 'vale un cliente nuevo en sus primeros 90 días (cohortes de febrero a abril)', { size: 40, lh: 0.9 });
  card(s, 8.45, 4.2, 4.28, 2.2, { tint: true });
  txt(s, 'Mensaje de segundo pedido a los 10 días y un KPI mensual de recompra a 30 días por cohorte.', { x: 8.75, y: 4.45, w: 3.75, h: 1.7, fontSize: 15, color: C.text1 });
}

// ================================================================ 7 · CANALES
pres.addSection({ title: '3 · Canales' });
{
  const s = slideContenido('3 · Canales', 'Captar un cliente cuesta 32–59 € en TikTok, Email y Google, y 167–725 € en Meta e Instagram',
    'Coste por cliente nuevo de marzo a junio, que es el tramo que dirección da por comparable. Es la métrica para un presupuesto de captación. El IEC (venta neta atribuida entre inversión) da TikTok 15,5, Email 7,9, Meta 5,0, Google 4,3 e Instagram 0,8, pero entre el 76 % y el 93 % de esa venta es recompra de clientes ya captados. El ticket por canal no sirve para comparar: Meta e Instagram lo tienen alto porque el 83 % y el 75 % de sus pedidos van a Alemania.');
  card(s, 0.6, 1.8, 5.9, 4.6);
  txt(s, 'Coste por cliente nuevo, marzo a junio (€)', { x: 0.9, y: 2.0, w: 5.4, h: 0.35, fontSize: 14, bold: true, color: C.text1 });
  s.addChart(pres.charts.BAR, [{ name: 'Coste por cliente nuevo', labels: ['TikTok', 'Email', 'Google', 'Meta', 'Instagram'], values: [32, 41, 59, 167, 725] }], {
    ...chartBase, x: 0.8, y: 2.4, w: 5.5, h: 3.8, barDir: 'bar', catAxisOrientation: 'maxMin', barGapWidthPct: 45,
    chartColors: [GREEN, GREEN, GREEN, GREY1, CLAY], dataLabelPosition: 'outEnd', dataLabelFormatCode: '#,##0 "€"', valAxisMinVal: 0,
  });
  card(s, 6.75, 1.8, 5.98, 4.6);
  txt(s, 'Inversión, captación e IEC desde marzo', { x: 7.05, y: 2.0, w: 5.4, h: 0.35, fontSize: 14, bold: true, color: C.text1 });
  s.addTable([
    [TH('Canal', true), TH('Inversión'), TH('Nuevos'), TH('€/cliente'), TH('IEC')],
    TR(['TikTok', '160 €', '5', '32 €', '15,5×']),
    TR(['Email', '449 €', '11', '41 €', '7,9×']),
    TR(['Google', '883 €', '15', '59 €', '4,3×']),
    TR(['Meta', '1.004 €', '6', '167 €', '5,0×']),
    TR(['Instagram', '725 €', '1', '725 €', '0,8×'], true),
  ], { x: 7.05, y: 2.45, w: 5.4, colW: [1.4, 1.1, 0.9, 1.0, 1.0], rowH: 0.42, margin: [0.04, 0.08, 0.04, 0.08], objectName: 'tabla-canales' });
  txt(s, 'IEC = venta neta atribuida ÷ inversión. Entre el 76 % y el 93 % de esa venta es recompra: no mide captación. Unidos como en el anexo, Meta + Instagram cuestan 247 € por cliente y Email + Newsletter, 24 €.', { x: 7.05, y: 5.15, w: 5.4, h: 1.1, fontSize: 12, color: C.text2 });
}

// ================================================================ 8 · TIKTOK
{
  const s = slideContenido('3 · Canales', 'TikTok vendió más al mes gastando 20 veces menos',
    'Medias mensuales de enero–febrero frente a marzo–junio. El gasto en TikTok bajó de 788 a 40 € al mes y su venta neta atribuida subió de 527 a 621 € al mes. El gasto total cayó a la mitad y la venta total subió. En los ingresos no se aprecia el cambio de atribución de marzo: lo único que cambia es este gasto.');
  const cols = [
    ['Gasto en TikTok al mes', '788 €', '40 €', CLAY],
    ['Venta neta de TikTok al mes', '527 €', '621 €', GREEN],
    ['Gasto total en marketing al mes', '1.511 €', '805 €', CLAY],
    ['Venta neta total al mes', '5.903 €', '6.681 €', GREEN],
  ];
  cols.forEach((c_, i) => {
    const x = 0.6 + i * 3.08;
    card(s, x, 1.8, 2.9, 3.0);
    txt(s, c_[0], { x: x + 0.25, y: 2.0, w: 2.45, h: 0.6, fontSize: 13, bold: true, color: C.text2 });
    txt(s, 'ene–feb', { x: x + 0.25, y: 2.7, w: 2.4, h: 0.3, fontSize: 12, color: C.text2 });
    txt(s, c_[1], { x: x + 0.25, y: 2.95, w: 2.4, h: 0.6, fontSize: 28, color: C.text1 });
    txt(s, 'mar–jun', { x: x + 0.25, y: 3.65, w: 2.4, h: 0.3, fontSize: 12, color: C.text2 });
    txt(s, c_[2], { x: x + 0.25, y: 3.9, w: 2.4, h: 0.6, fontSize: 28, bold: true, color: c_[3] });
  });
  card(s, 0.6, 5.05, 12.13, 1.6, { dark: true });
  txt(s, 'El gasto de enero–febrero no compraba ventas. No volver a ese nivel, que serían unos 4.700 € en H2. Si se sube, por tramos: 120 €/mes durante 8 semanas, y mantenerlo solo si el cliente nuevo cuesta menos de 59 € (el coste de Google).', { x: 0.9, y: 5.25, w: 11.5, h: 1.2, fontSize: 16, color: C.background1, valign: 'middle' });
}

// ================================================================ 9 · PRODUCTO
pres.addSection({ title: '4 · Producto' });
{
  const s = slideContenido('4 · Producto', 'Desde que existe, Deporte es el 7,1 % de la venta, pero vende menos por referencia',
    'Comparación de mayo–junio, el único tramo con las cuatro categorías a la venta. Deporte se da de alta el 1 de mayo, aunque el enunciado dice «desde principios de año»: con el semestre entero parecería el 2,2 % de la venta. Solo fichas activas. Deporte: 944 € con 2 referencias, 472 € por referencia frente a 594–709 € del resto, 16,5 unidades por referencia y ninguna devolución. Contando sus dos fichas inactivas (Mochila Deporte y Camiseta Técnica), sería el 15,0 % y 544 € por referencia: sigue siendo la última.');
  card(s, 0.6, 1.8, 6.9, 4.6);
  txt(s, 'Venta por categoría, mayo–junio (€)', { x: 0.9, y: 2.0, w: 6, h: 0.35, fontSize: 14, bold: true, color: C.text1 });
  s.addChart(pres.charts.BAR, [{ name: 'Venta', labels: ['Ropa', 'Accesorios', 'Calzado', 'Deporte'], values: [5671, 3564, 3103, 944] }], {
    ...chartBase, x: 0.8, y: 2.4, w: 6.5, h: 3.9, barDir: 'col', barGapWidthPct: 55,
    chartColors: [GREY1, GREY1, GREY1, CLAY], dataLabelPosition: 'outEnd', dataLabelFormatCode: '#,##0', valAxisMinVal: 0,
  });
  card(s, 7.75, 1.8, 4.98, 2.2);
  stat(s, 8.05, 2.0, 4.4, '472 € vs 594–709 €', 'venta por referencia en mayo–junio: Deporte frente al resto de categorías', { size: 30, bh: 0.7, lh: 0.8 });
  card(s, 7.75, 4.2, 4.98, 2.2, { clay: true });
  txt(s, 'Ojo: Deporte existe desde el 1 de mayo, no desde enero como dice el enunciado. Con el semestre entero parecería residual (2,2 %). Propuesta: apuesta acotada, manteniendo cada referencia solo si alcanza 594 € cada dos meses, como Accesorios.', { x: 8.05, y: 4.4, w: 4.4, h: 1.8, fontSize: 14, color: C.text1 });
}

// ================================================================ 10 · CALIDAD Y CÓDIGOS
{
  const s = slideContenido('4 · Producto', 'La nota no anticipa la devolución, y los códigos no rebajan nada',
    'Devolución de H1: 9,9 % de los pedidos y 8,3 % de las unidades. Entre los productos con 10 o más reseñas, la nota no ordena la devolución. Códigos: el ingreso por código que pide la nota de dirección cuenta dos veces 20 pedidos (12.311 € frente a 11.210 €) y suma ventas a precio lleno, porque ningún pedido refleja el descuento.');
  card(s, 0.6, 1.8, 6.9, 4.6);
  txt(s, 'Valoración frente a devolución (productos con 10+ reseñas, H1)', { x: 0.9, y: 2.0, w: 6.4, h: 0.35, fontSize: 14, bold: true, color: C.text1 });
  s.addTable([
    [TH('Producto', true), TH('Nota'), TH('Devolución')],
    TR(['Pantalón Cargo', '5,0', '14,3 %'], true),
    TR(['Zapatillas Classic', '4,25', '13,9 %'], true),
    TR(['Zapatillas Running', '4,0', '0,0 %']),
    TR(['Top Básico', '3,7', '7,6 %']),
    TR(['Camiseta Oversize', '3,21', '1,2 %']),
  ], { x: 0.9, y: 2.5, w: 6.3, colW: [3.3, 1.4, 1.6], rowH: 0.48, margin: [0.04, 0.08, 0.04, 0.08], objectName: 'tabla-nota-devolucion' });
  txt(s, 'Medir la calidad con la devolución: empezar por la guía de tallas de Pantalón Cargo y Zapatillas Classic.', { x: 0.9, y: 5.55, w: 6.3, h: 0.7, fontSize: 13, color: C.text2 });
  card(s, 7.75, 1.8, 4.98, 4.6);
  txt(s, 'Ingreso por código (nota de dirección)', { x: 8.05, y: 2.0, w: 4.4, h: 0.35, fontSize: 14, bold: true, color: C.text1 });
  stat(s, 8.05, 2.5, 4.4, '+9,8 %', 'inflado al cruzar pedidos con códigos: 12.311 € frente a 11.210 € contados una vez', { size: 36, bh: 0.75, lh: 0.8 });
  txt(s, 'No creemos que esté bien medido: suma ventas a precio lleno (ningún pedido refleja el descuento) y no dice si el código generó la venta. Registrar el descuento aplicado y usar códigos únicos por canal.', { x: 8.05, y: 4.2, w: 4.4, h: 2.0, fontSize: 13, color: C.text2 });
}

// ================================================================ 11 · QUÉ HACER
pres.addSection({ title: '5 · Qué hacer distinto' });
{
  const s = slideContenido('5 · Qué hacer distinto', 'Seis decisiones para el segundo semestre, cada una con su cifra',
    'Las seis decisiones y la cifra que las justifica. El presupuesto de marketing se mantiene en torno a 800 € al mes y se reparte hacia los canales que captan más barato.');
  const items = [
    ['1', 'Pausar Instagram y bajar Meta', '725 € y 167 € por cliente nuevo; Instagram cuesta unos 180 € al mes.', CLAY],
    ['2', 'Reforzar Email y Google', '41 € y 59 € por cliente nuevo desde marzo.', GREEN],
    ['3', 'TikTok, solo por tramos', 'Vende más con 40 € al mes que con 788 € al mes.', GREEN],
    ['4', 'Recuperar la captación orgánica', 'De 12 a 3 clientes nuevos al mes; objetivo de 20 o más clientes nuevos al mes en total.', GREY1],
    ['5', 'Cuidar la recompra y Alemania', 'Recompra a 30 días: del 83 % al 42 %. Alemania hace el 49 % de la venta.', GREY1],
    ['6', 'Ordenar el catálogo y los códigos', 'Umbral de venta por referencia para Deporte y registrar el descuento aplicado en cada pedido.', GREY1],
  ];
  items.forEach((it, i) => {
    const x = 0.6 + (i % 3) * 4.1, y = 1.8 + Math.floor(i / 3) * 2.45;
    card(s, x, y, 3.93, 2.25);
    num(s, x + 0.3, y + 0.3, it[0], it[3]);
    txt(s, it[1], { x: x + 0.95, y: y + 0.3, w: 2.8, h: 0.6, fontSize: 15, bold: true, color: C.text1, valign: 'middle' });
    txt(s, it[2], { x: x + 0.3, y: y + 1.05, w: 3.4, h: 1.05, fontSize: 13, color: C.text2 });
  });
}

// ================================================================ 12 · CÓMO LEER LAS CIFRAS
{
  const s = slideContenido('5 · Qué hacer distinto', 'Cómo leer las cifras y sus límites',
    'Criterios y limitaciones. El detalle, con el efecto de haber elegido lo contrario, está en el README.');
  const items = [
    ['Venta neta', 'Subtotal sin IVA ni envío de pedidos no cancelados, menos devoluciones. Solo fichas activas. H1: 38.531 €.'],
    ['Periodo', 'Del 1 de enero al 30 de junio. Julio (hasta el día 12) va aparte.'],
    ['Canales', 'Se comparan de marzo a junio por coste por cliente nuevo. El IEC y el ticket son solo referencia.'],
    ['Notas de dirección', 'Aplicadas: IEC, cliente activo, catálogo vivo, ticket por canal e ingreso por código, con su crítica.'],
    ['Retorno medio', 'El gasto apenas varía salvo en TikTok: no se puede medir el siguiente euro.'],
    ['Muestras pequeñas', 'Instagram tiene 1 cliente nuevo desde marzo y Meta, 6: son señales, no pruebas.'],
    ['Sin costes ni país en el gasto', 'Análisis de ingresos. No se puede calcular el coste de captar en Alemania.'],
    ['Descuentos', 'Ningún importe refleja el descuento de los códigos. Con él, la venta neta sería de 37.217 €.'],
  ];
  items.forEach((it, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 6.15, y = 1.8 + row * 1.2;
    card(s, x, y, 5.98, 1.08);
    txt(s, it[0], { x: x + 0.3, y: y + 0.13, w: 5.4, h: 0.32, fontSize: 14, bold: true, color: C.text1 });
    txt(s, it[1], { x: x + 0.3, y: y + 0.47, w: 5.4, h: 0.55, fontSize: 12, color: C.text2 });
  });
}

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log('OK', OUT);
})();
