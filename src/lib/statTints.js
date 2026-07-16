// Shared pastel card tints for KPI stat cards — cycled by index so every
// page's metrics read as one consistent, colorful set (rose, amber, mint, violet).
export const STAT_TINTS = [
  { bg: '#ffe1ec', fg: '#d6336c' },
  { bg: '#ffedd1', fg: '#dd8b0d' },
  { bg: '#d9f7e3', fg: '#0e9f6e' },
  { bg: '#ece3ff', fg: '#7c3aed' },
]

export const statTint = (index) => STAT_TINTS[index % STAT_TINTS.length]
