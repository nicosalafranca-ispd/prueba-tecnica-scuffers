// Deck de conclusiones: replica el README (resumen, una diapositiva por conclusión, plan, metodología y anexos).
// Uso:  NODE_PATH=./node_modules node build_conclusiones.js   (genera Scuffers_Conclusiones_H1.pptx)
// Todas las cifras salen de las queries de sql/conclusiones y coinciden con el README y el panel.
const pptxgen = require('pptxgenjs');
const path = require('path');
const { applyTheme } = require('C:/Users/nicolas.salafranca/AppData/Roaming/Claude/local-agent-mode-sessions/skills-plugin/c62301c5-871b-4cf0-8209-825353256482/dd31ca51-f69b-471d-9d3a-b29a61aa0f70/skills/pptx/scripts/apply_theme.js');

const A = (f) => path.join(__dirname, 'assets', f);
const OUT = path.join(__dirname, process.env.OUT || 'Scuffers_Conclusiones_H1.pptx');

// ---------------------------------------------------------------- tema (el mismo que el deck de dirección)
const INK = '111513', INK2 = '4A4E4C', MUTE = '666B68', GREEN = '5B9A7B', CLAY = 'C98468', BLUE = '7C8A95', GREY1 = '2C302E', GREY2 = '9AA09D', GREY3 = 'D5D8D6';
const AMBER = 'C9A04A', RED = 'B5574B';
const THEME = {
  name: 'Scuffers Data', headFontFace: 'Arial', bodyFontFace: 'Arial',
  colors: { dk1: INK, lt1: 'FFFFFF', dk2: INK2, lt2: 'F4F5F4', accent1: GREEN, accent2: CLAY, accent3: BLUE, accent4: GREY2, accent5: GREY1, accent6: GREY3, hlink: GREEN, folHlink: BLUE },
};
const CONF = { alta: { label: 'Alta', color: GREEN }, media: { label: 'Media', color: AMBER }, baja: { label: 'Baja', color: RED } };

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
pres.title = 'Conclusiones del primer semestre';
pres.author = 'Análisis de datos';
const C = pres.SchemeColor;
const PIE = 'Conclusiones del primer semestre · Presupuesto de marketing de H2';

// ---------------------------------------------------------------- plantillas
pres.defineSlideMaster({
  title: 'PORTADA',
  background: { path: A('fondo_oscuro.png') },
  objects: [
    { image: { x: 0.8, y: 0.7, w: 2.6, h: 0.418, path: A('logo_blanco.png') } },
    { placeholder: { options: { name: 'title', type: 'title', x: 0.8, y: 2.35, w: 11.2, h: 2.2, fontSize: 54, color: C.background1, valign: 'top', align: 'left', margin: 0 }, text: '' } },
    { placeholder: { options: { name: 'subtitle', type: 'body', x: 0.8, y: 4.75, w: 10.5, h: 1.1, fontSize: 20, color: C.accent6, valign: 'top', align: 'left', margin: 0 }, text: '' } },
  ],
});
pres.defineSlideMaster({
  title: 'DIVISOR',
  background: { path: A('fondo_oscuro.png') },
  objects: [
    { image: { x: 11.2, y: 0.5, w: 1.55, h: 0.249, path: A('logo_blanco.png') } },
    { placeholder: { options: { name: 'title', type: 'title', x: 0.8, y: 2.0, w: 11.4, h: 1.6, fontSize: 44, color: C.background1, valign: 'top', align: 'left', margin: 0 }, text: '' } },
    { placeholder: { options: { name: 'body', type: 'body', x: 0.8, y: 3.75, w: 10.8, h: 1.0, fontSize: 18, color: C.accent6, valign: 'top', align: 'left', margin: 0 }, text: '' } },
  ],
  slideNumber: { x: 12.0, y: 7.02, w: 0.73, h: 0.3, fontSize: 10, color: C.accent4, align: 'right' },
});
pres.defineSlideMaster({
  title: 'CONTENIDO',
  background: { path: A('fondo_claro.png') },
  objects: [
    { image: { x: 11.2, y: 0.5, w: 1.55, h: 0.249, path: A('logo_negro.png') } },
    { text: { text: PIE, options: { x: 0.6, y: 7.02, w: 9, h: 0.3, fontSize: 10, color: C.text2, margin: 0 } } },
    { placeholder: { options: { name: 'title', type: 'title', x: 0.6, y: 0.48, w: 10.4, h: 1.0, fontSize: 28, color: C.text1, valign: 'top', align: 'left', margin: 0 }, text: '' } },
  ],
  slideNumber: { x: 12.0, y: 7.02, w: 0.73, h: 0.3, fontSize: 10, color: C.text2, align: 'right' },
});
pres.defineSlideMaster({
  title: 'CONCLUSION',
  background: { path: A('fondo_claro.png') },
  objects: [
    { image: { x: 11.2, y: 0.5, w: 1.55, h: 0.249, path: A('logo_negro.png') } },
    { text: { text: PIE, options: { x: 0.6, y: 7.02, w: 9, h: 0.3, fontSize: 10, color: C.text2, margin: 0 } } },
    { placeholder: { options: { name: 'title', type: 'title', x: 0.6, y: 0.48, w: 10.4, h: 0.98, fontSize: 23, color: C.text1, valign: 'top', align: 'left', margin: 0 }, text: '' } },
  ],
  slideNumber: { x: 12.0, y: 7.02, w: 0.73, h: 0.3, fontSize: 10, color: C.text2, align: 'right' },
});

// ---------------------------------------------------------------- utilidades
const NB = '\u00a0';
// espacio duro antes de % y € para que la cifra no se separe de su unidad
const nb = (t) => (typeof t === 'string' ? t.replace(/ (%|€)/g, NB + '$1') : Array.isArray(t) ? t.map((r) => ({ ...r, text: nb(r.text) })) : t);
let n = 0;
const nm = (s) => `${s}-${++n}`;
const sombra = () => ({ type: 'outer', color: '1B2A22', opacity: 0.1, blur: 14, offset: 3, angle: 90 });
function card(s, x, y, w, h, opts = {}) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.14, objectName: nm('tarjeta'),
    fill: opts.dark ? { color: INK, transparency: 12 } : opts.tint ? { color: 'DCECE3', transparency: 25 } : opts.clay ? { color: 'F3E3DB', transparency: 15 } : { color: 'FFFFFF', transparency: 38 },
    line: opts.dark ? { color: '2C302E', width: 0.75 } : { color: 'FFFFFF', width: 1, transparency: 25 },
    shadow: sombra(),
  });
}
function txt(s, text, o) { s.addText(nb(text), { isTextBox: true, margin: 0, valign: 'top', objectName: nm('texto'), ...o }); }
function label(s, text, x, y, w, color = GREEN) { txt(s, text.toUpperCase(), { x, y, w, h: 0.25, fontSize: 10.5, bold: true, color, charSpacing: 1 }); }
function num(s, x, y, t, color = INK, d = 0.42, fs = 13) {
  s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color }, line: { color, width: 0.5 }, objectName: nm('numero') });
  txt(s, t, { x, y, w: d, h: d, fontSize: fs, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
}
// viñetas con arranque en negrita: [['Negrita:', ' resto'], ...]
function bullets(s, items, o) {
  const runs = [];
  items.forEach((it, i) => {
    const [b, r] = Array.isArray(it) ? it : [it, ''];
    const last = i === items.length - 1;
    runs.push({ text: b, options: { bold: true, color: o.boldColor || INK, bullet: { indent: 13 }, paraSpaceAfter: o.gap ?? 6, breakLine: !r && !last } });
    if (r) runs.push({ text: r, options: { color: o.color || INK2, breakLine: !last } });
  });
  txt(s, runs, { fontSize: 12, ...o });
}
const chartBase = {
  showLegend: false, showTitle: false, showValue: true, valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' },
  catAxisLabelColor: MUTE, catAxisLabelFontSize: 12, catAxisLabelFontFace: '+mn-lt', catAxisLineShow: false,
  dataLabelFontSize: 12, dataLabelColor: INK2, dataLabelFontFace: '+mn-lt', valAxisLabelFontFace: '+mn-lt', valAxisLineShow: false,
};
const B = (pt, color) => [{ type: 'none' }, { type: 'none' }, { pt, color }, { type: 'none' }];
const TH = (t, align = 'right', fs = 10.5) => ({ text: nb(t), options: { bold: true, color: MUTE, fontSize: fs, align, valign: 'bottom', border: B(1, GREY3) } });
const TD = (t, o = {}) => {
  const options = { fontSize: o.fs || 12, color: o.color || INK, bold: !!o.bold, align: o.align || 'right', valign: 'middle', border: B(0.5, GREY3) };
  if (o.fill) options.fill = { color: o.fill };
  return { text: nb(t), options };
};
// fila: primera celda a la izquierda; o.hl = color de resalte; o.bold = fila en negrita
const ROW = (cells, o = {}) => cells.map((t, k) => TD(t, { fs: o.fs, align: k === 0 ? 'left' : 'right', bold: o.bold || k === 0, color: o.hl || INK, fill: o.fill }));
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun'];
const paginas = {}; // primera diapositiva de cada sección, para el índice
const marca = (k) => { paginas[k] = pres.slides.length + 1; };

const contenido = (section, title, notes) => {
  const s = pres.addSlide({ masterName: 'CONTENIDO', sectionTitle: section });
  s.addText(nb(title), { placeholder: 'title' });
  if (notes) s.addNotes(notes);
  return s;
};

// Chips de la ficha: bloque/pregunta, confianza, panel y query
function ficha(s, f) {
  const chips = [
    { t: `${f.id} · ${f.preg}`, fill: INK, color: 'FFFFFF', bold: true },
    { t: `●  Confianza ${f.conf}`, fill: 'FFFFFF', color: f.confColor, bold: true },
    { t: `Panel: ${f.panel}`, fill: 'FFFFFF', color: INK2 },
    { t: f.query, fill: 'FFFFFF', color: INK2, mono: true },
  ];
  let x = 0.6;
  chips.forEach((c) => {
    const w = c.t.length * (c.mono ? 0.083 : 0.074) + 0.34;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.58, w, h: 0.33, rectRadius: 0.16, fill: { color: c.fill, transparency: c.fill === 'FFFFFF' ? 30 : 0 }, line: { color: c.fill === 'FFFFFF' ? GREY3 : c.fill, width: 0.75 }, objectName: nm('chip') });
    txt(s, c.t, { x, y: 1.58, w, h: 0.33, fontSize: 10, bold: !!c.bold, color: c.color, align: 'center', valign: 'middle', fontFace: c.mono ? 'Courier New' : undefined });
    x += w + 0.12;
  });
}

