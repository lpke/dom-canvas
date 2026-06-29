import { useState } from 'react';
import {
  BOX_DEFAULTS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  INITIAL_PLACEMENT_GAP,
  INITIAL_PLACEMENT_MARGIN,
  INITIAL_Z_INDEX,
  TEXT_DEFAULTS,
} from '@/components/editor/constants';
import type { EditorElement } from '@/components/editor/types';

export function useElements() {
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null);
  const [prevZ, setPrevZ] = useState(INITIAL_Z_INDEX);

  const focusedElement =
    elements.find((element) => element.id === focusedElementId) ?? null;

  function addBox() {
    addElement(BOX_DEFAULTS);
  }

  function addText() {
    addElement(TEXT_DEFAULTS);
  }

  function addElement(defaults: typeof BOX_DEFAULTS | typeof TEXT_DEFAULTS) {
    const z = prevZ + 1;
    const position = getNextPosition(elements.length, defaults);
    const element = {
      ...defaults,
      id: crypto.randomUUID(),
      ...position,
      z,
    };

    setElements((current) => [...current, element]);
    setFocusedElementId(element.id);
    setPrevZ(z);
  }

  function updateElement(nextElement: EditorElement) {
    setElements((current) =>
      current.map((element) =>
        element.id === nextElement.id ? nextElement : element,
      ),
    );
    setPrevZ((current) => Math.max(current, nextElement.z));
  }

  function deleteElement() {
    setElements((current) =>
      current.filter((element) => element.id !== focusedElementId),
    );
    setFocusedElementId(null);
  }

  return {
    deleteElement,
    elements,
    focusedElement,
    focusedElementId,
    addBox,
    addText,
    setFocusedElementId,
    updateElement,
  };
}

function getNextPosition(
  index: number,
  defaults: typeof BOX_DEFAULTS | typeof TEXT_DEFAULTS,
) {
  const rowStep = defaults.height + INITIAL_PLACEMENT_GAP;
  const columnStep = defaults.width + INITIAL_PLACEMENT_GAP;
  const rows = Math.max(
    1,
    Math.floor(
      (CANVAS_HEIGHT - INITIAL_PLACEMENT_MARGIN * 2 - defaults.height) /
        rowStep,
    ) + 1,
  );
  const columns = Math.max(
    1,
    Math.floor(
      (CANVAS_WIDTH - INITIAL_PLACEMENT_MARGIN * 2 - defaults.width) /
        columnStep,
    ) + 1,
  );
  const column = Math.floor(index / rows) % columns;
  const row = index % rows;

  return {
    x: INITIAL_PLACEMENT_MARGIN + column * columnStep,
    y: INITIAL_PLACEMENT_MARGIN + row * rowStep,
  };
}
