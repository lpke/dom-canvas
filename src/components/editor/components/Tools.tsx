type ToolsProps = {
  onAddBox: () => void;
  onAddText: () => void;
};

export function Tools({ onAddBox, onAddText }: ToolsProps) {
  return (
    <aside className="border-panel-border bg-panel w-48 border-r p-4">
      <div className="space-y-3">
        <button
          className="bg-action-primary text-action-primary-text hover:brightness-action-primary-hover w-full rounded-md px-3 py-2 text-sm font-medium"
          onClick={onAddBox}
          type="button"
        >
          Add Box
        </button>
        <button
          className="bg-action-secondary text-action-secondary-text hover:brightness-action-secondary-hover w-full rounded-md px-3 py-2 text-sm font-medium"
          onClick={onAddText}
          type="button"
        >
          Add Text
        </button>
      </div>
    </aside>
  );
}
