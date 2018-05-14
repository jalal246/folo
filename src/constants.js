export const INPUT = 'input';
export const TEXT = 'text';
export const EMAIL = 'email';
export const PASS = 'password';

export const SELECT = 'select';
export const LIST = 'list';

export const DATE = 'date';
export const CHECKBOX = 'checkbox';
export const RADIO = 'radio';
export const COLOR = 'color';
export const BTN = 'button';

export const SUBMIT_BUTTON_NAME = 'submit';

// design mode
export const DESIGN_MODE_TEXT = 'design mode';
export const FORM_TEXT = 'form';
export const UPDATE_FORM_TEXT = 'update form';
export const SUBMIT_TEXT = 'submit';

const str = hex => String.fromCharCode(hex);

export const DIRECTIONS = [
  { id: 'up', symbol: str('8593') },
  { id: 'down', symbol: str('8595') },
  { id: 'right', symbol: str('8594') },
  { id: 'left', symbol: str('8592') },
  { id: 'delete', symbol: 'X' }
];
