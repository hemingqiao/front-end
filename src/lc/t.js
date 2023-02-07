class DNode {
    prev;
    next;
    constructor(key, val) {
        this.key = key;
        this.val = val;
    }
}

class Block {
    prev;
    next;
    constructor(frequency) {
        this.frequency = frequency;
        this.head = new DNode(-1, -1);
        this.tail = new DNode(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * @param {DNode} node
     */
    insert(node) {
        node.next = this.head.next;
        node.next.prev = node;
        this.head.next = node;
        node.prev = this.head;
    }

    /**
     * @param {DNode} node
     */
    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    isEmpty() {
        return this.head.next == this.tail;
    }
}

class LFUCache {
    blocks = new Map();
    nodes = new Map();
    head = new Block(0);
    tail = new Block(Infinity);

    constructor(capacity) {
        this.capacity = capacity;
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * @param {Block} block
     */
    insertAtRight(block) {
        const cur = new Block(block.frequency + 1);
        cur.next = block.next;
        block.next.prev = cur;
        block.next = cur;
        cur.prev = block;
    }

    /**
     * @param {Block} block
     */
    remove(block) {
        block.next.prev = block.prev;
        block.prev.next = block.next;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.nodes.has(key)) return -1;

        const block = this.blocks.get(key);
        const node = this.nodes.get(key);

        block.remove(node);
        if (block.next.frequency != block.frequency + 1)
            this.insertAtRight(block);
        block.next.insert(node);
        this.blocks.set(key, block.next);

        if (block.isEmpty())
            this.remove(block);
        return node.val;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.capacity == 0) return;

        if (this.nodes.has(key)) {
            const node = this.nodes.get(key);
            node.val = value;
            this.get(key);
        } else {
            if (this.nodes.size == this.capacity) {
                const nodeToBeRemoved = this.head.next.tail.prev;
                this.head.next.remove(nodeToBeRemoved);
                if (this.head.next.isEmpty())
                    this.remove(this.head.next);

                this.blocks.delete(nodeToBeRemoved.key);
                this.nodes.delete(nodeToBeRemoved.key);
            }

            const node = new DNode(key, value);
            if (this.head.next.frequency > 1)
                this.insertAtRight(this.head);

            this.head.next.insert(node);
            this.blocks.set(key, this.head.next);
            this.nodes.set(key, node);
        }
    }
}

const lfu = new LFUCache(16);
console.log(lfu);