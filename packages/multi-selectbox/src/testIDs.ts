/** Stable test IDs for RNTL / E2E. Prefer these over copy-only queries. */
export const TEST_IDS = {
  root: 'selectbox-root',
  label: 'selectbox-label',
  singleTrigger: 'selectbox-single-trigger',
  dropdownToggle: 'selectbox-dropdown-toggle',
  filterInput: 'selectbox-filter-input',
  filterClear: 'selectbox-filter-clear',
  filterSearchIcon: 'selectbox-filter-search-icon',
  optionsList: 'selectbox-options-list',
  option: (id: string | number) => `selectbox-option-${id}`,
  multiChip: (id: string | number) => `selectbox-chip-${id}`,
  multiEmpty: 'selectbox-multi-empty',
  listEmpty: 'selectbox-list-empty',
  optionsOverlay: 'selectbox-options-overlay',
  optionsOverlayRoot: 'selectbox-options-overlay-root',
  optionsOverlayBackdrop: 'selectbox-options-overlay-backdrop',
  optionsOverlayPanel: 'selectbox-options-overlay-panel',
} as const
