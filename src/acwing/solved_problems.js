// 统计 AcWing 上个人通过的所有题目

const pagination = [...document.querySelectorAll('a[name="page_turning"]')];
const match = pagination[pagination.length - 1].getAttribute("id").match(/\d+/);
let totPages = 10;
if (match) {
    totPages = +match[0];
}

const requestUrl = "https://www.acwing.com/problem/";

const getAllSolvedProblem = async () => {
    const allSolvedProblems = [];
    for (let i = 1; i <= totPages; i++) {
        const append = `${i}/`;
        let response = await fetch(`${requestUrl}${append}`);
        let text = await response.text();
        allSolvedProblems.push(...countSolvedProblemsOnePage(text));
    }
    return allSolvedProblems;
};

const countSolvedProblemsOnePage = (text = "") => {
    let start = "已通过这道题目", end = "<\/tr>";
    let idx = -1, endIdx = 0;
    let reg = /[^>]*?(?=<\/span>)|<a[\s\S]*?<\/a>/gm;
    let res = [];
    while ((idx = text.indexOf(start, endIdx)) !== -1) {
        endIdx = text.indexOf(end, idx);
        let info = text.substring(idx, endIdx);
        res.push(info.match(reg).filter(i => i));
    }
    return res;
};

async function run() {
    const all = await getAllSolvedProblem();
    console.log(all);
}

run();
