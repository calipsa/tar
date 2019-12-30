import tarStream, { Headers } from 'tar-stream'
import { streamToBuffer } from '@calipsa/stream-utils'

import toTar from '../src'
import data from './data'

describe('tar', () => {
  it('should convert to tar & back', (done) => {
    const tar = toTar(data)
    
    const extract = tarStream.extract()

    const filePromises: (readonly [Headers, Promise<Buffer>])[] = []
    extract.on('entry', (headers, stream, next) => {
      filePromises.push([headers, streamToBuffer(stream)] as const)
      next()
    })
    extract.on('finish', async () => {
      const files = await Promise.all(filePromises.map(i => Promise.all(i)))
      for (let i = 0; i < data.length; ++i) {
        const d = data[i]
        const f = files[i]
        expect(d[0].name).toBe(f[0].name)
        expect(d[0].mode).toBe(f[0].mode)
        expect(d[1]).toEqual(f[1])
        done()
      }
    })
    tar.pipe(extract)
  })
})
