### Toast Actions

`XUIToastAction` should be used in place of regular buttons, and can be passed to `XUIToast` using the `primaryAction` and `secondaryAction` props.

```jsx harmony
import XUIToast, { XUIToastAction } from '../../toast';

const onToastClose = () => {
  alert('Single action toast closed');
};

<div>
  <XUIToast
    message="Option 1"
    qaHook="toast-example"
    onCloseClick={onToastClose}
    primaryAction={
      <XUIToastAction href="#" qaHook="toast-example--action">
        Action 1
      </XUIToastAction>
    }
    secondaryAction={
      <XUIToastAction href="#" qaHook="toast-example--action-2">
        Action 2
      </XUIToastAction>
    }
  />
</div>;
```
