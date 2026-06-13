import { useRef, useState } from "react";

export function useDragPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragState = useRef(null);
  const movedRef = useRef(false);

  const onPointerDown = (event) => {
    if (event.button !== 0 || window.innerWidth < 760) return;
    if (event.target.closest("a, button")) return;

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    };
    movedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const x = drag.originX + event.clientX - drag.startX;
    const y = drag.originY + event.clientY - drag.startY;
    movedRef.current =
      Math.abs(event.clientX - drag.startX) > 4 ||
      Math.abs(event.clientY - drag.startY) > 4;
    setPosition({ x, y });
  };

  const onPointerUp = (event) => {
    if (!dragState.current) return;
    dragState.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  return {
    position,
    movedRef,
    dragProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
