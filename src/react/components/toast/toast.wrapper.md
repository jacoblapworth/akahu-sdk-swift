### Toast Positioning & Timeouts

Use `XUIToastWrapper` to position toast components at the bottom-left corner of the screen. This component will ensure consistent positioning of the toast at all times.

This example of `XUIToastWrapper` defines a `timeoutToast` method to dismiss the toast after 10 seconds. It shows a maximum of 2 toasts at a time. It also uses the `onMouseOver` and `onMouseLeave` methods of `XUIToast` to keep the toast open if it is hovered over (or if the user focuses an element inside the toast), and close it 10 seconds after the cursor leaves.

Make sure to give users enough time to trigger toast actions via keyboard navigation. If the inability to trigger an action is detrimental to the user, you should consider not using any timeout at all and instead relying on an action to close the toast.

```js
import { useState } from 'react';
import XUIButton from '@xero/xui/react/button';
import XUIToast, { XUIToastMessage, XUIToastWrapper } from '@xero/xui/react/toast';

const TOAST_TIMEOUT = 10000;
const MAX_TOASTS = 2;

const ToastExample = () => {
  const [toasts, setToasts] = useState([]);
  const [toastCounter, setToastCounter] = useState(0);
  const [timerHandles, setTimerHandles] = useState({});

  const addToast = () => {
    const toastName = `INV-208${toastCounter} sent`;

    setToasts(previousState => {
      return [...previousState.slice(-MAX_TOASTS + 1), toastName];
    });

    setTimerHandles(previousState => {
      return {
        ...previousState,
        [toastName]: timeoutToast(toastName, TOAST_TIMEOUT)
      };
    });

    setToastCounter(previousState => previousState + 1);
  };

  const removeToast = toastToRemove => {
    setToasts(previousState => {
      return previousState.filter(toast => toast !== toastToRemove);
    });
  };

  const addToastTimeout = toastToClose => {
    const handle = setTimeout(() => removeToast(toastToClose), TOAST_TIMEOUT);

    setTimerHandles(previousState => {
      return {
        ...previousState,
        [toastToClose]: handle
      };
    });
  };

  const timeoutToast = (toastToClose, delay) => {
    return setTimeout(() => removeToast(toastToClose), delay);
  };

  const stopToastTimeout = toast => {
    clearTimeout(timerHandles[toast]);
  };

  return (
    <div>
      <XUIButton onClick={addToast} variant="main">
        Send invoice
      </XUIButton>
      <XUIToastWrapper>
        {toasts &&
          toasts.map((toast, index) => (
            <XUIToast
              closeButtonLabel="Close"
              key={index}
              onCloseClick={() => removeToast(toast)}
              onMouseLeave={() => addToastTimeout(toast)}
              onMouseOver={() => stopToastTimeout(toast)}
            >
              <XUIToastMessage>{toast}</XUIToastMessage>
            </XUIToast>
          ))}
      </XUIToastWrapper>
    </div>
  );
};

<ToastExample />;
```
