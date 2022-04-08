const focusableElements = [
  "a[href]",
  "area[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "iframe",
  "object",
  "embed",
  "[contenteditable]",
  "[tabindex]:not([tabindex^='-']):not([contenteditable])",
  "audio[controls]",
  "video[controls]",
  "[autofocus]:not([disabled])",
  "[type='radio']:not([disabled])",
  "[type='checkbox']:not([disabled])",
  "[contenteditable]:not([contenteditable='false'])",
].join(",");

export default focusableElements;
