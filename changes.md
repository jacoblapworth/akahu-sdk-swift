# XUI 12.1.0

## React changes

### Positioning

- Fixed bug where positioned element aligns with left side of screen for mobile with `forceDesktop` enabled

### DropDown & DropDownPanel

- `bodyClassName` prop added which will apply a class to the body element of the dropdown

### DropDownHeader

- `leftContent` prop added. Value will be inserted between the back button and the title
- `rightContent` prop added. Value will be inserted on the right, to the left of the primary & secondary buttons.

### XUIAutocompleterEmptyState

- Fixes styling for empty state

## CSS Changes

- Overview section styling fixed for IE11
- XUITag now has a white background instead of transparent so they don't change colour inside a highlighted block

## Additions

### XUICapsule

New component with CSS and a matching React component. They are used to draw attention to placeholders that will be replaced with data.
