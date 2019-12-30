import toTar from '../src'

type Items = Parameters<typeof toTar>[0]

const data: Items = [
  [
    {
      name: 'foo.txt',
      mode: 0o444,
    },
    Buffer.from('foo', 'utf8')
  ],
  [
    {
      name: 'bar/qux.txt',
      mode: 0o644,
    },
    Buffer.from('random string', 'utf8')
  ],
]

export default data