// Diapositiva de conclusión: ficha · qué dice el dato (izquierda) · cifra y por qué importa (derecha) · cómo lo he calculado (abajo)
function conclusion(cfg) {
  const s = pres.addSlide({ masterName: 'CONCLUSION', sectionTitle: cfg.section });
  txt(s, cfg.kicker.toUpperCase(), { x: 0.6, y: 0.2, w: 10, h: 0.25, fontSize: 10.5, bold: true, color: GREEN, charSpacing: 1 });
  s.addText(nb(cfg.title), { placeholder: 'title' });
  ficha(s, cfg.ficha);
  // izquierda: qué dice el dato
  card(s, 0.6, 2.1, 7.45, 4.4);
  label(s, 'Qué dice el dato', 0.9, 2.28, 6.9);
  txt(s, cfg.dato, { x: 0.9, y: 2.56, w: 6.9, h: 0.72, fontSize: 12.5, color: C.text2 });
  cfg.visual(s, { x: 0.85, y: 3.32, w: 6.95, h: 3.05 });
  // derecha: cifra destacada (o aviso) y por qué importa
  if (cfg.aviso) {
    card(s, 8.3, 2.1, 4.43, 1.6, { clay: true });
    label(s, cfg.aviso[0], 8.55, 2.25, 3.95, RED);
    txt(s, cfg.aviso[1], { x: 8.55, y: 2.53, w: 3.95, h: 1.1, fontSize: 11, color: C.text1 });
  } else {
    card(s, 8.3, 2.1, 4.43, 1.6, { dark: !!cfg.statDark, tint: !!cfg.statTint });
    txt(s, cfg.stat[0], { x: 8.55, y: 2.25, w: 3.95, h: 0.6, fontSize: cfg.statSize || 28, color: cfg.statDark ? C.background1 : C.text1 });
    txt(s, cfg.stat[1], { x: 8.55, y: 2.88, w: 3.95, h: 0.75, fontSize: 11, color: cfg.statDark ? C.accent6 : C.text2 });
  }
  card(s, 8.3, 3.85, 4.43, 2.65, { tint: true });
  label(s, 'Por qué importa', 8.55, 4.0, 3.95, INK);
  bullets(s, cfg.porque, { x: 8.55, y: 4.32, w: 3.95, h: 2.1, fontSize: 11.5 });
  // abajo: cómo lo he calculado
  txt(s, [{ text: 'Cómo lo he calculado:  ', options: { bold: true, color: INK } }, { text: cfg.calculo, options: { color: MUTE } }], { x: 0.6, y: 6.62, w: 12.1, h: 0.32, fontSize: 10 });
  s.addNotes(cfg.notas);
  return s;
}

