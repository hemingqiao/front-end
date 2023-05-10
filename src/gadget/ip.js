// 有关 ip 的几道题目

/*
[复原 ip 地址](https://leetcode.cn/problems/restore-ip-addresses/)

input: s = "25525511135"
output: ["255.255.11.135","255.255.111.35"]
 */

/**
 * @param {string} s
 * @return {string[]}
 */
const restoreIpAddresses = function(s) {
    const dfs = (u, k, path) => {
        if (u >= s.length) {
            if (k == 0) res.push(path.join("."));
            return;
        }
        if (k <= 0) return;

        for (let i = 1; i <= 3; i++) {
            if (u + i > s.length) break;
            let t = s.substring(u, u + i);
            if (t.length > 1 && t[0] == '0' || +t > 255) break;
            path.push(t);
            dfs(u + i, k - 1, path);
            path.pop();
        }
    };
    const res = [];
    dfs(0, 4, []);
    return res;
};

/*
[468. 验证IP地址](https://leetcode.cn/problems/validate-ip-address/)

input: "172.16.254.1"
output: "IPv4"

input: "2001:0db8:85a3:0:0:8A2E:0370:7334"
output: "IPv6"
 */

const checkIPv6 = (s) => {
    return /^[\da-fA-F]{1,4}$/.test(s);
};
const checkIPv4 = (s) => {
    // 不能有前导 0
    if (s.length > 1 && s[0] == '0') return false;
    return /^\d+$/.test(s) && Number(s) >= 0 && Number(s) <= 255;
};

/**
 * @param {string} queryIP
 * @return {string}
 */
const validIPAddress = function(queryIP) {
    const strs = queryIP.includes(":")
        ? queryIP.split(":")
        : queryIP.split(".");
    if (strs.length == 4) {
        if (strs.every(checkIPv4)) return "IPv4";
        return "Neither";
    }
    if (strs.length == 8 && strs.every(checkIPv6)) return "IPv6";
    return "Neither";
};
