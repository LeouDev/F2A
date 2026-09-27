export type Tile = {
  /** Phones/tablets (2 columns): spans both columns */
  full: boolean
  /** lg+ (3 columns): 2×2 feature, 2×1 wide, or the whole row */
  lg: 'feature' | 'wide' | 'row' | null
}

/**
 * Tile sizes for a gallery of `n` photos that always fills complete rows — any filter, any count.
 * Phones/tablets: the first tile goes full width when `n` is odd.
 * lg: the first tile becomes a 2×2 feature once there are 6+ photos (adds 3 cells, so rows stay even),
 * then 0–2 wide tiles, spread through the list, pad the cell count to a multiple of 3.
 * Relies on `grid-auto-flow: row dense`. Checked by scripts/check-bento.ts.
 */
export function bentoTiles(n: number): Tile[] {
  const tiles: Tile[] = Array.from({ length: n }, (_, i) => ({ full: n % 2 === 1 && i === 0, lg: null }))
  if (n === 1) {
    tiles[0].lg = 'row'
    return tiles
  }
  if (n >= 6) tiles[0].lg = 'feature'
  const need = (3 - (n % 3)) % 3
  const wide = need === 1 ? [Math.floor(n / 2)] : need === 2 ? [Math.floor(n / 3), Math.floor((2 * n) / 3)] : []
  for (const i of wide) tiles[i].lg = 'wide'
  return tiles
}
