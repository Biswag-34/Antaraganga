'use client';
import { useRef, type MouseEvent, type PointerEvent, type DragEvent } from 'react';
import { swipeDirection } from '@/lib/gestures.mjs';

export function useSwipe(onSwipe: (direction: number) => void) {
  const start = useRef<{ id: number; x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  return {
    onPointerDown(event: PointerEvent<HTMLDivElement>) {
      if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
      const control = (event.target as HTMLElement).closest('a, button, input, select, textarea');
      if (control && !control.hasAttribute('data-swipe-item')) return;
      suppressClick.current = false;
      start.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    },
    onPointerMove(event: PointerEvent<HTMLDivElement>) {
      const point = start.current;
      if (!point || point.id !== event.pointerId) return;
      const dx = event.clientX - point.x;
      const dy = event.clientY - point.y;
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.25) {
        // Capture only after horizontal intent; vertical page scrolling stays native.
        if (!event.currentTarget.hasPointerCapture(event.pointerId))
          event.currentTarget.setPointerCapture(event.pointerId);
        if (event.cancelable) event.preventDefault();
      }
    },
    onPointerUp(event: PointerEvent<HTMLDivElement>) {
      const point = start.current;
      if (!point || point.id !== event.pointerId) return;
      start.current = null;
      const direction = swipeDirection(point, { x: event.clientX, y: event.clientY });
      if (direction) {
        suppressClick.current = true;
        onSwipe(direction);
      }
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.releasePointerCapture(event.pointerId);
    },
    onPointerCancel() {
      start.current = null;
      suppressClick.current = false;
    },
    onLostPointerCapture() {
      start.current = null;
    },
    onClickCapture(event: MouseEvent<HTMLDivElement>) {
      if (!suppressClick.current || event.detail === 0) return;
      suppressClick.current = false;
      event.preventDefault();
      event.stopPropagation();
    },
    onDragStart(event: DragEvent<HTMLDivElement>) {
      event.preventDefault();
    },
  };
}
