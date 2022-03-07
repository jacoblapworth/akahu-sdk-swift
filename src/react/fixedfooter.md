<div class="xui-margin-vertical">
	<a href="../section-components-navigation-fixedfooter.html" isDocLink>Fixed Footer in the XUI documentation</a>
</div>

Fixed footer is an experimental component to hold actions at the bottom of the viewport. Useful for long pages that require user input.

## Examples

### Default fixed footer

The fixed footer is an empty white bar with a top-edge shadow that remains fixed to the bottom of the viewport and prevents nearby elements from getting hidden behind it.

```jsx harmony
import { useState } from 'react';
import XUIActions from '@xero/xui/react/actions';
import XUIButton from '@xero/xui/react/button';
import XUIFixedFooterWIP from '@xero/xui/react/fixedfooter';

const FooterExample = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <XUIButton onClick={() => setIsVisible(!isVisible)}>Toggle fixed footer display</XUIButton>
      {isVisible && (
        <XUIFixedFooterWIP>
          <div className="xui-actions xui-actions-linear xui-padding">
            <XUIButton size="small">Edit layout</XUIButton>
            <div>
              <XUIButton hasCaret size="small">
                Save as
              </XUIButton>
              <XUIButton className="xui-margin-left-xsmall" hasCaret size="small">
                Export
              </XUIButton>
              <XUIButton className="xui-margin-left-xsmall" size="small" variant="main">
                Save
              </XUIButton>
            </div>
          </div>
        </XUIFixedFooterWIP>
      )}
    </>
  );
};

<FooterExample />;
```

## How it works

The content of your fixed footer will be cloned to reserve the space required to ensure that other content isn't covered by the footer. The invisible cloned content will be disabled for assistive technology, and visible content will have all the accessibility of the original content. Content in a fixed footer will be placed at the end of the DOM, which matches its visible placement.
