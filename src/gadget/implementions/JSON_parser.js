/**
 * 将json字符串转为js中的对象
 * @param json
 * @return {any}
 */
function parseJson(json) {
    // update
    // 不考虑错误的输入，输入的json字符串中没有额外的空格、回车等

    let i = 0;
    return parseValue();

    function parseValue() {
        const value =
            parseString() ??
            parseNumber() ??
            parseObject() ??
            parseArray() ??
            parsePrimitive("true", true) ??
            parsePrimitive("false", false) ??
            parsePrimitive("null", null);
        return value;
    }

    /**
     * 解析字符串
     * @return {string}
     */
    function parseString() {
        if (json[i] === '"') {
            i++;
            let result = "";
            while (i < json.length && json[i] !== '"') {
                result += json[i];
                i++;
            }

            i++; // 跳过闭合的"号
            return result;
        }
    }

    /**
     * 解析数字
     * @return {number}
     */
    function parseNumber() {
        let start = i;
        if (json[i] >= "1" && json[i] <= "9") {
            i++;
            while (json[i] >= "0" && json[i] <= "9") {
                i++;
            }
        }
        if (i > start) {
            return Number(json.slice(start, i));
        }
    }

    /**
     * 解析其他基本类型（Boolean、Null）
     * @param name
     * @param value
     * @return {*}
     */
    function parsePrimitive(name, value) {
        if (json.slice(i, i + name.length) === name) {
            i += name.length;
            return value;
        }
    }

    /**
     * 解析对象
     * @return {{}}
     */
    function parseObject() {
        if (json[i] === "{") {
            i++;
            const ret = {};
            let initial = true;
            while (i < json.length && json[i] !== "}") {
                if (!initial) {
                    i++; // 不是开头的话，需要跳过逗号
                }
                const key = parseString();
                i++; // 跳过冒号
                const value = parseValue();
                ret[key] = value;
                initial = false;
            }
            i++; // 跳过闭合的大括号"}"
            return ret;
        }
    }

    /**
     * 解析数组，和上面的解析对象类似
     * @return {[]}
     */
    function parseArray() {
        if (json[i] === "[") {
            i++;
            const ret = [];
            let initial = true;
            while (i < json.length && json[i] !== "]") {
                if (!initial) {
                    i++;
                }
                const val = parseValue();
                ret.push(val);
                initial = false;
            }
            i++;
            return ret;
        }
    }
}
