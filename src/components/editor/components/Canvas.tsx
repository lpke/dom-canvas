import { Element } from '@/components/editor/components/Element';
import type { EditorElement } from '@/components/editor/types';
import { useCanvasInteraction } from '@/hooks/useCanvasInteraction';

type CanvasProps = {
  elements: EditorElement[];
  focusedElementId: string | null;
  onChange: (element: EditorElement) => void;
  onFocus: (id: string) => void;
};

export function Canvas({
  elements,
  focusedElementId,
  onChange,
  onFocus,
}: CanvasProps) {
  const { commitInteraction, moveInteraction, startInteraction } =
    useCanvasInteraction({ onChange, onFocus });

  return (
    <section className="flex flex-1 items-center justify-center p-6">
      <div
        aria-label="Canvas"
        className="border-canvas-border shadow-canvas bg-canvas relative h-full max-h-[720px] min-h-[420px] w-full max-w-4xl overflow-hidden rounded-md border"
        role="region"
      >
        {elements.map((element) => (
          <Element
            element={element}
            isFocused={focusedElementId === element.id}
            key={element.id}
            onFocus={onFocus}
            onMove={moveInteraction}
            onStart={startInteraction}
            onStop={commitInteraction}
          />
        ))}
      </div>
    </section>
  );
}
