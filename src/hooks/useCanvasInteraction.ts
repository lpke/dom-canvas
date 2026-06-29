import { useRef } from 'react';
import type { PointerEvent } from 'react';
import type { EditorElement } from '@/components/editor/types';

type InteractionKind = 'drag' | 'resize';

type Interaction = {
  element: EditorElement | null;
  kind: InteractionKind | null;
  pointerX: number;
  pointerY: number;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
};

type UseCanvasInteractionProps = {
  onChange: (element: EditorElement) => void;
  onFocus: (id: string) => void;
};

const minSize = 32;

export function useCanvasInteraction({
  onChange,
  onFocus,
}: UseCanvasInteractionProps) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const interaction = useRef<Interaction>({
    element: null,
    kind: null,
    pointerX: 0,
    pointerY: 0,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
  });

  function startInteraction(
    event: PointerEvent<HTMLDivElement>,
    element: EditorElement,
    kind: InteractionKind,
  ) {
    event.preventDefault();
    event.stopPropagation();
    onFocus(element.id);

    nodeRef.current = event.currentTarget.closest('[data-editor-element]');
    interaction.current = {
      element,
      kind,
      pointerX: event.clientX,
      pointerY: event.clientY,
      startX: element.x,
      startY: element.y,
      startWidth: element.width,
      startHeight: element.height,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveInteraction(event: PointerEvent<HTMLDivElement>) {
    const current = interaction.current;
    if (!current.kind || !current.element || !nodeRef.current) return;

    const diffX = event.clientX - current.pointerX;
    const diffY = event.clientY - current.pointerY;

    if (current.kind === 'drag') {
      nodeRef.current.style.transform = `translate(${current.startX + diffX}px, ${current.startY + diffY}px)`;
      return;
    }

    nodeRef.current.style.width = `${Math.max(minSize, current.startWidth + diffX)}px`;
    nodeRef.current.style.height = `${Math.max(minSize, current.startHeight + diffY)}px`;
  }

  function commitInteraction(event: PointerEvent<HTMLDivElement>) {
    const current = interaction.current;
    if (!current.kind || !current.element) return;

    const diffX = event.clientX - current.pointerX;
    const diffY = event.clientY - current.pointerY;
    const next =
      current.kind === 'drag'
        ? {
            ...current.element,
            x: Math.max(0, Math.round(current.startX + diffX)),
            y: Math.max(0, Math.round(current.startY + diffY)),
          }
        : {
            ...current.element,
            width: Math.round(Math.max(minSize, current.startWidth + diffX)),
            height: Math.round(Math.max(minSize, current.startHeight + diffY)),
          };

    interaction.current.kind = null;
    interaction.current.element = null;
    nodeRef.current = null;
    onChange(next);
  }

  return {
    commitInteraction,
    moveInteraction,
    startInteraction,
  };
}
