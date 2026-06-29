import type { PointerEvent } from 'react';
import type { EditorElement } from '@/components/editor/types';

type ElementProps = {
  element: EditorElement;
  isFocused: boolean;
  onFocus: (id: string) => void;
  onMove: (event: PointerEvent<HTMLDivElement>) => void;
  onStart: (
    event: PointerEvent<HTMLDivElement>,
    element: EditorElement,
    kind: 'drag' | 'resize',
  ) => void;
  onStop: (event: PointerEvent<HTMLDivElement>) => void;
};

export function Element({
  element,
  isFocused,
  onFocus,
  onMove,
  onStart,
  onStop,
}: ElementProps) {
  return (
    <div
      data-editor-element
      onFocus={() => onFocus(element.id)}
      onPointerDown={(event) => onStart(event, element, 'drag')}
      onPointerMove={onMove}
      onPointerUp={onStop}
      role="button"
      style={{
        backgroundColor: element.backgroundColor ?? 'transparent',
        borderColor: element.borderColor ?? 'transparent',
        borderWidth: element.borderWidth,
        color: element.textColor,
        fontSize: element.fontSize,
        height: element.height,
        transform: `translate(${element.x}px, ${element.y}px)`,
        width: element.width,
        zIndex: element.z,
      }}
      tabIndex={0}
      className={`absolute touch-none border border-solid p-2 select-none ${
        isFocused ? 'outline-accent outline outline-2 outline-offset-1' : ''
      }`}
    >
      {element.text !== undefined && (
        <div className="h-full w-full break-words whitespace-pre-wrap">
          {element.text}
        </div>
      )}
      {isFocused && (
        <div
          aria-label="Resize element"
          className="border-accent bg-panel absolute -right-1.5 -bottom-1.5 h-4 w-4 cursor-nwse-resize rounded-sm border"
          onPointerDown={(event) => onStart(event, element, 'resize')}
          onPointerMove={onMove}
          onPointerUp={onStop}
          role="button"
          tabIndex={-1}
        />
      )}
    </div>
  );
}
