import { useState } from 'react';
import type { EditorElement } from '@/components/editor/types';

const boxDefaults = {
  width: 132,
  height: 72,
  backgroundColor: '#0cc1c9',
  borderColor: null,
  borderWidth: 1,
  textColor: '#0f172a',
  fontSize: 16,
};

const textDefaults = {
  width: 160,
  height: 48,
  backgroundColor: null,
  borderColor: null,
  borderWidth: 1,
  textColor: '#0f172a',
  fontSize: 18,
  text: 'Text',
};

const canvasWidth = 896;
const canvasHeight = 420;
const placementGap = 24;
const placementMargin = 48;

export function useElements() {
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null);
  const [prevZ, setPrevZ] = useState(0);

  const focusedElement =
    elements.find((element) => element.id === focusedElementId) ?? null;

  function addBox() {
    addElement(boxDefaults);
  }

  function addText() {
    addElement(textDefaults);
  }

  function addElement(defaults: typeof boxDefaults | typeof textDefaults) {
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
  defaults: typeof boxDefaults | typeof textDefaults,
) {
  const rowStep = defaults.height + placementGap;
  const columnStep = defaults.width + placementGap;
  const rows = Math.max(
    1,
    Math.floor(
      (canvasHeight - placementMargin * 2 - defaults.height) / rowStep,
    ) + 1,
  );
  const columns = Math.max(
    1,
    Math.floor(
      (canvasWidth - placementMargin * 2 - defaults.width) / columnStep,
    ) + 1,
  );
  const column = Math.floor(index / rows) % columns;
  const row = index % rows;

  return {
    x: placementMargin + column * columnStep,
    y: placementMargin + row * rowStep,
  };
}
