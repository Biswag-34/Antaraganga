export function swipeDirection(start, end, threshold = 50) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.25 ? (dx < 0 ? 1 : -1) : 0;
}
