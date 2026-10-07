'use client';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Gasto, Pedido } from '@/lib/types';
import { canalesConGasto, claveDe, clavesDe, div, porCanal, selGasto, selPedidos, serieDimension, variacion, venta, type Gran } from '@/lib/calc';
import { eur, etiquetaPeriodo, num, pct, x, PALETA_NEUTRA } from '@/lib/format';
import type { Ctx } from '../ctx';
import { Card, Kpi, Section, Seg, Table, Tip, AX, GRID, KpiBoard, KpiGroup } from '../ui';

const COLOR: Record<string, string> = {};
const colorCanal = (c: string, i: number) => COLOR[c] ?? PALETA_NEUTRA[i % PALETA_NEUTRA.length];

// Indicadores de marketing de una selección de pedidos y de gasto
function mk(P: Pedido[], G: Gasto[], pago: Set<string>) {
  const pp = P.filter((p) => pago.has(p.canal));
  const inversion = G.filter((g) => pago.has(g.canal)).reduce((s, g) => s + g.gasto_eur, 0);
  const ventasPago = pp.reduce((s, p) => s + venta(p), 0);
  const total = P.reduce((s, p) => s + venta(p), 0);
  const nuevos = pp.filter((p) => p.nuevo_cliente).length;
  return { inversion, ventasPago, roas: div(ventasPago, inversion), cpa: div(inversion, pp.filter((p) => p.estado !== 'cancelled').length), cac: div(inversion, nuevos), pctPago: div(ventasPago, total), pedidosPago: pp.length };
}

