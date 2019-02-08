## Disabling Standard Widths

When you disable standard widths of a composition, two things happen.

1. We remove the forced widths on the master and summary areas
2. We expect you to provide those widths

# A BIG WORD OF WARNING

Widths provided should match any responsive designs you require, as the areas still respond based on the original rules. For example, the summary area will appear above master and detail in a medium size viewport width, but will appear to the right of the detail in a large size viewport and bigger. Cater for these area updates in your updated designs.

### Storybook examples with disabling standard widths

Our examples show what it looks like if you set a hard width, and then reflow the viewport. This is acceptable if you are using a small viewport and wider, or a medium and wider if the area does not reflow.

Note that when you deselect the option "Apply standard widths to columns", you are given up to two new options at the bottom of the knob section to let you choose from a range of widths, these are non-responsive.
