"use strict";

const PriorityQueue = require("../lib/pq");

// Print all entries, across all of the *async* sources, in chronological order.
module.exports = (logSources, printer) => {
  const store = new PriorityQueue();

  for (let i = 0, logSource; i < logSources.length; i++) {
    logSource = logSources[i];
    // Use the date as the key for priority comparison
    store.enqueue(logSource, logSource.last.date);
  }

  function next() {
    return new Promise((resolve, reject) => {
      if (store.isEmpty()) {
        resolve(console.log("Async sort complete."));
        return;
      }

      const logSource = store.dequeue();
      printer.print(logSource.last);

      logSource
        .popAsync()
        .then((logOrDrained) => {
          if (logOrDrained !== false) {
            store.enqueue(logSource, logOrDrained.date);
          }
          return next().then(() => resolve());
        })
        .catch(reject);
    });
  }

  return next();
};
