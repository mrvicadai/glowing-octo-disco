/**
 * simple priority queue using min heap, lower number = higher priority
 */
module.exports = class PriorityQueue {
    constructor() {
      this.values = [];
    }
  
    enqueue(value, priority) {
      this.values.push({ value, priority });
      this.bubbleUp();
    }
  
    dequeue() {
      if (this.isEmpty()) return null;
      const root = this.values[0];
      this.values[0] = this.values.pop();
      this.sinkDown();
      return root.value;
    }
  
    isEmpty() {
      return this.values.length === 0;
    }
  
    bubbleUp() {
      let currentIndex = this.values.length - 1;
      while (currentIndex > 0) {
        const parentIndex = Math.floor((currentIndex - 1) / 2);
        if (this.values[currentIndex].priority < this.values[parentIndex].priority) {
          [this.values[currentIndex], this.values[parentIndex]] = [
            this.values[parentIndex],
            this.values[currentIndex],
          ];
          currentIndex = parentIndex;
        } else break;
      }
    }
  
    sinkDown() {
      let currentIndex = 0;
      const length = this.values.length;
      while (true) {
        const leftChildIndex = 2 * currentIndex + 1;
        const rightChildIndex = leftChildIndex + 1;
        let swapIndex = null;
  
        if (leftChildIndex < length) {
          swapIndex = leftChildIndex;
          if (
            rightChildIndex < length &&
            this.values[leftChildIndex].priority >
              this.values[rightChildIndex].priority
          ) {
            swapIndex = rightChildIndex;
          }
        }
  
        if (swapIndex !== null && this.values[currentIndex].priority > this.values[swapIndex].priority) {
          [this.values[currentIndex], this.values[swapIndex]] = [
            this.values[swapIndex],
            this.values[currentIndex],
          ];
          currentIndex = swapIndex;
        } else break;
      }
    }
  }