import type { EditorElement } from '@/components/editor/types';

type ElementDefaults = Omit<EditorElement, 'id' | 'x' | 'y' | 'z'>;

export const BOX_DEFAULTS = {
  width: 132,
  height: 72,
  backgroundColor: '#0cc1c9',
  borderColor: null,
  borderWidth: 1,
  textColor: '#0f172a',
  fontSize: 16,
} satisfies ElementDefaults;

export const TEXT_DEFAULTS = {
  width: 160,
  height: 48,
  backgroundColor: null,
  borderColor: null,
  borderWidth: 1,
  textColor: '#0f172a',
  fontSize: 18,
  text: 'Text',
} satisfies ElementDefaults;

export const CANVAS_WIDTH = 896;
export const CANVAS_HEIGHT = 420;
export const INITIAL_PLACEMENT_GAP = 24;
export const INITIAL_PLACEMENT_MARGIN = 48;
export const INITIAL_Z_INDEX = 0;
export const MIN_POSITION = 0;
export const MIN_Z_INDEX = 0;
export const MIN_ELEMENT_SIZE = 32;
export const MIN_BORDER_WIDTH = 0;
export const MIN_FONT_SIZE = 8;
export const DEFAULT_COLOR_INPUT_VALUE = '#ffffff';
export const DEFAULT_TEXT = TEXT_DEFAULTS.text;
