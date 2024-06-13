const PriorityQueue = require('../lib/pq');

test('should enqueue elements correctly', () => {
  const queue = new PriorityQueue();
  queue.enqueue('task1', 3);
  queue.enqueue('task2', 1);
  queue.enqueue('task3', 2);
  expect(queue.dequeue()).toBe('task2');
});

test('should dequeue elements in priority order', () => {
  const queue = new PriorityQueue();
  queue.enqueue('task1', 10);
  queue.enqueue('task2', 5);
  queue.enqueue('task3', 15);
  expect(queue.dequeue()).toBe('task2');
  expect(queue.dequeue()).toBe('task1');
});

test('should handle empty queue dequeue', () => {
  const queue = new PriorityQueue();
  expect(queue.dequeue()).toBeNull();
});

test('should check if queue is empty', () => {
  const queue = new PriorityQueue();
  expect(queue.isEmpty()).toBe(true);
  queue.enqueue('task', 1);
  expect(queue.isEmpty()).toBe(false);
});