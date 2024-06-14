module.exports = class CachedLogSource {
  constructor(logSource) {
    this.logSource = logSource;
    this.pending = null;
    this.waiter = null;
    this.cache = [logSource.last];
    this.scheduleNext();
  }

  peek() {
    return this.cache[0];
  }

  popAsync() {
    return new Promise((resolve, reject) => {
      if (this.cache.length > 1) {
        this.cache.shift();
        resolve(this.peek());
      } else if (this.pending != null) {
        this.waiter = { resolve, reject };
      }
    });
  }

  scheduleNext() {
    if (this.pending !== null) return;
    if (this.logSource.drained) return;

    this.pending = this.logSource
      .popAsync()
      .then((log) => {
        this.pending = null;
        this.cache.push(log);

        if (this.waiter) {
          let resolve = this.waiter.resolve;
          this.waiter = null;
          resolve();
        }

        this.scheduleNext();
      })
      .catch((e) => {
        if (this.waiter) {
          this.waiter.reject(e);
        }
      });
  }
};
