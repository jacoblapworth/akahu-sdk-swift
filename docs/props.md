## xui-toggle prop types

### XUIToggle
`children`: (node, Optional) 

`className`: (string, Optional) 

`qaHook`: (string, Optional) 

`color`: (enum, Optional, Default='standard') - The color of the toggle

`layout`: (enum, Optional) - The layout of the toggle


### XUIToggleOption
`children`: (node, Optional) 

`className`: (string, Optional) 

`qaHook`: (string, Optional) 

`isChecked`: (bool, Optional) - The input is selected

`isDisabled`: (bool, Optional) - The input is disabled

`isRequired`: (bool, Optional) - The input is required for form submission

`name`: (string, Optional) - The name to use as a reference for the value

`onChange`: (func, Required)  - The function to call when the control changes state

`type`: (enum, Optional, Default='radio') - The type of the input

`value`: (string, Optional) - The value to return on form submission