export default function Marketing({ c }: { c: Ctx }) {
  const { d, f, P, Pant, ant, dias } = c;
  const [gran, setGran] = useState<Gran | null>(null);
  const auto: Gran = dias <= 45 ? 'day' : dias <= 200 ? 'week' : 'month'; // por defecto, la granularidad se adapta al periodo
  const g: Gran = dias > 120 && (gran ?? auto) === 'day' ? 'week' : (gran ?? auto);
  const pago = canalesConGasto(d);
  const G = selGasto(d, f);
  const canales = porCanal(P, G, pago);
  const m = mk(P, G, pago);
  const mp = ant && Pant ? mk(Pant, selGasto(d, { ...f, ...ant }), pago) : null;
  const dv = (a: number, b?: number) => (mp && b != null ? variacion(a, b) : null);
  const conPago = canales.filter((r) => r.conGasto);
  // Comparación de canales: solo mar–jun (cambio del modelo de atribución en marzo, según dirección). Métrica principal: coste por cliente nuevo.
  const fr = { ...f, desde: '2026-03-01', hasta: '2026-06-30' };
  const Pr = selPedidos(d, fr), Gr = selGasto(d, fr);
  const pctDE = (c_: string) => { const R = Pr.filter((p) => p.canal === c_ && p.estado !== 'cancelled'); return div(R.filter((p) => p.pais === 'DE').length, R.length); };
  const rec = porCanal(Pr, Gr, pago).filter((r) => r.conGasto).sort((a, b) => (isFinite(a.cac) ? a.cac : 1e9) - (isFinite(b.cac) ? b.cac : 1e9));
  const unir = (nombre: string, cs: string[]) => {
    const g_ = Gr.filter((x_) => cs.includes(x_.canal)).reduce((s, x_) => s + x_.gasto_eur, 0);
    const n_ = Pr.filter((p) => cs.includes(p.canal) && p.nuevo_cliente).length;
    return `${nombre}: ${eur(div(g_, n_))} por cliente nuevo`;
  };
  const ranking = [...conPago].filter((r) => isFinite(r.roas)).sort((a, b) => b.roas - a.roas);
  const cuotas = conPago.map((r) => ({ canal: r.canal, 'Cuota de inversión': r.cuotaGasto, 'Cuota de ventas': r.cuotaVentas }));
  const colorDe = (canal: string) => colorCanal(canal, canales.findIndex((r) => r.canal === canal));

  // Inversión y ventas atribuidas por periodo
  const claves = clavesDe(g, f.desde, f.hasta);
  const evo = claves.map((cl) => ({
    label: etiquetaPeriodo(g, cl),
    inversion: G.filter((x_) => pago.has(x_.canal) && claveDe(g, x_.fecha) === cl).reduce((s, x_) => s + x_.gasto_eur, 0),
    ventas: P.filter((p) => pago.has(p.canal) && claveDe(g, p.fecha) === cl).reduce((s, p) => s + venta(p), 0),
  }));
  const apilado = serieDimension(P.map((p) => ({ fecha: p.fecha, k: p.canal, v: venta(p) })), g, f.desde, f.hasta, 8);
  const apiladoRows = apilado.rows.map((r) => ({ ...r, label: etiquetaPeriodo(g, r.clave as string) }));

  return (
    <>
      <Section title="Qué canal capta clientes más barato (marzo a junio)" sub="Dirección solo da por comparables los canales desde marzo, por el cambio del modelo de atribución. En los ingresos no se aprecia ese cambio: lo único que cambia en marzo es el gasto de TikTok (−95 %).">
        <Card info={<p className="i-def">Coste por cliente nuevo = inversión del canal entre los clientes cuyo primer pedido llegó por ese canal, del 1 de marzo al 30 de junio. Es la métrica que decide el presupuesto de captación. El IEC (venta neta atribuida entre inversión) y el ticket se muestran como referencia: la mayor parte de la venta atribuida es recompra de clientes ya captados, y el ticket refleja el peso de Alemania, no la eficiencia del canal.</p>}>
          <Table rows={rec} cols={[
            { key: 'canal', label: 'Canal', left: true, sort: (r) => r.canal, render: (r) => <b>{r.canal}</b> },
            { key: 'gasto', label: 'Inversión', sort: (r) => r.gasto, render: (r) => eur(r.gasto) },
            { key: 'nuevos', label: 'Clientes nuevos', sort: (r) => r.nuevos, render: (r) => num(r.nuevos) },
            { key: 'cac', label: 'Coste por cliente nuevo', sort: (r) => (isFinite(r.cac) ? r.cac : 1e9), render: (r) => <b>{eur(r.cac)}</b> },
            { key: 'iec', label: 'IEC', sort: (r) => r.iec, render: (r) => x(r.iec, 1) },
            { key: 'rec', label: '% venta de recompra', sort: (r) => r.pctRecompra, render: (r) => pct(r.pctRecompra) },
            { key: 'ticket', label: 'Ticket', sort: (r) => r.ticket, render: (r) => eur(r.ticket, 2) },
            { key: 'de', label: '% pedidos a Alemania', sort: (r) => pctDE(r.canal), render: (r) => pct(pctDE(r.canal), 0) },
          ]} />
          <p className="i-def" style={{ marginTop: 8 }}>Agrupando como el anexo: {unir('Meta + Instagram', ['Meta Ads', 'Instagram Ads'])} · {unir('Email + Newsletter', ['Email', 'Newsletter'])}. El orden de la decisión no cambia. El ticket por canal no sirve para comparar canales: mide el país de destino, no la eficiencia.</p>
        </Card>
      </Section>

      <Section title="Canales de pago" sub={`Canales con inversión registrada: ${[...pago].join(', ') || 'ninguno'}.`}>
        <KpiBoard>
          <KpiGroup title="Inversión" w={4}>
            <Kpi m="inversion" tone="dark" value={eur(m.inversion)} delta={dv(m.inversion, mp?.inversion)} />
            <Kpi m="ventas_pago" value={eur(m.ventasPago)} delta={dv(m.ventasPago, mp?.ventasPago)} />
          </KpiGroup>
          <KpiGroup title="Retorno" w={4}>
            <Kpi m="roas" tone="accent" value={x(m.roas, 1)} delta={dv(m.roas, mp?.roas)} />
            <Kpi m="pct_ventas_pago" value={pct(m.pctPago)} delta={dv(m.pctPago, mp?.pctPago)} />
          </KpiGroup>
          <KpiGroup title="Coste de adquisición" w={4}>
            <Kpi m="cpa" value={eur(m.cpa, 2)} delta={dv(m.cpa, mp?.cpa)} invert />
            <Kpi m="cac" value={eur(m.cac, 2)} delta={dv(m.cac, mp?.cac)} invert />
          </KpiGroup>
        </KpiBoard>
      </Section>

      <Section title="Ranking de canales" sub="Haz clic en una columna para ordenar. Los canales sin inversión no tienen retorno por euro: se muestran con sus ventas.">
        <Card>
          <Table rows={canales} initialSort="ventas" cols={[
            { key: 'canal', label: 'Canal', left: true, sort: (r) => r.canal, render: (r) => <><b>{r.canal}</b> {!r.conGasto && <span className="tag">sin inversión</span>}</> },
            { key: 'ventas', label: 'Ventas', sort: (r) => r.ventas, render: (r) => eur(r.ventas) },
            { key: 'shareVentas', label: '% ventas', sort: (r) => r.shareVentas, render: (r) => pct(r.shareVentas) },
            { key: 'pedidos', label: 'Pedidos', sort: (r) => r.pedidos, render: (r) => num(r.pedidos) },
            { key: 'ticket', label: 'Ticket', sort: (r) => r.ticket, render: (r) => eur(r.ticket, 2) },
            { key: 'nuevos', label: 'Nuevos', sort: (r) => r.nuevos, render: (r) => num(r.nuevos) },
            { key: 'gasto', label: 'Inversión', sort: (r) => (r.conGasto ? r.gasto : -1), render: (r) => (r.conGasto ? eur(r.gasto) : '—') },
            { key: 'roas', label: 'ROAS', sort: (r) => r.roas, render: (r) => (isFinite(r.roas) ? <b>{x(r.roas, 1)}</b> : '—') },
            { key: 'cpa', label: 'CPA', sort: (r) => r.cpa, render: (r) => eur(r.cpa, 2) },
            { key: 'cac', label: 'CAC', sort: (r) => r.cac, render: (r) => eur(r.cac, 2) },
            { key: 'cg', label: '% inversión', sort: (r) => r.cuotaGasto, render: (r) => pct(r.cuotaGasto) },
            { key: 'cv', label: '% ventas pago', sort: (r) => r.cuotaVentas, render: (r) => pct(r.cuotaVentas) },
            { key: 'dev', label: '% devolución', sort: (r) => r.devolucion, render: (r) => pct(r.devolucion) },
          ]} />
        </Card>
      </Section>

      <Section title="Rentabilidad por canal" sub="Si un canal vende más porcentaje del que gasta, rinde por encima de su inversión; si gasta más del que vende, por debajo.">
        <div className="grid g-2">
          <Card title="ROAS por canal" info={<p className="i-def">Euros de venta por cada euro invertido en cada canal de pago. Es un retorno medio: no indica qué rendiría el siguiente euro invertido.</p>}>
            <div className="chart">
              <ResponsiveContainer>
                <BarChart data={ranking} layout="vertical" margin={{ left: 10, right: 24 }}>
                  <CartesianGrid horizontal={false} stroke={GRID} />
                  <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} tick={AX} tickFormatter={(v) => v + '×'} />
                  <YAxis type="category" dataKey="canal" tickLine={false} axisLine={false} fontSize={11} width={100} tick={AX} />
                  <Tooltip content={<Tip fmt={(v: number) => x(v, 1)} />} cursor={{ fill: 'rgba(11,12,12,.05)' }} />
                  <Bar dataKey="roas" name="ROAS" radius={3}>{ranking.map((r) => <Cell key={r.canal} fill={colorDe(r.canal)} />)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title="Cuota de inversión y de ventas" info={<p className="i-def">Peso de cada canal de pago en la inversión total y en las ventas de los canales de pago. Una barra de ventas mayor que la de inversión indica un canal que rinde por encima de su gasto.</p>}>
            <div className="chart">
              <ResponsiveContainer>
                <BarChart data={cuotas}>
                  <CartesianGrid vertical={false} stroke={GRID} />
                  <XAxis dataKey="canal" tickLine={false} axisLine={false} fontSize={11} tick={AX} />
                  <YAxis tickLine={false} axisLine={false} fontSize={11} tick={AX} tickFormatter={(v) => Math.round(v * 100) + '%'} />
                  <Tooltip content={<Tip fmt={(v: number) => pct(v)} />} cursor={{ fill: 'rgba(11,12,12,.05)' }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="Cuota de inversión" fill="#b9bdbb" radius={3} />
                  <Bar dataKey="Cuota de ventas" fill="#5b9a7b" radius={3} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Evolución" action={<Seg value={g} onChange={(v) => setGran(v as Gran)} options={[{ v: 'day', l: 'Día', off: dias > 120 }, { v: 'week', l: 'Semana' }, { v: 'month', l: 'Mes' }]} />}>
        <div className="grid g-2">
          <Card title="Inversión y ventas de canales de pago" info={<p className="i-def">Barras: inversión de cada periodo (eje izquierdo). Línea: ventas atribuidas a canales de pago (eje derecho).</p>}>
            <div className="chart">
              <ResponsiveContainer>
                <ComposedChart data={evo}>
                  <CartesianGrid vertical={false} stroke={GRID} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} tick={AX} minTickGap={14} />
                  <YAxis yAxisId="l" tickLine={false} axisLine={false} fontSize={11} tick={AX} tickFormatter={(v) => eur(v)} />
                  <YAxis yAxisId="r" orientation="right" tickLine={false} axisLine={false} fontSize={11} tick={AX} tickFormatter={(v) => (v >= 1000 ? num(v / 1000, 0) + 'k' : v)} />
                  <Tooltip content={<Tip fmt={(v: number) => eur(v)} />} cursor={{ fill: 'rgba(11,12,12,.05)' }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                  <Bar yAxisId="l" dataKey="inversion" name="Inversión" fill="#d5d8d6" />
                  <Line yAxisId="r" dataKey="ventas" name="Ventas atribuidas" stroke="#0b0c0c" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title="Ventas por canal" info={<p className="i-def">Ventas de cada periodo apiladas por canal de adquisición, incluidos los canales sin inversión.</p>}>
            <div className="chart">
              <ResponsiveContainer>
                <BarChart data={apiladoRows} barCategoryGap={g === 'day' ? 1 : '22%'}>
                  <CartesianGrid vertical={false} stroke={GRID} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={11} tick={AX} minTickGap={14} />
                  <YAxis tickLine={false} axisLine={false} fontSize={11} tick={AX} tickFormatter={(v) => (v >= 1000 ? num(v / 1000, 0) + 'k' : v)} />
                  <Tooltip content={<Tip fmt={(v: number) => eur(v)} />} cursor={{ fill: 'rgba(11,12,12,.05)' }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                  {apilado.grupos.map((gname) => <Bar key={gname} dataKey={gname} stackId="a" fill={gname === 'Otros' ? '#e1e3e2' : colorDe(gname)} />)}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
