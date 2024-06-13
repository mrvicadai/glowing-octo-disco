"use strict";

const PriorityQueue = require("../lib/pq");

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  const store = new PriorityQueue();

  for (let i = 0, logSource; i < logSources.length; i++) {
    logSource = logSources[i];
    // Use the date as the key for priority comparison
    store.enqueue(logSource, logSource.last.date);
  }

  let currentLogSource, nextLogOrDrained;
  while (!store.isEmpty()) {
    currentLogSource = store.dequeue();
    printer.print(currentLogSource.last);
    nextLogOrDrained = currentLogSource.pop();
    if (nextLogOrDrained === false) {
      continue;
    }
    store.enqueue(currentLogSource, nextLogOrDrained.date);
  }

  printer.done();
};
