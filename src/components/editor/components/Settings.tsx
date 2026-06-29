import type { ReactNode } from 'react';
import {
  DEFAULT_COLOR_INPUT_VALUE,
  DEFAULT_TEXT,
  MIN_BORDER_WIDTH,
  MIN_ELEMENT_SIZE,
  MIN_FONT_SIZE,
  MIN_POSITION,
  MIN_Z_INDEX,
} from '@/components/editor/constants';
import type { EditorElement } from '@/components/editor/types';

type SettingsProps = {
  element: EditorElement | null;
  onChange: (element: EditorElement) => void;
  onDelete: () => void;
};

export function Settings({ element, onChange, onDelete }: SettingsProps) {
  if (!element) {
    return (
      <aside className="border-panel-border bg-panel text-text-muted h-screen w-48 overflow-y-auto border-l p-4 text-sm">
        Select an element
      </aside>
    );
  }

  function update(patch: Partial<EditorElement>) {
    if (!element) return;
    onChange({ ...element, ...patch });
  }

  return (
    <aside className="border-panel-border bg-panel h-screen w-48 space-y-5 overflow-y-auto border-l p-4">
      <Fieldset title="Position">
        <NumberField
          label="X"
          min={MIN_POSITION}
          onChange={(x) => update({ x })}
          value={element.x}
        />
        <NumberField
          label="Y"
          min={MIN_POSITION}
          onChange={(y) => update({ y })}
          value={element.y}
        />
        <NumberField
          label="Z"
          min={MIN_Z_INDEX}
          onChange={(z) => update({ z })}
          value={element.z}
        />
        <NumberField
          label="W"
          min={MIN_ELEMENT_SIZE}
          onChange={(width) => update({ width })}
          value={element.width}
        />
        <NumberField
          label="H"
          min={MIN_ELEMENT_SIZE}
          onChange={(height) => update({ height })}
          value={element.height}
        />
      </Fieldset>

      <button
        className="bg-action-secondary text-action-secondary-text hover:brightness-action-secondary-hover w-full rounded-md px-3 py-2 text-sm font-medium"
        onClick={() =>
          update(
            element.text === undefined
              ? { text: DEFAULT_TEXT }
              : { text: undefined },
          )
        }
        type="button"
      >
        {element.text === undefined ? 'Add Text' : 'Remove Text'}
      </button>

      <Fieldset title="Background">
        <ColorField
          label="Color"
          onChange={(backgroundColor) => update({ backgroundColor })}
          value={element.backgroundColor}
        />
      </Fieldset>

      <Fieldset title="Border">
        <ColorField
          label="Color"
          onChange={(borderColor) => update({ borderColor })}
          value={element.borderColor}
        />
        <NumberField
          label="Width"
          min={MIN_BORDER_WIDTH}
          onChange={(borderWidth) => update({ borderWidth })}
          value={element.borderWidth}
        />
      </Fieldset>

      {element.text !== undefined && (
        <Fieldset title="Text">
          <ColorField
            label="Color"
            onChange={(textColor) => update({ textColor })}
            value={element.textColor}
          />
          <NumberField
            label="Size"
            min={MIN_FONT_SIZE}
            onChange={(fontSize) => update({ fontSize })}
            value={element.fontSize}
          />
          <TextField
            label="Content"
            onChange={(text) => update({ text })}
            value={element.text}
          />
        </Fieldset>
      )}

      <button
        className="border-danger text-danger hover:bg-danger-soft rounded-md border px-3 py-2 text-sm font-medium"
        onClick={onDelete}
        type="button"
      >
        Delete Element
      </button>
    </aside>
  );
}

type FieldsetProps = {
  children: ReactNode;
  title: string;
};

function Fieldset({ children, title }: FieldsetProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-text-main text-sm font-medium">{title}</legend>
      {children}
    </fieldset>
  );
}

type NumberFieldProps = {
  label: string;
  min: number;
  onChange: (value: number) => void;
  value: number;
};

function NumberField({ label, min, onChange, value }: NumberFieldProps) {
  return (
    <label className="text-text-muted flex items-center justify-between gap-3 text-sm">
      {label}
      <input
        className="border-control-border text-text-main focus:border-control-focus w-20 rounded-md border px-2 py-1 focus:outline-none"
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        type="number"
        value={value}
      />
    </label>
  );
}

type ColorFieldProps = {
  label: string;
  onChange: (value: string | null) => void;
  value: string | null;
};

function ColorField({ label, onChange, value }: ColorFieldProps) {
  return (
    <div className="text-text-muted flex items-center justify-between gap-2 text-sm">
      <label>{label}</label>
      <div className="flex items-center gap-2">
        <input
          className="border-control-border h-8 w-10 rounded-md border bg-transparent p-1"
          onChange={(event) => onChange(event.target.value)}
          type="color"
          value={value ?? DEFAULT_COLOR_INPUT_VALUE}
        />
        <button
          className="border-control-border text-text-muted hover:bg-action-secondary rounded-md border px-2 py-1 text-xs"
          onClick={() => onChange(null)}
          type="button"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

type TextFieldProps = {
  label: string;
  onChange: (value: string) => void;
  value: string;
};

function TextField({ label, onChange, value }: TextFieldProps) {
  return (
    <label className="text-text-muted block space-y-1 text-sm">
      <span>{label}</span>
      <textarea
        className="border-control-border text-text-main focus:border-control-focus min-h-20 w-full resize-y rounded-md border px-2 py-1 focus:outline-none"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}
