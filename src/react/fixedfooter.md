<div class="xui-margin-vertical">
	<a href="../section-components-navigation-fixedfooter.html" isDocLink>Fixed Footer in the XUI documentation</a>
</div>

Fixed footer is an experimental component to hold actions at the bottom of the viewport. Useful for long pages that require user input.

## Examples

### Default fixed footer

The fixed footer is an empty white bar with a top-edge shadow that remains fixed to the bottom of the viewport and prevents nearby elements from getting hidden behind it.

```jsx harmony
import { Fragment, useState } from 'react';
import XUIFixedFooterWIP from '@xero/xui/react/fixedfooter';
import XUIButton from '@xero/xui/react/button';
import XUIActions from '@xero/xui/react/actions';

const FooterTest = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Fragment>
      <XUIButton onClick={() => setIsVisible(!isVisible)}>Toggle fixed footer</XUIButton>
      {isVisible && (
        <XUIFixedFooterWIP>
          <XUIActions
            className="xui-padding-small"
            primaryAction={
              <XUIButton size="small" variant="primary">
                ActionCompletion
              </XUIButton>
            }
            secondaryAction={<XUIButton size="small">Action2Completion</XUIButton>}
          />
        </XUIFixedFooterWIP>
      )}
    </Fragment>
  );
};
<FooterTest />;
```

## How it works

The content of your fixed footer will be cloned to reserve the space required to ensure that other content isn't covered by the footer. The invisible cloned content will be disabled for assistive technology, and visible content will have all the accessibility of the original content. Content in a fixed footer will be placed at the end of the DOM, which matches its visible placement.
