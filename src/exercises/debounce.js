function debounce(callback, delay) {
    let timeout;

    return function (...args) {
        const ctx = this;

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            callback.apply(ctx, args);
        }, delay);
    };
}