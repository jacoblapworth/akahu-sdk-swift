## Dropdown in a Modal test

The purpose of this test is to find / debug and fix the issues around this error `Uncaught RangeError: Maximum call stack size exceeded.`

The error occurs because both `<XUIModal />`, and `<Dropdown />` components have an internal method called `_restrictFocus`, which conflicts with each other to capture and keep focus while interacting with the component. Nesting the dropdown here causes it to take focus from the modal which causes that to take focus from the dropdown and so on and so forth until the browser crashes with `Maximum call stack size exceeded`.

Interestingly enough, the components appear to be somewhat usable but an error still occurs in the console.

To reproduce, open the console and click on the `Trigger Button`. It should error with the above error.
