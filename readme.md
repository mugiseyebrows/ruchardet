# ruchardet

Module detects encoding (`cp866`, `cp1251` or `utf8`) of text.

# Installation

```bash
npm i ruchardet
```

# Usage

```javascript
const ruchardet = require('ruchardet')
const buffer = Buffer.from('тест')
const encoding = ruchardet.detect(buffer)
console.log(encoding) // prints utf8
```
