#### What it does

Toast messages are a visual representation of a system event which does not require immediate action.
Unless the toast is an error toast, things will not fall apart if a user misses them or takes no action.

#### When to use them

* Immediately after a direct user action
* If a related task is often desired for the context (and otherwise not accessible on screen)
* If there is a system error unrelated to user action

#### When to avoid

* Do not use for validation messages. For errors in simple forms, use inline form validation
* Do not use toast actions if they are already available on the screen

#### Behaviour

* Animate toasts up from the bottom left corner of the viewport, positioned above content
* Wait until the page loads before starting the transition.
* Persist toast for a minimum of 5 seconds
* Automatically animate toasts away, unless the user’s mouse is positioned above the element, OR it has gained DOM focus
* Animate toasts away immediately after an additional action has been taken by the user (eg, clicking a button, navigating to a separate part of the app) instead of relying on the default delay
* Only show one toast at a time
* If another toast is required, immediately hide the current toast, before showing the new one
* Don’t use another toast to confirm a toast action
refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alert_role)
