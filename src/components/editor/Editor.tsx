import { Canvas } from '@/components/editor/components/Canvas';
import { Settings } from '@/components/editor/components/Settings';
import { Tools } from '@/components/editor/components/Tools';
import { useElements } from '@/hooks/useElements';

export function Editor() {
  const {
    addBox,
    addText,
    deleteElement,
    elements,
    focusedElement,
    focusedElementId,
    setFocusedElementId,
    updateElement,
  } = useElements();

  return (
    <main
      aria-label="Editor"
      className="bg-page text-text-main flex min-h-screen"
    >
      <Tools onAddBox={addBox} onAddText={addText} />
      <Canvas
        elements={elements}
        focusedElementId={focusedElementId}
        onChange={updateElement}
        onFocus={setFocusedElementId}
      />
      <Settings
        element={focusedElement}
        onChange={updateElement}
        onDelete={deleteElement}
      />
    </main>
  );
}
