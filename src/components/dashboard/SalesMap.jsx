import Card from '../Card'
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

// Stylized, non-geographic continent silhouettes — this is a decorative locator map,
// not a choropleth, so precision isn't the point; the legend below carries the actual
// values so identity never depends on position or color alone.
const CONTINENTS = [
  // North America
  'M35,55 q10,-22 35,-24 q28,-2 40,14 q10,13 2,24 q-6,9 -22,10 q4,14 -8,22 q-14,10 -28,2 q-16,-9 -18,-24 q-8,-2 -10,-14 q-2,-8 9,-10 Z',
  // South America
  'M88,108 q16,-10 28,2 q9,9 6,26 q-3,20 -10,38 q-6,15 -18,12 q-11,-3 -12,-20 q-2,-22 -3,-38 q-1,-14 9,-20 Z',
  // Europe
  'M195,50 q14,-13 32,-6 q11,5 8,17 q-3,11 -16,13 q-15,2 -24,-6 q-8,-7 0,-18 Z',
  // Africa
  'M190,78 q20,-8 34,4 q12,10 8,28 q-4,20 -12,40 q-7,17 -20,15 q-13,-2 -15,-22 q-3,-24 -5,-42 q-1,-15 10,-23 Z',
  // Asia
  'M232,45 q40,-18 78,0 q22,11 26,30 q4,17 -12,26 q4,14 -10,20 q-18,8 -34,-2 q-10,-6 -8,-18 q-24,2 -38,-10 q-14,-11 -4,-26 q0,-13 2,-20 Z',
  // Australia
  'M298,138 q20,-10 38,0 q13,7 10,20 q-3,13 -20,14 q-19,1 -30,-8 q-9,-8 2,-26 Z',
]

const MARKERS = [
  { label: 'United States', value: '38%', x: 72, y: 62, color: '#2a78d6' },
  { label: 'Brazil', value: '22%', x: 100, y: 128, color: '#e34948' },
  { label: 'United Kingdom', value: '15%', x: 208, y: 58, color: '#4a3aa7' },
  { label: 'India', value: '25%', x: 285, y: 78, color: '#1baf7a' },
]

const DOT_BG = {
  backgroundImage: 'radial-gradient(circle, #d7d4ef 1px, transparent 1px)',
  backgroundSize: '10px 10px',
}

export default function SalesMap() {
  return (
    <Card title="Sales Mapping by Country" subtitle="Share of orders by region">
      <div className="overflow-hidden rounded-xl bg-white" style={DOT_BG}>
        <ComposableMap
          projectionConfig={{ scale: 100 }}
          width={400}
          height={180}
        >
          <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#E5E5E5"
                  stroke="#FFFFFF"
                  strokeWidth={0.3}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>

      <ul className="mt-4 space-y-2.5">
        {MARKERS.map((m) => (
          <li key={m.label} className="flex items-center justify-between gap-2 text-sm">
            <span className="flex min-w-0 items-center gap-2 text-ink-500">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: m.color }} />
              {m.label}
            </span>
            <span className="shrink-0 font-semibold text-ink-900">{m.value}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
