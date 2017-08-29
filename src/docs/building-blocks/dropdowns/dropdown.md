<p class="xui-heading xui-text-deemphasis xui-text-color-muted">
XUI dropdowns can be used in a wide range of ways from replacing an HTML `< select />` in a form to revealing complex additional interactions.
</p>


### Nested dropdowns
Useful for grouping  items of similar types when multiple types may be available e.g. filter a list of items by (US) state or status.

Useful for showing a number of convenience dates and a datepicker.

### Standard content
Uses a picklist for items, these can be multi-select.
Can have subheads, header and footer.
Can include search.

### Datepickers and other custom content
You can put a datepicker in at the top level or on a nested layer.
More info in the [Date Picker section](section-datepicker.html) of the guide.

Dropdowns support forms but these should be used with caution/sparingly.

## Interaction & behaviour

### Opening and closing
Enter and down arrow will always open the dropdown unless it’s an Autocompleter with this behaviour turned off.
Dropdowns should not open on focus.
Clicking away or clicking the trigger closes the dropdown.
With a single selection dropdown enter will apply the selection and close the dropdown.

### Applying selections and cancelling

Things: apply and close on selection; multi-selection with instant application; multi-selection with explicit application.
Modifications pending an explicit application will not be applied.

## Size and positioning

### Height
Dropdowns will grow to fill the greatest available vertical space either above or below the trigger. They scroll internally if the content is taller than the available space.

### Width
Dropdowns have a minimum width of 140px and, by default, will grow to fit the width of their content.

|             |                 |                      |
| ----------- | --------------- | -------------------- |
| Default     | Min-width 140px |                      |
| Small       | Max-width 140px | .xui-dropdown-small  |
| Medium      | Max-width 220px | .xui-dropdown-medium |
| Large       | Max-width 300px | .xui-dropdown-large  |
| Extra Large | Max-width 380px | .xui-dropdown-xlarge |
| Match       | Same as trigger | React-only           |

**These sizes default to a maximum and maybe set to fixed width by setting the matchTriggerWidth property on the DropDownToggled wrapping component.**

### Positioning

By default, dropdowns are aligned to the left edge and positioned just below the bottom edge of their trigger.
If the trigger is in the bottom half of the viewport, and there’s insufficient space to draw it contents below, the dropdown will position just above the top edge of the trigger.
This automatic positioning will not change as a result of scrolling but does reset if the viewport changes to prevent dropdowns displaying offscreen.
It is possible to override this behaviour by setting explicit vertical or horizontal positioning.
