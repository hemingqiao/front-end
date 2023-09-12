const isDigit = c => c >= '0' && c <= '9';

/**
 * @param {string} s
 * @return {*}
 */
const jsonParse = function(s) {
    let i = 0;
    const parseString = () => {
        if (s[i] == '"') {
            i++;
            let res = "";
            while (i < s.length && s[i] != '"')
                res += s[i++];
            i++;
            return res;
        }
    };
    const parseNumber = () => {
        let start = i;
        if (isDigit(s[i]) || (i + 1 < s.length && s[i] == '-' && isDigit(s[i + 1]))) {
            if (s[i] == '-') i++;
            while (i < s.length && (isDigit(s[i]) || s[i] == '.')) i++;
        }
        if (i > start) {
            return +s.substring(start, i);
        }
    };
    const parsePrimitive = (name, value) => {
        if (s.slice(i, i + name.length) == name) {
            i += name.length;
            return value;
        }
    };
    const parseObj = () => {
        if (s[i] == '{') {
            i++;
            const res = {};
            let isStart = true; // 是否位于开头，如果不在开头需要跳过 ','
            while (i < s.length && s[i] != '}') {
                if (!isStart) i++;
                const key = parseString();
                i++; // 跳过 ':'
                const val = parse();
                res[key] = val;
                isStart = false;
            }
            i++;
            return res;
        }
    };
    const parseArray = () => {
        if (s[i] == '[') {
            i++;
            const res = [];
            let isStart = true;
            while (i < s.length && s[i] != ']') {
                if (!isStart) i++;
                const val = parse();
                res.push(val);
                isStart = false;
            }
            i++;
            return res;
        }
    };
    const parse = () => {
        return parseObj() ??
            parseArray() ??
            parseString() ??
            parseNumber() ??
            parsePrimitive("true", true) ??
            parsePrimitive("false", false) ??
            parsePrimitive("null", null);
    };
    return parse();
};
