# @calipsa/tar

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

A tool to convert buffers or strings to a TAR stream

## Installation
```bash
# using npm:
npm install --save @calipsa/tar

# or if you like yarn:
yarn add @calipsa/tar
```

## Usage
```javascript
const toTar = require('@calipsa/tar')

const data = [
  [
    {
      name: 'foo.txt',
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

const tar = toTar(data) // stream.Readable
```

[npm-url]: https://npmjs.org/package/@calipsa/tar
[downloads-image]: http://img.shields.io/npm/dm/@calipsa/tar.svg
[npm-image]: http://img.shields.io/npm/v/@calipsa/tar.svg
[david-dm-url]:https://david-dm.org/inker/@calipsa/tar
[david-dm-image]:https://david-dm.org/inker/@calipsa/tar.svg
[david-dm-dev-url]:https://david-dm.org/inker/@calipsa/tar#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/inker/@calipsa/tar/dev-status.svg
