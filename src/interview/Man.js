/*
实例链式调用：如let a = new Man(); a.sleep(3000).sayHi().sleep(1000).sleep(2000).sayHi()；
实现 Man 类
 */

class Man {
    taskQueue = [];
    isBlocking = false;

    run = () => {
        if (this.isBlocking || !this.taskQueue.length)
            return;
        this.isBlocking = true;
        const task = this.taskQueue.shift();
        if (task.type === "sync") {
            task.fn();
            this.isBlocking = false;
            this.run();
            return;
        }
        console.time("sleep time");
        setTimeout(() => {
            this.isBlocking = false;
            console.timeEnd("sleep time");
            this.run();
        }, task.time);
    }

    sleep = (time) => {
        this.taskQueue.push({ type: "async", time });
        this.run();
        return this;
    }

    sayHi = () => {
        this.taskQueue.push({ type: "sync", fn: () => console.log("Hi!") });
        this.run();
        return this;
    }
}

let a = new Man();
// a.sleep(3000).sayHi().sleep(1000).sleep(2000).sayHi();
// a.sayHi().sayHi().sayHi().sleep(1000).sayHi();
a.sleep(1000).sleep(2000).sleep(3000).sayHi().sleep(500);
