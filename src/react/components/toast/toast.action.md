### Toast Actions

`XUIToastAction` should be used in place of regular buttons, and can be passed to `XUIToast` using the `primaryAction` and `secondaryAction` props.

```jsx harmony
import XUIToast, { XUIToastAction } from '@xero/xui/react/toast';

const onToastClose = () => {
  alert('Single action toast closed');
};

<div>
  <XUIToast
    closeButtonLabel="Close"
    message="Option 1"
    onCloseClick={onToastClose}
    primaryAction={
      <XUIToastAction href="#" qaHook="toast-example--action">
        Action 1
      </XUIToastAction>
    }
    qaHook="toast-example"
    secondaryAction={
      <XUIToastAction href="#" qaHook="toast-example--action-2">
        Action 2
      </XUIToastAction>
    }
  />
</div>;
```
