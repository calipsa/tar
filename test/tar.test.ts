import { streamToBuffer } from '@calipsa/stream-utils'

import toTar from '../src'
import data from './data'
import untar from './untar'

describe('tar', () => {
  it('should convert to tar & back', async () => {
    const tar = toTar(data)

    const outRaw = await untar(tar)
    const outPromises = outRaw.map(([h, s]) => Promise.all([h, streamToBuffer(s)]))
    const out = await Promise.all(outPromises)
    for (let i = 0; i < data.length; ++i) {
      const d = data[i]
      const o = out[i]
      expect(d[0].name).toBe(o[0].name)
      expect(d[0].mode).toBe(o[0].mode)
      expect(d[1]).toEqual(o[1])
    }
  })

  it('should deal with empty list', async () => {
    const tar = toTar([])
    const out = await untar(tar)
    expect(out.length).toBe(0)
  })

  it('should make a correct empty tar', async () => {
    const tar = toTar([])
    const buf = await streamToBuffer(tar)
    expect(buf.length).toBe(1024)
    expect(buf.every(i => i === 0)).toBe(true)
  })
})
