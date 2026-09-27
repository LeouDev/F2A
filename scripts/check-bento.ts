// Self-check for src/lib/bento.ts: simulates CSS grid `row dense` placement and asserts
// every row is completely filled, on both the 2-column and 3-column layouts.
// Run: node --experimental-strip-types scripts/check-bento.ts
import assert from 'node:assert/strict'
import { bentoTiles, type Tile } from '../src/lib/bento.ts'

function place(sizes: [w: number, h: number][], cols: number) {
  const grid: boolean[][] = []
  const free = (r: number, c: number, w: number, h: number) => {
    if (c + w > cols) return false
    for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) if (grid[y]?.[x]) return false
    return true
  }
  for (const [w, h] of sizes) {
    // dense: search from the top-left for the first slot that fits
    for (let r = 0, placed = false; !placed; r++) {
      for (let c = 0; c < cols && !placed; c++) {
        if (!free(r, c, w, h)) continue
        for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) (grid[y] ??= Array(cols).fill(false))[x] = true
        placed = true
      }
    }
  }
  return grid.every((row) => row.every(Boolean))
}

const lgSize = (t: Tile): [number, number] =>
  t.lg === 'feature' ? [2, 2] : t.lg === 'wide' ? [2, 1] : t.lg === 'row' ? [3, 1] : [1, 1]

for (let n = 1; n <= 40; n++) {
  const tiles = bentoTiles(n)
  assert.ok(place(tiles.map((t) => [t.full ? 2 : 1, 1]), 2), `holes on 2 columns for n=${n}`)
  assert.ok(place(tiles.map(lgSize), 3), `holes on 3 columns for n=${n}`)
}
console.log('bento: rows complete for 1–40 tiles on 2 and 3 columns')