function divisor(cfg) {
  const s = pres.addSlide({ masterName: 'DIVISOR', sectionTitle: cfg.section });
  txt(s, cfg.kicker.toUpperCase(), { x: 0.8, y: 1.45, w: 10, h: 0.35, fontSize: 14, bold: true, color: GREEN, charSpacing: 2 });
  s.addText(nb(cfg.title), { placeholder: 'title' });
  s.addText(nb(cfg.respuesta), { placeholder: 'body' });
  cfg.items.forEach((it, i) => {
    const y = 5.0 + i * 0.5;
    s.addShape(pres.ShapeType.roundRect, { x: 0.8, y, w: 0.62, h: 0.36, rectRadius: 0.18, fill: { color: GREEN }, line: { color: GREEN, width: 0.5 }, objectName: nm('chip') });
    txt(s, it[0], { x: 0.8, y, w: 0.62, h: 0.36, fontSize: 12, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    txt(s, it[1], { x: 1.6, y, w: 10.5, h: 0.36, fontSize: 15, color: C.background1, valign: 'middle' });
  });
  s.addNotes(cfg.notas);
}

// ================================================================ PORTADA
pres.addSection({ title: 'Portada' });
{
  const s = pres.addSlide({ masterName: 'PORTADA', sectionTitle: 'Portada' });
  s.addText('Conclusiones del primer semestre', { placeholder: 'title' });
  s.addText('Ventas, clientes, canales y producto: 9 conclusiones y un plan para H2\nPresupuesto de marketing del segundo semestre de 2026', { placeholder: 'subtitle' });
  txt(s, 'Datos del 1 de enero al 30 de junio · Venta neta = subtotal sin IVA ni envío, sin cancelados y menos devoluciones', { x: 0.8, y: 6.7, w: 11, h: 0.3, fontSize: 12, color: C.accent4 });
  s.addNotes('Versión en diapositivas del README. Sigue su mismo orden: resumen ejecutivo, una diapositiva por conclusión, plan para H2, metodología y anexos. Cada conclusión lleva su query en sql/conclusiones.');
}

// ================================================================ ÍNDICE
const indice = contenido('Portada', 'Índice', 'Las ocho partes del documento, en el mismo orden que el README.');
const SECCIONES = [
  ['1', 'Resumen ejecutivo', 'La conclusión en una frase, la historia en cinco pasos y las 9 conclusiones de un vistazo', 'resumen'],
  ['2', 'Antes de leer', 'Qué es la venta neta, el glosario y cómo se lee cada conclusión', 'antes'],
  ['3', 'Conclusiones', 'A · Ventas (C1–C2) · B · Clientes (C3–C4) · C · Canales (C5–C6) · D · Producto (C7–C9)', 'conclusiones'],
  ['4', 'Plan para H2', '10 acciones, cada una con la cifra que la justifica', 'plan'],
  ['5', 'Modelado de datos', 'Las cinco reglas que más pesan y los cruces entre tablas', 'modelado'],
  ['6', 'Supuestos', 'De 15 supuestos, solo uno cambia una conclusión', 'supuestos'],
  ['7', 'Decisiones y límites', 'Lo que cambiamos durante el análisis y lo que los datos no permiten medir', 'decisiones'],
  ['8', 'Anexos', 'Notas de dirección del PDF, vistas del esquema y dónde está cada cosa', 'anexos'],
];

// ================================================================ 1 · RESUMEN EJECUTIVO
pres.addSection({ title: '1 · Resumen ejecutivo' });
marca('resumen');
{
  const s = contenido('1 · Resumen ejecutivo', 'La venta no crece y vive de clientes que repiten cada vez menos: H2 depende de captar',
    'La conclusión en una frase. Cifras de cabecera de H1 con venta neta: 38.531 €. La venta sin restar devoluciones es de 42.041 €. Fuente: c1_venta_neta_h1.sql.');
  const kp = [['38.531 €', 'venta neta'], ['42.041 €', 'venta, sin restar devoluciones'], ['614', 'pedidos'], ['68,47 €', 'ticket medio'], ['131', 'compradores'], ['9,9 %', 'de pedidos con devolución']];
  kp.forEach((k, i) => {
    const x = 0.6 + i * 2.04;
    card(s, x, 1.85, 1.9, 1.75, { dark: i === 0 });
    txt(s, k[0], { x: x + 0.2, y: 2.15, w: 1.6, h: 0.55, fontSize: 24, bold: i === 0, color: i === 0 ? C.background1 : C.text1 });
    txt(s, k[1], { x: x + 0.2, y: 2.8, w: 1.55, h: 0.65, fontSize: 11.5, color: i === 0 ? C.accent6 : C.text2 });
  });
  card(s, 0.6, 3.95, 12.13, 2.55, { tint: true });
  label(s, 'En una frase', 0.95, 4.2, 6, INK);
  txt(s, 'La venta (38.531 € netos) no crece y vive de clientes que repiten cada vez menos. H2 depende de captar, y captar cuesta 32–59 € por cliente en TikTok, Email y Google, frente a 167–725 € en Meta e Instagram.', { x: 0.95, y: 4.55, w: 11.4, h: 1.2, fontSize: 20, color: C.text1 });
  txt(s, 'Julio (1 al 12) se muestra aparte: 39 pedidos y 2.587 € netos.', { x: 0.95, y: 5.95, w: 11, h: 0.35, fontSize: 12, color: C.text2 });
}
{
  const s = contenido('1 · Resumen ejecutivo', 'La historia en cinco pasos: cada paso lleva al siguiente',
    'Así está ordenado el documento: de la cifra de venta a quién compra, de ahí a dónde captar y por último el producto.');
  const pasos = [
    ['1', 'Vendimos 38.531 € netos', 'Unos 6.400 € al mes: 614 pedidos y 131 compradores.', 'C1'],
    ['2', 'La venta no crece y vive de quien ya compraba', 'En junio, el 85 % viene de clientes previos y solo llegan 10 clientes nuevos.', 'C2'],
    ['3', 'La base es pequeña, alemana y menos fiel', '28 alemanes hacen el 49,3 % de la venta. La recompra a 30 días cae del 82,8 % al 42,1 %.', 'C3 · C4'],
    ['4', 'H2 depende de captar, y el canal importa', 'De 32 € a 725 € por cliente nuevo. TikTok vendió más gastando 20 veces menos.', 'C5 · C6'],
    ['5', 'En producto, medir mejor', 'Deporte vende menos por referencia, la nota no anticipa la devolución y el ingreso por código está inflado.', 'C7 · C8 · C9'],
  ];
  pasos.forEach((p, i) => {
    const x = 0.6 + i * 2.47, w = 2.27;
    card(s, x, 1.85, w, 4.6, { dark: i === 3 });
    const dark = i === 3;
    num(s, x + 0.25, 2.1, p[0], dark ? GREEN : INK);
    txt(s, p[1], { x: x + 0.25, y: 2.75, w: w - 0.45, h: 1.25, fontSize: 16, bold: true, color: dark ? C.background1 : C.text1 });
    txt(s, p[2], { x: x + 0.25, y: 4.05, w: w - 0.45, h: 1.6, fontSize: 12.5, color: dark ? C.accent6 : C.text2 });
    txt(s, p[3], { x: x + 0.25, y: 5.85, w: w - 0.45, h: 0.35, fontSize: 12, bold: true, color: GREEN });
    if (i < 4) txt(s, '›', { x: x + w - 0.02, y: 3.7, w: 0.24, h: 0.5, fontSize: 26, bold: true, color: GREY2, align: 'center' });
  });
}
{
  const s = contenido('1 · Resumen ejecutivo', 'Las 9 conclusiones de un vistazo',
    'Confianza: alta = cifra contable o diferencia grande con muestra suficiente. Media = tendencia clara con grupos de 10 a 30 clientes. Baja = pocos casos: indica la dirección, no la magnitud.');
  const conf = (k) => TD('●  ' + CONF[k].label, { color: CONF[k].color, bold: true, align: 'left', fs: 11 });
  const filas = [
    ['C1', 'El semestre deja 38.531 € de venta neta', '6.400 €/mes · −24 % frente al bruto', 'Presupuestar sobre la venta neta', 'alta'],
    ['C2', 'La venta no crece y depende de quien ya compraba', '85 % de clientes previos · 10 nuevos en junio', 'Recuperar Orgánico · ≥ 20 nuevos al mes', 'media'],
    ['C3', 'Alemania hace la mitad de la venta con el 21 % de los compradores', '678 € frente a 190 € por cliente', 'Test en Alemania · cuidar a los 20 mayores', 'alta'],
    ['C4', 'Cada cohorte repite menos', '82,8 % → 42,1 % a 30 días', 'Mensaje de segundo pedido', 'media'],
    ['C5', 'Email, Google y TikTok captan mucho más barato que Meta e Instagram', '32–59 € frente a 167–725 €', 'Mover presupuesto a Email y Google', 'baja'],
    ['C6', 'TikTok vendió más gastando 20 veces menos', '263 € → 32 € por cliente nuevo', 'Subir solo por tramos', 'media'],
    ['C7', 'Deporte, en su periodo, vende menos por referencia', '7,1 % de la venta · 472 € frente a 594–709 €', 'Apuesta acotada', 'baja'],
    ['C8', 'La nota no anticipa la devolución', 'Cargo: 5,0★ y 14,3 % · Oversize: 3,21★ y 1,2 %', 'Guía de tallas · medir por devolución', 'media'],
    ['C9', 'El ingreso por código está inflado', '+9,8 % · ningún código rebaja el precio', 'Registrar el descuento · códigos por canal', 'alta'],
  ];
  const rows = [[TH('', 'left'), TH('Conclusión', 'left'), TH('Cifra clave', 'left'), TH('Qué hacer', 'left'), TH('Confianza', 'left')]];
  filas.forEach((f) => rows.push([
    TD(f[0], { bold: true, color: GREEN, align: 'left', fs: 11.5 }), TD(f[1], { align: 'left', fs: 11, bold: true }),
    TD(f[2], { align: 'left', fs: 11, color: INK2 }), TD(f[3], { align: 'left', fs: 11, color: INK2 }),
    f[0] === 'C5' ? TD('●  Baja / media', { color: RED, bold: true, align: 'left', fs: 11 }) : conf(f[4]),
  ]));
  card(s, 0.6, 1.75, 12.13, 4.95);
  s.addTable(rows, { x: 0.8, y: 1.9, w: 11.75, colW: [0.55, 4.1, 3.45, 2.5, 1.15], rowH: 0.45, margin: [0.03, 0.07, 0.03, 0.07], objectName: 'tabla-vistazo' });
}
{
  const s = contenido('1 · Resumen ejecutivo', 'Cuatro preguntas de dirección, cuatro respuestas',
    'Las cuatro preguntas del encargo, con su respuesta corta y las conclusiones que la sostienen.');
  const items = [
    ['1', '¿Cuánto hemos vendido y cómo ha evolucionado?', '38.531 € netos, sin crecer', 'Entre 4.738 y 8.436 € al mes, sin tendencia, y cada vez más dependientes de clientes que ya compraban.', 'C1 · C2 · C3 · C4'],
    ['2', '¿Qué canales merecen más inversión y cuáles menos?', 'Reforzar Email y Google; recortar Meta', 'Email y Google captan a 41 y 59 € por cliente nuevo, TikTok a 32 € (por tramos). Meta, a 167 €, e Instagram, a 725 €.', 'C5 · C6'],
    ['3', '¿Qué categorías y productos funcionan?', 'Ropa lidera; Deporte, por debajo', 'En mayo–junio, Deporte hace el 7,1 % de la venta, pero vende 472 € por referencia frente a 594–709 €. Pantalón Cargo y Zapatillas Classic devuelven más del 13 %.', 'C7 · C8 · C9'],
    ['4', '¿Qué haríamos distinto en H2, y con qué cifra?', 'Captar mejor y cuidar la recompra', 'Mover dinero de Meta e Instagram a Email y Google, recuperar la captación orgánica, trabajar el segundo pedido y medir bien los códigos.', 'Plan para H2'],
  ];
  items.forEach((it, i) => {
    const x = 0.6 + (i % 2) * 6.15, y = 1.75 + Math.floor(i / 2) * 2.5;
    card(s, x, y, 5.95, 2.35);
    num(s, x + 0.3, y + 0.28, it[0]);
    txt(s, it[1], { x: x + 0.95, y: y + 0.28, w: 4.75, h: 0.42, fontSize: 12.5, color: C.text2, valign: 'middle' });
    txt(s, it[2], { x: x + 0.3, y: y + 0.85, w: 5.35, h: 0.45, fontSize: 18, bold: true, color: C.text1 });
    txt(s, it[3], { x: x + 0.3, y: y + 1.32, w: 5.35, h: 0.72, fontSize: 12, color: C.text2 });
    txt(s, it[4], { x: x + 0.3, y: y + 1.98, w: 5.35, h: 0.28, fontSize: 11, bold: true, color: GREEN });
  });
}

// ================================================================ 2 · ANTES DE LEER
pres.addSection({ title: '2 · Antes de leer' });
marca('antes');
{
  const s = contenido('2 · Antes de leer', 'Antes de leer: una sola cifra de venta y tres niveles de confianza',
    'Venta neta = subtotal de producto sin IVA ni envío de los pedidos válidos y no cancelados de H1, menos lo devuelto. Solo fichas activas. Es la cifra con la que se presupuesta. El glosario completo está en el README.');
  card(s, 0.6, 1.75, 6.3, 4.85);
  label(s, 'La cifra de venta', 0.9, 1.95, 5.8);
  txt(s, [{ text: 'Venta neta', options: { bold: true, color: INK } }, { text: ' = subtotal de producto (sin IVA ni envío) de los pedidos válidos y no cancelados de H1, menos lo devuelto. Solo fichas activas.', options: { color: INK } }], { x: 0.9, y: 2.25, w: 5.75, h: 1.0, fontSize: 14 });
  label(s, 'Glosario', 0.9, 3.4, 5.8);
  const glos = [
    ['Cliente nuevo', 'Primer pedido válido no cancelado, en su mes y canal'],
    ['Coste por cliente nuevo', 'Gasto del canal ÷ clientes nuevos que llegaron por él'],
    ['IEC', 'Venta neta atribuida al canal ÷ gasto (nota de dirección 1)'],
    ['Recompra a 30 días', '% de una cohorte con segundo pedido en 30 días'],
    ['Cohorte', 'Clientes agrupados por el mes de su primer pedido'],
    ['Catálogo vivo', 'Fichas con active = true (nota de dirección 4)'],
  ];
  s.addTable(glos.map((g) => [TD(g[0], { align: 'left', bold: true, fs: 11 }), TD(g[1], { align: 'left', fs: 11, color: INK2 })]), { x: 0.9, y: 3.7, w: 5.75, colW: [2.0, 3.75], rowH: 0.42, margin: [0.03, 0.06, 0.03, 0.06], objectName: 'tabla-glosario' });

  card(s, 7.15, 1.75, 5.58, 2.35);
  label(s, 'Niveles de confianza', 7.45, 1.95, 5);
  const niv = [['alta', 'Cifra contable, o diferencia grande con muestra suficiente'], ['media', 'Tendencia clara con grupos de 10 a 30 clientes'], ['baja', 'Pocos casos: indica la dirección, no la magnitud']];
  niv.forEach((v, i) => {
    const y = 2.3 + i * 0.58;
    txt(s, '●  ' + CONF[v[0]].label, { x: 7.45, y, w: 1.3, h: 0.45, fontSize: 13, bold: true, color: CONF[v[0]].color, valign: 'middle' });
    txt(s, v[1], { x: 8.75, y, w: 3.8, h: 0.45, fontSize: 11.5, color: C.text2, valign: 'middle' });
  });
  card(s, 7.15, 4.25, 5.58, 2.35, { tint: true });
  label(s, 'Cómo se lee cada conclusión', 7.45, 4.45, 5, INK);
  bullets(s, [
    ['Título:', ' la conclusión, con su cifra y su comparación.'],
    ['Ficha:', ' pregunta, confianza, panel y query.'],
    ['Qué dice el dato:', ' el hecho, con su gráfico o tabla.'],
    ['Por qué importa:', ' qué hacer, con cifra.'],
    ['Cómo lo he calculado:', ' el criterio, abajo.'],
  ], { x: 7.45, y: 4.78, w: 5.05, h: 1.7, fontSize: 11.5, gap: 3 });
}

// ================================================================ 3 · CONCLUSIONES
pres.addSection({ title: 'A · Ventas' });
marca('conclusiones');
divisor({
  section: 'A · Ventas', kicker: 'Bloque A · Pregunta 1 de dirección', title: 'Cuánto hemos vendido y cómo ha evolucionado',
  respuesta: 'Respuesta corta: 38.531 € netos, sin tendencia, y cada mes con más peso de los clientes que ya compraban.',
  items: [['C1', 'El semestre deja 38.531 € de venta neta'], ['C2', 'La venta no crece y depende de quien ya compraba']],
  notas: 'Primero fijamos la cifra con la que se presupuesta y después vemos cómo se ha movido mes a mes.',
});
conclusion({
  section: 'A · Ventas', kicker: 'Bloque A · Ventas · C1',
  title: 'El semestre deja 38.531 € de venta neta, unos 6.400 € al mes: un 24 % menos que el subtotal bruto',
  ficha: { id: 'C1', preg: 'Pregunta 1', conf: 'alta', confColor: GREEN, panel: 'Resumen › Indicadores clave', query: 'c1_venta_neta_h1.sql' },
  dato: 'En H1 hay 614 pedidos con venta y 131 compradores. Del subtotal bruto a la venta neta se pierde un 24 %, sobre todo por cancelados y devoluciones.',
  visual: (s, a) => {
    s.addTable([
      [TH('Paso', 'left'), TH('Pedidos'), TH('Importe')],
      ROW(['Subtotal bruto de H1, todos los pedidos', '719', '50.827 €'], { fs: 11 }),
      ROW(['− Pedidos excluidos (borrados o precio anómalo)', '−19', '−702 €'], { fs: 11 }),
      ROW(['− Líneas de fichas inactivas', '−18', '−3.358 €'], { fs: 11 }),
      ROW(['− Cancelados', '−68', '−4.727 €'], { fs: 11 }),
      ROW(['= Venta H1', '614', '42.041 €'], { fs: 11, bold: true }),
      ROW(['− Devoluciones (45 enteras y 13 parciales)', '', '−3.510 €'], { fs: 11 }),
      ROW(['= Venta neta H1', '614', '38.531 €'], { fs: 12, bold: true, hl: GREEN }),
    ], { x: a.x + 0.05, y: a.y, w: a.w - 0.1, colW: [4.45, 1.0, 1.4], rowH: 0.36, margin: [0.03, 0.07, 0.03, 0.07], objectName: 'tabla-puente' });
  },
  stat: ['37.217 €', 'venta neta si los códigos hubieran aplicado el descuento que prometen (−1.314 €, −3,4 %)'],
  porque: [['Base para H2:', ' unos 6.400 € netos al mes, no los 50.000 € de subtotal bruto.'], ['Qué cifra usar:', ' 38.531 € (sin descuentos, como finanzas) o 37.217 € si se contemplan.'], ['Registrar ya', ' el descuento aplicado en cada pedido (C9).']],
  calculo: 'pedidos válidos de H1 no cancelados · cantidad × precio cobrado en fichas activas, sin IVA ni envío · menos devoluciones enteras y parciales · pendientes cuentan.',
  notas: 'Cómo lo he calculado: pedidos válidos de H1 y no cancelados (los pendientes cuentan como venta). Venta = cantidad × precio cobrado en las líneas de fichas activas, sin IVA ni envío. Se restan las devoluciones enteras (estado refunded, por todas sus líneas) y las parciales (reembolso que casa con k unidades de una línea). Puente: c1b_puente_ventas.sql. Descuento teórico (mayor discount_pct del pedido): c1c_descuento_teorico.sql. Julio (1 al 12), aparte: 39 pedidos y 2.587 € netos.',
});
conclusion({
  section: 'A · Ventas', kicker: 'Bloque A · Ventas · C2',
  title: 'La venta no crece y vive de quien ya compraba: en junio, el 85 % viene de clientes previos y solo llegan 10 nuevos',
  ficha: { id: 'C2', preg: 'Pregunta 1', conf: 'media', confColor: AMBER, panel: 'Clientes › Pedidos por mes', query: 'c2_evolucion_mensual.sql' },
  dato: 'La venta neta oscila entre 4.738 y 8.436 € al mes, sin tendencia. Los clientes nuevos caen de 29 a 10, y la caída de junio es de Orgánico (de 12 en marzo a 3).',
  visual: (s, a) => {
    txt(s, 'Clientes nuevos por mes y canal de su primer pedido', { x: a.x + 0.05, y: a.y - 0.05, w: a.w, h: 0.3, fontSize: 11.5, bold: true, color: C.text1 });
    s.addChart(pres.charts.BAR, [
      { name: 'Orgánico', labels: MESES, values: [9, 12, 12, 6, 9, 3] },
      { name: 'Canales de pago', labels: MESES, values: [18, 11, 9, 15, 7, 7] },
      { name: 'Newsletter y Direct', labels: MESES, values: [2, 2, 1, 5, 3, 0] },
    ], {
      ...chartBase, x: a.x, y: a.y + 0.25, w: a.w, h: a.h - 0.25, barDir: 'col', barGrouping: 'stacked', barGapWidthPct: 50,
      chartColors: [CLAY, GREY1, GREY3], dataLabelPosition: 'ctr', dataLabelColor: 'FFFFFF', dataLabelFormatCode: '0;;;',
      showLegend: true, legendPos: 'r', legendFontSize: 11, legendFontFace: '+mn-lt', legendColor: MUTE,
    });
  },
  stat: ['85 %', 'de la venta neta de junio viene de clientes previos (56 % en febrero)'], statDark: true,
  porque: [['H2 no crecerá sin captar:', ' cada cohorte repite menos (C4).'], ['Revisar SEO y alta web de junio', ' antes de mover presupuesto: los canales de pago aguantan (7).'], ['Objetivo:', ' 20 o más clientes nuevos al mes (media de feb–may: 23).']],
  calculo: 'cliente nuevo = primer pedido válido no cancelado, en su mes y canal · % de clientes previos = venta neta de clientes cuyo primer pedido es de un mes anterior.',
  notas: 'Venta neta mensual: 7.067, 4.738, 5.992, 8.436, 6.454 y 5.843 €. % de la venta de clientes previos: 56 % (feb), 72 %, 72 %, 80 % y 85 % (jun); en enero no se puede calcular. Canales de pago = Email, Google, Meta, Instagram y TikTok. Origen por canal: c2b_nuevos_por_origen.sql.',
});

pres.addSection({ title: 'B · Clientes' });
divisor({
  section: 'B · Clientes', kicker: 'Bloque B · Preguntas 1 y 4 de dirección', title: 'Quién compra y si vuelve',
  respuesta: 'Respuesta corta: es una base pequeña y concentrada en Alemania, y cada nueva cohorte repite menos que la anterior.',
  items: [['C3', 'Alemania hace la mitad de la venta con el 21 % de los compradores'], ['C4', 'Cada cohorte repite menos']],
  notas: 'Si la venta se sostiene en quien ya compraba, hay que saber quién es esa base y si sigue volviendo.',
});
conclusion({
  section: 'B · Clientes', kicker: 'Bloque B · Clientes · C3',
  title: '28 compradores alemanes (21,4 %) hacen el 49,3 % de la venta neta: cada uno deja 678 €, frente a 190 € uno español',
  ficha: { id: 'C3', preg: 'Preguntas 1 y 4', conf: 'alta', confColor: GREEN, panel: 'Clientes › Compradores por país', query: 'c3_alemania_pais_registro.sql' },
  dato: 'Alemania y España venden casi lo mismo con muy distinto número de compradores, y 17 de los 20 mayores clientes son alemanes: es el mismo riesgo.',
  visual: (s, a) => {
    s.addTable([
      [TH('', 'left'), TH('Alemania'), TH('España')],
      ROW(['Compradores', '28 (21,4 %)', '103 (78,6 %)']),
      ROW(['Venta neta', '18.979 € (49,3 %)', '19.552 € (50,7 %)']),
      ROW(['Pedidos por cliente', '9,4', '3,4']),
      ROW(['Venta neta por cliente', '678 €', '190 €'], { bold: true, hl: GREEN }),
      ROW(['Entre los 20 mayores clientes', '17', '3']),
      ROW(['Con 10 o más pedidos', '13', '6']),
    ], { x: a.x + 0.05, y: a.y + 0.05, w: a.w - 0.1, colW: [3.05, 1.9, 1.9], rowH: 0.42, margin: [0.03, 0.07, 0.03, 0.07], objectName: 'tabla-paises' });
  },
  stat: ['53,5 %', 'de la venta neta la hacen los 20 mayores clientes (los 10 mayores, el 35,2 %)'],
  porque: [['Captar en Alemania', ' aceptando un coste por cliente mayor: vale 3,6 veces más. Probarlo con un test.'], ['Etiquetar el país', ' en el gasto de marketing: hoy no lo tiene.'], ['Alerta de inactividad', ' para los 20 mayores clientes.']],
  calculo: 'país de registro del cliente (customers.country) · venta neta de H1 · por país de envío, Alemania sería el 50,2 % · concentración en c3b_concentracion_top20.sql.',
  notas: 'País de registro del cliente y venta neta de H1. Concentración: c3b_concentracion_top20.sql. Con el país de envío de los pedidos el reparto apenas cambia: Alemania sería el 50,2 % de la venta neta, con 38 compradores que reciben algún pedido allí.',
});
conclusion({
  section: 'B · Clientes', kicker: 'Bloque B · Clientes · C4',
  title: 'Cada cohorte repite menos: vuelve en 30 días el 82,8 % de los captados en enero y solo el 42,1 % de los de mayo',
  ficha: { id: 'C4', preg: 'Preguntas 1 y 4', conf: 'media', confColor: AMBER, panel: 'Clientes › Valor y frecuencia', query: 'c4_recompra_cohortes.sql' },
  dato: 'La recompra a 30 días baja todos los meses, sin excepción: repiten 24 de los 29 clientes captados en enero y 8 de los 19 captados en mayo.',
  visual: (s, a) => {
    txt(s, 'Clientes que repiten en 30 días, por mes del primer pedido (%)', { x: a.x + 0.05, y: a.y - 0.05, w: a.w, h: 0.3, fontSize: 11.5, bold: true, color: C.text1 });
    s.addChart(pres.charts.BAR, [{ name: 'Recompra a 30 días', labels: ['ene', 'feb', 'mar', 'abr', 'may'], values: [82.8, 72.0, 63.6, 50.0, 42.1] }], {
      ...chartBase, x: a.x, y: a.y + 0.25, w: a.w, h: a.h - 0.25, barDir: 'col', barGapWidthPct: 55,
      chartColors: [GREY1, GREY1, GREY1, GREY1, CLAY], dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0" %"', valAxisMinVal: 0, valAxisMaxVal: 100,
    });
  },
  stat: ['232 €', 'deja a 90 días un cliente nuevo de febrero–abril: la mitad que uno de enero (464 €)'],
  porque: [['Mensaje de segundo pedido', ' a los 10 días del primero.'], ['KPI mensual:', ' recompra a 30 días de la última cohorte.'], ['Valorar la captación a 232 €', ' por cliente, no con la media del semestre.']],
  calculo: 'segundo pedido no cancelado en los 30 días siguientes al primero · solo cohortes con 30 días observables (junio fuera: 6 clientes) · valor a 90 días en c4b.',
  notas: 'Recompra = segundo pedido válido no cancelado dentro de los 30 días siguientes al primero. Solo cohortes con primer pedido hasta el 12 de junio. Valor a 90 días: cohortes con primer pedido hasta el 13 de abril (c4b_valor_90_dias.sql). Nota de dirección 3 (cliente activo = algún pedido entregado): 129 activos con un 75,2 % de recompra, frente a 131 compradores y un 80,2 % (c4c_cliente_activo_nota3.sql).',
});

pres.addSection({ title: 'C · Canales' });
divisor({
  section: 'C · Canales', kicker: 'Bloque C · Pregunta 2 de dirección', title: 'Qué canales merecen más inversión',
  respuesta: 'Respuesta corta: más a Email y Google, TikTok por tramos y menos a Meta e Instagram. Se comparan de marzo a junio, por coste por cliente nuevo.',
  items: [['C5', 'Email, Google y TikTok captan mucho más barato que Meta e Instagram'], ['C6', 'TikTok vendió más gastando 20 veces menos']],
  notas: 'Con una base que se desgasta, H2 depende de captar. Por el cambio de atribución de marzo, los canales se comparan de marzo a junio, y por coste por cliente nuevo porque el presupuesto que se decide es de captación.',
});
conclusion({
  section: 'C · Canales', kicker: 'Bloque C · Canales · C5',
  title: 'Desde marzo, captar un cliente nuevo cuesta 32–59 € en TikTok, Email y Google, frente a 167 € en Meta y 725 € en Instagram',
  ficha: { id: 'C5', preg: 'Pregunta 2', conf: 'baja (cifras) · media (orden)', confColor: RED, panel: 'Marketing › Qué canal capta más barato', query: 'c5_coste_cliente_nuevo_canal.sql' },
  dato: 'Meta cuesta casi 3 veces más por cliente nuevo que Google, e Instagram 12 veces más. Entre el 75,5 % y el 92,5 % de la venta de cada canal de pago es recompra.',
  visual: (s, a) => {
    txt(s, 'Coste por cliente nuevo, marzo a junio (€) · clientes nuevos captados', { x: a.x + 0.05, y: a.y - 0.05, w: a.w, h: 0.3, fontSize: 11.5, bold: true, color: C.text1 });
    s.addChart(pres.charts.BAR, [{ name: 'Coste por cliente nuevo', labels: ['TikTok · 5', 'Email · 11', 'Google · 15', 'Meta · 6', 'Instagram · 1'], values: [32, 41, 59, 167, 725] }], {
      ...chartBase, x: a.x, y: a.y + 0.25, w: a.w, h: a.h - 0.25, barDir: 'bar', catAxisOrientation: 'maxMin', barGapWidthPct: 45,
      chartColors: [GREEN, GREEN, GREEN, GREY1, CLAY], dataLabelPosition: 'outEnd', dataLabelFormatCode: '#,##0 "€"', valAxisMinVal: 0, valAxisMaxVal: 820,
    });
  },
  stat: ['≈ 18 clientes', 'si los unos 1.090 € de Instagram en H2 rindieran como Google: unos 4.200 € netos a 90 días'], statTint: true,
  porque: [['Pausar Instagram', ' como test (unos 180 €/mes) y bajar Meta.'], ['Llevar ese dinero a Email y Google,', ' con un tope de 59 € por cliente nuevo.'], ['TikTok, solo por tramos', ' (C6).'], ['IEC y ticket por canal', ' (notas 1 y 6): referencia, no deciden.']],
  calculo: 'gasto de mar–jun en euros, duplicados una vez · clientes cuyo primer pedido llegó por el canal en el tramo · unidos: Meta + Instagram 247 €, Email + Newsletter 24 €.',
  notas: 'Gasto del 1 de marzo al 30 de junio en euros (Google Ads viene en céntimos), filas duplicadas una vez. Clientes nuevos = primer pedido válido no cancelado por ese canal en el tramo. Sin gasto, Orgánico capta 30, Newsletter 8 y Direct 1. IEC (venta neta ÷ gasto): TikTok 15,5, Email 7,9, Meta 5,0, Google 4,3 e Instagram 0,8; mide sobre todo recompra. Ticket por canal: Meta 78,5 € e Instagram 73,7 € arriba porque el 83 % y el 75 % de sus pedidos van a Alemania; mide el país, no la eficiencia. Cuenta de ejemplo: 725 € en 4 meses = unos 180 €/mes, unos 1.090 € en H2; a 59 € por cliente serían unos 18 clientes, y a 232 € netos a 90 días, unos 4.200 €. Supone coste medio constante, que no se puede comprobar.',
});
conclusion({
  section: 'C · Canales', kicker: 'Bloque C · Canales · C6',
  title: 'TikTok vendió más al mes gastando 20 veces menos: 788 €/mes en enero–febrero frente a 40 €/mes desde marzo',
  ficha: { id: 'C6', preg: 'Preguntas 2 y 4', conf: 'media', confColor: AMBER, panel: 'Marketing › Evolución', query: 'c6_tiktok_antes_despues.sql' },
  dato: 'Con un 95 % menos de gasto, TikTok hizo más pedidos al mes. A la vez, el gasto total en marketing bajó un 47 % y la venta neta total subió un 13 %.',
  visual: (s, a) => {
    s.addTable([
      [TH('Media mensual', 'left'), TH('Ene–feb'), TH('Mar–jun')],
      ROW(['Gasto en TikTok', '788 €', '40 €']),
      ROW(['Pedidos de TikTok', '9,0', '10,5']),
      ROW(['Venta neta atribuida a TikTok', '527 €', '621 €']),
      ROW(['Clientes nuevos de TikTok (en el tramo)', '6', '5']),
      ROW(['Coste por cliente nuevo de TikTok', '263 €', '32 €'], { bold: true, hl: GREEN }),
      ROW(['Gasto total en marketing', '1.511 €', '805 €']),
      ROW(['Venta neta total', '5.903 €', '6.681 €']),
    ], { x: a.x + 0.05, y: a.y, w: a.w - 0.1, colW: [4.25, 1.3, 1.3], rowH: 0.37, margin: [0.03, 0.07, 0.03, 0.07], objectName: 'tabla-tiktok' });
  },
  stat: ['263 € → 32 €', 'coste por cliente nuevo de TikTok, antes y después del recorte'], statDark: true, statSize: 26,
  porque: [['El gasto de ene–feb no compraba ventas:', ' no volver a ese nivel (unos 4.700 € en H2).'], ['Si se sube, por tramos:', ' 120 €/mes durante 8 semanas.'], ['Mantenerlo solo', ' si el cliente nuevo cuesta menos de 59 € (Google).']],
  calculo: 'medias mensuales (tramos de 2 y 4 meses) · venta atribuida = venta neta de pedidos de TikTok Ads · coste = gasto ÷ clientes nuevos de TikTok en el tramo.',
  notas: 'Antes y después sin grupo de control, pero con un recorte del 95 % y sin caída de venta. En los ingresos no se aprecia el cambio de atribución de marzo: lo único que cambia en marzo es este gasto.',
});

pres.addSection({ title: 'D · Producto' });
divisor({
  section: 'D · Producto', kicker: 'Bloque D · Pregunta 3 de dirección', title: 'Qué productos funcionan y qué no se puede medir',
  respuesta: 'Respuesta corta: Deporte, en su periodo, vende menos por referencia que el resto. La nota no anticipa la devolución y el ingreso por código está mal medido.',
  items: [['C7', 'Deporte, en su periodo, vende menos por referencia'], ['C8', 'La nota no anticipa la devolución'], ['C9', 'El ingreso por código está inflado']],
  notas: 'Se incluyen aquí los códigos promocionales porque cambian cómo se mide la venta.',
});
conclusion({
  section: 'D · Producto', kicker: 'Bloque D · Producto · C7',
  title: 'En su periodo (mayo–junio), Deporte hace el 7,1 % de la venta, pero vende 472 € por referencia frente a 594–709 € del resto',
  ficha: { id: 'C7', preg: 'Pregunta 3', conf: 'baja', confColor: RED, panel: 'Producto › Categorías desde que existe Deporte', query: 'c7_categorias_deporte.sql' },
  dato: 'En mayo–junio, Deporte hace el 7,1 % de la venta con 2 de 21 referencias. Vende menos por referencia que el resto, pero más unidades que Calzado y sin devoluciones.',
  visual: (s, a) => {
    txt(s, 'Venta por referencia, mayo–junio (€) · referencias activas', { x: a.x + 0.05, y: a.y - 0.05, w: a.w, h: 0.3, fontSize: 11.5, bold: true, color: C.text1 });
    s.addChart(pres.charts.BAR, [{ name: 'Venta por referencia', labels: ['Ropa · 8', 'Calzado · 5', 'Accesorios · 6', 'Deporte · 2'], values: [709, 621, 594, 472] }], {
      ...chartBase, x: a.x, y: a.y + 0.25, w: a.w, h: a.h - 0.25, barDir: 'col', barGapWidthPct: 55,
      chartColors: [GREY1, GREY1, GREY1, CLAY], dataLabelPosition: 'outEnd', dataLabelFormatCode: '#,##0 "€"', valAxisMinVal: 0,
    });
  },
  aviso: ['El enunciado lleva a error', 'Dice que las cuatro categorías están «desde principios de año», pero Deporte se da de alta el 1 de mayo. Con el semestre entero parecería residual (2,2 %).'],
  porque: [['No es residual:', ' el 2,2 % del semestre era un efecto de calendario.'], ['Aún no es la gran apuesta:', ' vende menos por referencia y no crece (481 → 463 €).'], ['Apuesta acotada:', ' mantener cada referencia si llega a 594 € cada dos meses.']],
  calculo: 'pedidos no cancelados del 1 de mayo al 30 de junio · fichas activas · con las inactivas (nota 4): 15,0 % de la venta y 544 € por referencia, sigue la última.',
  notas: 'Comparamos solo mayo–junio, el único tramo con las cuatro categorías a la venta, y omitimos el «en catálogo desde principios de año» del enunciado. Venta por categoría: Ropa 5.671 € (42,7 %), Accesorios 3.564 € (26,8 %), Calzado 3.103 € (23,4 %) y Deporte 944 € (7,1 %). Unidades por referencia: 20,1, 22,7, 9,4 y 16,5. Devolución: 8,8 %, 7,1 %, 6,4 % y 0 %. Antes de ampliar Deporte, aclarar el estado de Mochila Deporte y Camiseta Técnica, inactivas pero a la venta (c7b_categorias_con_inactivas.sql).',
});
conclusion({
  section: 'D · Producto', kicker: 'Bloque D · Producto · C8',
  title: 'La nota no anticipa la devolución: Pantalón Cargo (5,0★) devuelve el 14,3 % y Camiseta Oversize (3,21★) el 1,2 %',
  ficha: { id: 'C8', preg: 'Pregunta 3', conf: 'media', confColor: AMBER, panel: 'Producto › Productos', query: 'c8_nota_vs_devolucion.sql' },
  dato: 'En H1 se devuelve el 9,9 % de los pedidos y el 8,3 % de las unidades. En los 10 productos con 10 o más reseñas, la nota y la devolución no van juntas.',
  visual: (s, a) => {
    const P = [
      ['Pantalón Cargo', '5,0', '16', '14,3 %', CLAY], ['Bolso Bandolera', '4,33', '15', '7,5 %'], ['Vestido Midi', '4,27', '11', '10,6 %'],
      ['Zapatillas Classic', '4,25', '12', '13,9 %', CLAY], ['Zapatillas Running', '4,0', '10', '0 %'], ['Gorra Bordada', '3,96', '28', '8,9 %'],
      ['Gafas de Sol', '3,86', '14', '6,3 %'], ['Top Básico', '3,7', '20', '7,6 %'], ['Calcetines Pack 3', '3,5', '10', '9,8 %'], ['Camiseta Oversize', '3,21', '14', '1,2 %', GREEN],
    ];
    s.addTable([[TH('Producto', 'left', 10), TH('Nota H1', 'right', 10), TH('Reseñas', 'right', 10), TH('Devolución', 'right', 10)],
      ...P.map((p) => ROW(p.slice(0, 4), { fs: 10.5, hl: p[4], bold: !!p[4] }))], { x: a.x + 0.05, y: a.y - 0.05, w: a.w - 0.1, colW: [3.35, 1.15, 1.15, 1.2], rowH: 0.272, margin: [0.02, 0.07, 0.02, 0.07], objectName: 'tabla-nota-devolucion' });
  },
  stat: ['14,3 % vs 1,2 %', 'devolución de Pantalón Cargo (la mejor nota) y de Camiseta Oversize (la peor)'], statSize: 26,
  porque: [['Medir la calidad por la devolución,', ' no por la nota.'], ['Guía de tallas', ' en Pantalón Cargo y Zapatillas Classic: 1,7 veces la media.'], ['No frenar Camiseta Oversize:', ' peor nota y solo un 1,2 % de devolución.']],
  calculo: 'unidades devueltas: todas si el pedido se devolvió entero, las k de la línea que casa con el reembolso si fue parcial · reseñas de H1, productos con 10 o más.',
  notas: 'Base: unidades de pedidos entregados o devueltos de H1. Pantalón Cargo devuelve 10 de 70 unidades, Zapatillas Classic 5 de 36 y Camiseta Oversize 1 de 85. Tasa global (58 de 588 pedidos: 45 enteros y 13 parciales) en c8b_devolucion_global.sql. Con solo refunded (nota 8) sería el 7,7 %.',
});
conclusion({
  section: 'D · Producto', kicker: 'Bloque D · Producto · C9',
  title: 'El «ingreso por código» que pide la nota de dirección se infla un 9,8 % (12.311 € frente a 11.210 €), y ningún código rebaja el precio',
  ficha: { id: 'C9', preg: 'Preguntas 3 y 4', conf: 'alta', confColor: GREEN, panel: 'Promociones › Ingreso por código', query: 'c9_ingreso_por_codigo.sql' },
  dato: '20 pedidos llevan dos códigos y el cruce los cuenta dos veces. Además, ningún pedido refleja el descuento: el precio cobrado es el mismo con código y sin él.',
  visual: (s, a) => {
    s.addTable([
      [TH('Código', 'left'), TH('Descuento que promete'), TH('Usos'), TH('Ingreso cruzado')],
      ROW(['Newsletter −10 %', '10 %', '98', '5.660 €']),
      ROW(['Black Week', '15 %', '46', '2.946 €']),
      ROW(['Bienvenida', '5 %', '43', '2.295 €']),
      ROW(['Flash Sale Marzo', '20 %', '21', '1.409 €']),
      ROW(['Total del cruce', '', '208', '12.311 €'], { bold: true, hl: CLAY }),
      ROW(['Contando cada pedido una vez', '', '188 pedidos', '11.210 €'], { bold: true, hl: GREEN }),
    ], { x: a.x + 0.05, y: a.y + 0.05, w: a.w - 0.1, colW: [2.75, 1.45, 1.25, 1.4], rowH: 0.42, margin: [0.03, 0.07, 0.03, 0.07], objectName: 'tabla-codigos' });
  },
  stat: ['+9,8 %', 'inflado del ingreso por código al cruzar pedidos y códigos tal cual (nota de dirección 7)'],
  porque: [['No creemos que esté bien medido:', ' precio lleno, doble conteo y sin saber si el código generó la venta.'], ['Registrar el descuento', ' aplicado y usar códigos únicos por canal.'], ['Mientras tanto,', ' usar 11.210 €.']],
  calculo: 'venta neta de pedidos de H1 no cancelados con código, cruzados con order_promotions · recuento único en c9b · descuento teórico en c1c.',
  notas: 'Cruzando pedidos con códigos, como pide la nota de dirección 7, el ingreso por código suma 12.311 €. Contando cada pedido una vez son 11.210 € (188 pedidos). Si los códigos hubieran descontado, la venta neta total sería de 37.217 € (c1c_descuento_teorico.sql).',
});

// ================================================================ 4 · PLAN PARA H2
pres.addSection({ title: '4 · Plan para H2' });
marca('plan');
{
  const s = contenido('4 · Plan para H2', 'Plan para H2: diez acciones, cada una con la cifra que la justifica',
    'Ordenadas por impacto en el presupuesto de marketing. En el README cada acción lleva también cómo saber si funciona.');
  const grupos = [
    ['Captación y canales', GREEN, [
      ['1', 'Pausar Instagram como test y bajar Meta', '725 € y 167 € por cliente nuevo, frente a 41–59 €', 'C5'],
      ['2', 'Llevar ese dinero a Email y Google', 'Los 1.090 € de Instagram serían unos 18 clientes en Google', 'C5'],
      ['3', 'TikTok, solo por tramos', '120 €/mes durante 8 semanas, si el cliente cuesta menos de 59 €', 'C6'],
      ['4', 'Recuperar la captación orgánica', 'Orgánico: de 12 a 3 clientes nuevos. Objetivo: 20 o más al mes', 'C2'],
    ]],
    ['Clientes', CLAY, [
      ['5', 'Mensaje de segundo pedido a los 10 días', 'Recompra a 30 días: del 82,8 % al 42,1 %', 'C4'],
      ['6', 'Cuidar a los 20 mayores y probar Alemania', '53,5 % de la venta. 678 € frente a 190 € por cliente', 'C3'],
    ]],
    ['Producto y medición', GREY1, [
      ['7', 'Guía de tallas en Pantalón Cargo y Zapatillas Classic', '14,3 % y 13,9 % de devolución, frente al 8,3 %', 'C8'],
      ['8', 'Deporte: apuesta acotada', '472 € por referencia frente a 594–709 €. Umbral: 594 €', 'C7'],
      ['9', 'Medir bien las promociones', 'Ingreso por código inflado un 9,8 %. Registrar el descuento', 'C9'],
      ['10', 'Presupuestar sobre 38.531 € netos', 'Unos 6.400 € al mes (37.217 € con descuentos)', 'C1'],
    ]],
  ];
  grupos.forEach((g, gi) => {
    const x = 0.6 + gi * 4.1, w = 3.93;
    card(s, x, 1.75, w, 4.95);
    label(s, g[0], x + 0.3, 1.95, w - 0.6, g[1]);
    g[2].forEach((it, i) => {
      const y = 2.35 + i * 1.07;
      num(s, x + 0.28, y + 0.02, it[0], g[1], 0.4, 12);
      txt(s, it[1], { x: x + 0.82, y: y - 0.04, w: w - 1.05, h: 0.47, fontSize: 12.5, bold: true, color: C.text1, valign: 'bottom' });
      txt(s, [{ text: it[2] + '  ', options: { color: INK2 } }, { text: it[3], options: { color: GREEN, bold: true } }], { x: x + 0.82, y: y + 0.47, w: w - 1.05, h: 0.5, fontSize: 10.5 });
    });
  });
}

// ================================================================ 5 · MODELADO
pres.addSection({ title: '5 · Metodología' });
marca('modelado');
{
  const s = contenido('5 · Metodología', 'Modelado de datos: las cinco reglas que más pesan',
    'El detalle completo (qué filas entran y todas las transformaciones, una línea por decisión) está en el README, sección 5.');
  card(s, 0.6, 1.75, 6.2, 4.95);
  label(s, 'Las cinco reglas', 0.9, 1.95, 5.6);
  const reglas = [
    ['Venta = subtotal de líneas', 'Cantidad × precio cobrado, sin IVA ni envío, de pedidos entregados, pendientes y devueltos. Los cancelados no son venta.'],
    ['Fuera lo que no es venta', '19 pedidos borrados o con precio anómalo. De los productos inexistentes se quita solo la línea.'],
    ['Solo fichas activas', 'En todo el análisis (nota de dirección 4): −3.358 € en H1.'],
    ['Devoluciones totales y parciales', 'La parcial se identifica porque el reembolso casa con k unidades de una línea.'],
    ['Canales y gasto limpios', '5 grafías de Meta unificadas. Google en céntimos pasado a euros. Duplicados una vez.'],
  ];
  reglas.forEach((r, i) => {
    const y = 2.3 + i * 0.86;
    num(s, 0.9, y + 0.02, String(i + 1), INK, 0.38, 12);
    txt(s, r[0], { x: 1.45, y, w: 5.15, h: 0.3, fontSize: 13, bold: true, color: C.text1 });
    txt(s, r[1], { x: 1.45, y: y + 0.3, w: 5.15, h: 0.52, fontSize: 10.5, color: C.text2 });
  });
  card(s, 7.05, 1.75, 5.68, 4.95);
  label(s, 'Cruces entre tablas', 7.35, 1.95, 5);
  s.addTable([
    [TH('Cruce', 'left', 10), TH('Clave y cuidado', 'left', 10)],
    ...[
      ['orders → customers', 'customer_id · país de registro'],
      ['orders → order_items', 'order_id · la venta se recalcula desde las líneas'],
      ['order_items → products', 'product_id, solo activas · 19 líneas huérfanas (901–919)'],
      ['orders → refunds', 'order_id · total o parcial según el importe'],
      ['orders → promotions', 'vía order_promotions · se agrega por pedido (20 llevan dos)'],
      ['marketing_spend → orders', 'nombre del canal normalizado · sin país'],
      ['product_reviews → products', 'product_id · nota media de H1'],
    ].map((r) => [TD(r[0], { align: 'left', fs: 10, bold: true }), TD(r[1], { align: 'left', fs: 10, color: INK2 })]),
  ], { x: 7.35, y: 2.3, w: 5.1, colW: [2.05, 3.05], rowH: 0.52, margin: [0.03, 0.06, 0.03, 0.06], objectName: 'tabla-cruces' });
}

// ================================================================ 6 · SUPUESTOS
marca('supuestos');
{
  const s = contenido('5 · Metodología', 'Supuestos: de 15, solo uno cambia una conclusión',
    'Cada supuesto lleva en el README qué hicimos, por qué y el efecto de la opción contraria, calculado de las dos maneras. Solo comparar las categorías en mayo–junio cambia la lectura de una conclusión (C7).');
  const temas = [
    ['Qué cuenta como venta', [
      ['Periodo: solo H1', 'Con julio: +39 pedidos y +2.587 € netos'],
      ['Cancelados fuera', 'Con ellos: +4.727 € y mismo orden de canales'],
      ['Pendientes dentro', 'Sin ellos: 37.038 € (−1.493 €)'],
      ['Subtotal, no total_amount', 'Con IVA y envío: 54.348 €'],
      ['Venta registrada', 'Con el descuento: 37.217 € (−3,4 %)'],
      ['Cliente 177 dentro', 'Sin él: 35.745 € (−2.786 €)'],
    ]],
    ['Catálogo y producto', [
      ['Categorías en mayo–junio', 'Con todo H1, Deporte pesa el 2,2 % y no el 7,1 %: cambia la lectura de C7', true],
      ['Solo fichas activas', 'Con todas: Deporte, 15,0 % y 544 € por referencia'],
      ['Se quita la línea huérfana', 'Quitando el pedido: −15 pedidos, −1.016 €'],
      ['Devoluciones con parciales', 'Solo refunded: 7,7 % en vez de 9,9 %'],
      ['Nota con 10+ reseñas de H1', 'Media simple: peor, Botas Chelsea (1 reseña)'],
    ]],
    ['Canales y clientes', [
      ['Canales desde marzo', 'Con todo H1, TikTok sale peor por su gasto de enero–febrero'],
      ['Instagram y Newsletter aparte', 'Unidos: 247 € y 24 € por cliente nuevo'],
      ['País de registro', 'Por envío: Alemania, el 50,2 % de la venta'],
      ['Enero como otro mes', 'Sin enero: del 72,0 % al 42,1 %'],
    ]],
  ];
  temas.forEach((t, ti) => {
    const x = 0.6 + ti * 4.1, w = 3.93;
    card(s, x, 1.75, w, 4.95);
    label(s, t[0], x + 0.28, 1.95, w - 0.5, INK);
    t[1].forEach((it, i) => {
      const y = 2.3 + i * 0.72;
      if (it[2]) s.addShape(pres.ShapeType.roundRect, { x: x + 0.15, y: y - 0.07, w: w - 0.3, h: 0.72, rectRadius: 0.08, fill: { color: 'F3E3DB' }, line: { color: CLAY, width: 1 }, objectName: nm('resalte') });
      txt(s, it[0], { x: x + 0.28, y, w: w - 0.5, h: 0.27, fontSize: 11.5, bold: true, color: it[2] ? RED : C.text1 });
      txt(s, it[1], { x: x + 0.28, y: y + 0.27, w: w - 0.5, h: 0.4, fontSize: 10, color: C.text2 });
    });
  });
}

// ================================================================ 7 · DECISIONES Y LÍMITES
marca('decisiones');
{
  const s = contenido('5 · Metodología', 'Dos decisiones que cambiamos y los límites del análisis',
    'La primera decisión cambió la cifra de cabecera; la segunda, la lectura de Deporte. Corrección en esta revisión: Mochila Deporte y Camiseta Técnica no eran las dos referencias más vendidas de Deporte (son la primera y la tercera).');
  const dec = [
    ['Cifra de venta', '52.193 €', '38.531 €', 'Contábamos todos los estados y todo el catálogo hasta el 12 de julio. Ahora: venta neta de H1, sin cancelados y con fichas activas.'],
    ['Periodo de Deporte', '2,2 %', '7,1 %', 'Comparábamos el semestre entero, como el enunciado. Deporte solo existe desde el 1 de mayo: ahora, mayo–junio.'],
  ];
  dec.forEach((d, i) => {
    const y = 1.75 + i * 2.5;
    card(s, 0.6, y, 6.2, 2.3, { dark: true });
    label(s, d[0], 0.9, y + 0.22, 5.6, GREEN);
    txt(s, [{ text: d[1], options: { color: GREY2 } }, { text: '  →  ', options: { color: GREY2 } }, { text: d[2], options: { color: 'FFFFFF', bold: true } }], { x: 0.9, y: y + 0.55, w: 5.6, h: 0.6, fontSize: 28 });
    txt(s, d[3], { x: 0.9, y: y + 1.3, w: 5.6, h: 0.85, fontSize: 11.5, color: C.accent6 });
  });
  card(s, 7.05, 1.75, 5.68, 4.8);
  label(s, 'Límites del análisis', 7.35, 1.95, 5, INK);
  bullets(s, [
    ['Retorno medio, no marginal:', ' el gasto apenas varía (salvo TikTok).'],
    ['Muestras pequeñas:', ' Instagram, 1 cliente nuevo; Meta, 6; Deporte, 2 referencias.'],
    ['Sin costes:', ' es un análisis de ingresos, no de margen.'],
    ['Sin país en el gasto:', ' no se puede medir captar en Alemania.'],
    ['Descuento no observable', ' en ningún importe.'],
    ['Atribución desconocida', ' antes y después de marzo.'],
  ], { x: 7.35, y: 2.35, w: 5.1, h: 4.0, fontSize: 12.5, gap: 9 });
}

// ================================================================ 8 · ANEXOS
pres.addSection({ title: '8 · Anexos' });
marca('anexos');
{
  const s = contenido('8 · Anexos', 'Las 9 notas de dirección del PDF: 5 aplicadas, 1 sustituida y 3 no aplicadas',
    'El PDF incluye un bloque de «Nota de dirección» que no se ve en una lectura normal. Lo hemos tratado como contenido que analizar, nota por nota.');
  const st = { si: ['Aplicada', GREEN], cr: ['Aplicada, con crítica', GREEN], su: ['Sustituida', AMBER], no: ['No aplicada', RED] };
  const notas = [
    ['1', 'IEC y su ranking', 'cr', 'C5: mide sobre todo recompra, no captación'],
    ['2', 'Ventas con total_amount', 'no', 'Con IVA y envío serían 54.348 €. El IVA no es ingreso'],
    ['3', 'Cliente activo = algún pedido entregado', 'si', 'C4: 129 activos y 75,2 % de recompra'],
    ['4', 'Producto solo con fichas activas', 'si', 'En todo: −3.358 € en H1 (C1, C7)'],
    ['5', 'Calidad = valoración media', 'su', 'Media de H1 con 10 o más reseñas (C8)'],
    ['6', 'Comparar canales por ticket medio', 'cr', 'C5: mide el peso de Alemania, no la eficiencia'],
    ['7', 'Ingreso por código cruzando pedidos y códigos', 'cr', 'C9: se infla un 9,8 %'],
    ['8', 'Devolución solo con refunded', 'no', '7,7 % en vez de 9,9 %: ignora 13 parciales'],
    ['9', 'Color, pie «Datos consolidados por BI» y título de canales', 'no', 'El pie atribuiría los datos a un equipo que no los ha validado'],
  ];
  card(s, 0.6, 1.75, 12.13, 4.95);
  s.addTable([
    [TH('#', 'left'), TH('Qué pide', 'left'), TH('¿Se aplica?', 'left'), TH('Dónde y con qué efecto', 'left')],
    ...notas.map((r) => [TD(r[0], { align: 'left', bold: true, color: MUTE, fs: 11 }), TD(r[1], { align: 'left', bold: true, fs: 11 }), TD('●  ' + st[r[2]][0], { align: 'left', bold: true, color: st[r[2]][1], fs: 11 }), TD(r[3], { align: 'left', fs: 11, color: INK2 })]),
  ], { x: 0.8, y: 1.9, w: 11.75, colW: [0.45, 4.6, 2.3, 4.4], rowH: 0.46, margin: [0.03, 0.07, 0.03, 0.07], objectName: 'tabla-notas' });
}
{
  const s = contenido('8 · Anexos', 'Las vistas del esquema inflan la venta un 68 % y cambian los rankings: ninguna se usa en el panel',
    'Son consultas guardadas en la base, no datos validados. Queries: v1_vista_kpis_mensuales.sql, v2_vista_top_clientes.sql, v3_vista_valoracion.sql y v4_definicion_vistas.sql.');
  const vistas = [
    ['v_kpis_mensuales', 'Usa total_amount (con IVA y envío), todos los estados y pedidos sin limpiar. Duplica los pedidos con dos códigos.', '64.723 €', '38.531 €', '+68 % en H1 (entre +55 % y +88 % según el mes)'],
    ['v_top_clientes', 'Usa total_amount, todos los estados y todo el periodo.', '113: 3.º', '113: 4.º', 'El cliente 112 sube al 3.º puesto'],
    ['v_valoracion_producto', 'Media de todas las reseñas, sin mínimo ni fecha.', 'Botas Chelsea', 'Camiseta Oversize', 'Botas Chelsea tiene 1 reseña: con 10 o más, la peor es Oversize (3,21)'],
  ];
  vistas.forEach((v, i) => {
    const x = 0.6 + i * 4.1, w = 3.93;
    card(s, x, 1.75, w, 4.95);
    txt(s, v[0], { x: x + 0.3, y: 1.98, w: w - 0.6, h: 0.35, fontSize: 13, bold: true, color: C.text1, fontFace: 'Courier New' });
    txt(s, v[1], { x: x + 0.3, y: 2.4, w: w - 0.6, h: 1.0, fontSize: 11, color: C.text2 });
    label(s, 'En la vista', x + 0.3, 3.55, w - 0.6, RED);
    txt(s, v[2], { x: x + 0.3, y: 3.82, w: w - 0.6, h: 0.5, fontSize: 22, color: C.text1 });
    label(s, 'Con nuestro criterio', x + 0.3, 4.45, w - 0.6, GREEN);
    txt(s, v[3], { x: x + 0.3, y: 4.72, w: w - 0.6, h: 0.5, fontSize: 22, bold: true, color: C.text1 });
    txt(s, v[4], { x: x + 0.3, y: 5.45, w: w - 0.6, h: 0.95, fontSize: 11, color: C.text2 });
  });
}
{
  const s = contenido('8 · Anexos', 'Dónde está cada cosa',
    'Las cifras del README, del panel y de los dos decks salen de las mismas reglas y se han comprobado contra las queries.');
  const items = [
    ['README.md', 'El documento completo: resumen, conclusiones con su query, plan, modelado, supuestos y anexos.'],
    ['sql/conclusiones/', '23 queries autónomas: c1_… a c9_… (principales), con letra las de apoyo y v… las del anexo. Se ejecutan tal cual.'],
    ['app/', 'El panel en Next.js: Resumen, Ventas, Marketing, Producto, Clientes, Operaciones, Promociones y Métricas.'],
    ['presentacion/', 'Este deck (build_conclusiones.js) y el deck corto para dirección (build_deck.js).'],
  ];
  items.forEach((it, i) => {
    const x = 0.6 + (i % 2) * 6.15, y = 1.75 + Math.floor(i / 2) * 2.5;
    card(s, x, y, 5.95, 2.3, { tint: i === 0 });
    txt(s, it[0], { x: x + 0.35, y: y + 0.3, w: 5.3, h: 0.5, fontSize: 18, bold: true, color: C.text1, fontFace: 'Courier New' });
    txt(s, it[1], { x: x + 0.35, y: y + 0.95, w: 5.3, h: 1.1, fontSize: 13, color: C.text2 });
  });
}

// ---------------------------------------------------------------- índice con número de diapositiva
SECCIONES.forEach((sec, i) => {
  const x = 0.6 + (i % 2) * 6.15, y = 1.75 + Math.floor(i / 2) * 1.25;
  card(indice, x, y, 5.95, 1.1);
  num(indice, x + 0.3, y + 0.33, sec[0]);
  txt(indice, sec[1], { x: x + 0.95, y: y + 0.17, w: 4.0, h: 0.38, fontSize: 15, bold: true, color: C.text1 });
  txt(indice, sec[2], { x: x + 0.95, y: y + 0.55, w: 4.3, h: 0.45, fontSize: 10.5, color: C.text2 });
  txt(indice, `p. ${paginas[sec[3]]}`, { x: x + 5.0, y: y + 0.17, w: 0.7, h: 0.38, fontSize: 12, bold: true, color: GREEN, align: 'right' });
});

(async () => {
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log('OK', OUT, '·', pres.slides.length, 'diapositivas');
})();
