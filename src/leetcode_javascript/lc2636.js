/**
 * @param {Function[]} functions
 * @param {number} k
 * @return {Function}
 */
const promisePool = async function(functions, k) {
    let finished = 0, i = 0, limit = k;
    return new Promise((resolve) => {
        const run = () => {
            if (finished == functions.length) return resolve();
            while (i < functions && limit) {
                limit--;
                functions[i++]().then(res => {
                    limit++;
                    finished++;
                    run();
                });
            }
        };
        run();
    });
};

/**
 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *   .then(console.log) // After 900ms
 */