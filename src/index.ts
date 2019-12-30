import { Readable } from 'stream'

import tar, { Headers } from 'tar-stream'

type Item = [
  Headers,
  Buffer | string,
]

export = (items: readonly Item[]) => {
  const pack = tar.pack()

  for (const [headers, buffers] of items) {
    pack.entry(headers, buffers)
  }

  pack.on('error', err => {
    throw err
  })

  pack.finalize()

  return pack as Readable
}
