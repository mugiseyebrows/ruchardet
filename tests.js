const ruchardet = require('ruchardet')
const iconv = require('iconv-lite')
const text = 'тест'
const encs = ['cp866', 'cp1251', 'utf8']
let ok = true
for(let expected of encs) {
    let actual = ruchardet.detect(iconv.encode(text, expected))
    if (expected !== actual) {
        console.log(`expected ${expected} actual ${actual}`)
        ok = false
    }
}
console.log(ok ? 'test passed' : 'test failed')