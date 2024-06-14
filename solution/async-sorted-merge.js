"use strict";

const PriorityQueue = require("../lib/pq");
const CachedLogSource = require("../lib/cached-log-source");

// Print all entries, across all of the *async* sources, in chronological order.
module.exports = (logSources, printer) => {
  const store = new PriorityQueue();

  for (let i = 0, logSource; i < logSources.length; i++) {
    logSource = new CachedLogSource(logSources[i]);
    // Use the date as the key for priority comparison
    store.enqueue(logSource, logSource.peek().date);
  }

  function next() {
    return new Promise((resolve, reject) => {
      if (store.isEmpty()) {
        resolve(console.log("Async sort complete."));
        printer.done();
        return;
      }

      const logSource = store.dequeue();
      printer.print(logSource.peek());

      logSource
        .popAsync()
        .then(() => {
          let logOrDrained = logSource.peek();
          if (logOrDrained !== false) {
            store.enqueue(logSource, logOrDrained.date);
          }
          return next();
        })
        .catch(reject);
    });
  }

  return next();
};
