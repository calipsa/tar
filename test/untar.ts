import {
  Readable,
  PassThrough,
} from 'stream'

import tarStream, { Headers } from 'tar-stream'

type Item = [Headers, PassThrough]

export default (tar: Readable) =>
  new Promise<Item[]>((resolve, reject) => {
    const extract = tarStream.extract()

    const result: Item[] = []

    extract.on('error', reject)

    extract.on('entry', (headers, stream, next) => {
      result.push([headers, stream])
      next()
    })

    extract.on('finish', () => {
      resolve(result)
    })

    tar.pipe(extract)
  })
