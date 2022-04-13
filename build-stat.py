from collections import defaultdict
import argparse

ENCODINGS = ['cp866', 'cp1251', 'utf8']

def build_stat(path, encoding):
    stat = defaultdict(lambda: 0)
    with open(path, encoding=encoding) as f:
        for line in f:
            for c1, c2 in zip(line, line[1:]):
                key = c1 + c2
                #stat.setdefault(key, 0)
                if len(set(['<','>','/',' ']).intersection([c1, c2])) > 0:
                    continue
                stat[key] += 1
    return stat

def get_top_freq(stat, n):
    top_freq = sorted(list(stat.values()), reverse=True)[:n]
    #print(top_freq)
    return [k for k,v in stat.items() if v in top_freq]

def signature(samples, enc):
    s = str([list(v.encode(enc)) for v in samples])
    return "{}.map(e => new Uint8Array(e))".format(s)

def main():
    parser = argparse.ArgumentParser(description='counts occurances of two-symbol sequences in text file')
    parser.add_argument('path', help='input file path')
    parser.add_argument('-o', '--output', help='ouput file path')
    parser.add_argument('-n', type=int, default=10)
    parser.add_argument('-e', '--encoding', default='utf-8', help='encoding of text file')
    args = parser.parse_args()
    stat = build_stat(args.path, args.encoding)
    top = get_top_freq(stat, args.n)

    lines = []
    lines.append("// " + str(top))
    lines.append("let signatures = {")
    for enc in ENCODINGS:
        lines.append("    " + enc + ": " + signature(top, enc) + ",")
    lines.append("}")
    
    if args.output is None:
        print("\n".join(lines) + "\n")
    else:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write("\n".join(lines) + "\n")

if __name__ == "__main__":
    main()
