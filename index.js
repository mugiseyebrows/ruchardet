function values(obj) {
    var res = []
    for(let key in obj) {
        res.push(obj[key])
    }
    return res
}

function keys_of(obj, v) {
    var res = []
    for(let key in obj) {
        if (obj[key] === v) {
            res.push(key)
        }
    }
    return res
}

function detect(buffer) {
    // ['то', 'ст', 'ро', 'ко', 'но', 'по', 'ка', 'на', 'ал', 'не']
    let signatures = {
        cp866: [[226, 174], [225, 226], [224, 174], [170, 174], [173, 174], [175, 174], [170, 160], [173, 160], [160, 171], [173, 165]].map(e => new Uint8Array(e)),
        cp1251: [[242, 238], [241, 242], [240, 238], [234, 238], [237, 238], [239, 238], [234, 224], [237, 224], [224, 235], [237, 229]].map(e => new Uint8Array(e)),
        utf8: [[209, 130, 208, 190], [209, 129, 209, 130], [209, 128, 208, 190], [208, 186, 208, 190], [208, 189, 208, 190], [208, 191, 208, 190], [208, 186, 208, 176], [208, 189,
    208, 176], [208, 176, 208, 187], [208, 189, 208, 181]].map(e => new Uint8Array(e)),
    }
    let stat = {
        cp866: 0,
        cp1251: 0,
        utf8: 0
    }
    for(let enc in stat) {
        for(let sign of signatures[enc]) {
            if (buffer.indexOf(sign) > -1) {
                stat[enc] += 1
            }
        }
    }
    var max = Math.max(...values(stat))
    var encs = keys_of(stat, max)
    if (encs.length > 1 && encs.indexOf('utf8') > -1) {
        return 'utf8'
    }
    return encs[0]
}

module.exports = {
    detect
}