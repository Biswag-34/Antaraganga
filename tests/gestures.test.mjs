import assert from 'node:assert/strict';
import test from 'node:test';
import { swipeDirection } from '../lib/gestures.mjs';
test('left and right drags advance in opposite directions', () => {
  assert.equal(swipeDirection({ x: 200, y: 100 }, { x: 100, y: 105 }), 1);
  assert.equal(swipeDirection({ x: 100, y: 100 }, { x: 200, y: 105 }), -1);
});
test('taps and short movements do not change images', () => {
  assert.equal(swipeDirection({ x: 100, y: 100 }, { x: 100, y: 100 }), 0);
  assert.equal(swipeDirection({ x: 100, y: 100 }, { x: 149, y: 100 }), 0);
  assert.equal(swipeDirection({ x: 100, y: 100 }, { x: 150, y: 100 }), -1);
});
test('vertical scrolling and diagonal movements do not change images', () => {
  assert.equal(swipeDirection({ x: 100, y: 100 }, { x: 110, y: 250 }), 0);
  assert.equal(swipeDirection({ x: 100, y: 100 }, { x: 190, y: 200 }), 0);
});
