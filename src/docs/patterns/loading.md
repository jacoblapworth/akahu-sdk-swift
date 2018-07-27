At times, visual feedback is required to maintain focus, illustrate progress, and communicate change to the customer. 

## Best practice
✅ Challenge arbitrary technical constraints that make things slow  
✅ Show signifiers on a page as soon as possible to set expectations  
✅ Use loaders as visual indicators of loading content  
✅ Present data as soon as it is available  
⚠️ Use local storage with caution (accuracy is better than speed)  
⚠️ Always have a loading strategy for dynamic data even if response times are usually fast, as data speeds can vary  
🚫 Don’t show visual indicators for static data  

## Applications

### Pages
✅ Load in page elements structurally from the base up, starting with the top-level navigation (ie. Global navigation or Isolation header)  
✅ If content is not predictable, and there are many objects fetching asynchronously, use a visual indicator on the entire section below the header

```
[Example]
```

### Panels
✅ Display the surrounding container with xui-loader inside until content is available  
✅ While loading content, display panel title, search and filters if present  
✅ If the panel dimensions are fixed (eg, only shows 3 most recent items), retain this known height when loading to prevent content jumping around  
✅ Animate affected objects at the end of the process (eg. fade the content in)  

```
[Example]
```

### Lists
✅ Display 30 items* on initial load (if n<50, truncate to 30) (if n<50, show all)  
✅ Display 30 items on each subsequent load  
✅ Use scroll position as a trigger to load more content (Total rows - 10, load 30 more)  
✅ Buttons can also be used as explicit actions to load more content  
✅ Position the loader outside content on each subsequent load  

```
Content block [Example]
Table [Example]
```

### Modals
✅ Display the modal with xui-loader inside until content is available  
✅ Display modal title, close and submit button unless they are dynamically generated  
✅ Provide a min-height for adequate spacing around xui-loader  
✅ After user action, use xui-loader inside the button until the action is complete  
✅ Animate affected objects the end of the process (eg. fade the page in)  

```
[Example]
```

### Dropdowns
✅ Display the dropdown with xui-loader inside until content is available  
✅ When loading, provide a min-height the equivalent of 5 rows  
✅ On subsequent loads, retain whatever the current min-height is, until new results are rendered  

```
[Example]
```

### Buttons
✅ Use xui-loader inside the button until the action is complete  
✅ Retain original button width when inserting loader, to stop elements jumping around  
✅ Animate affected objects at the end of the process (eg, collapse deleted item)  

```
[Example]
```

### Search
✅ Fetch data after each keydown  
✅ Simulate loading immediately on keydown, even if it hasn’t technically occured yet  
✅ Delay actual data fetch by 100ms to allow for fast typing  

### Autosave
✅ Use persistent text to indicate progress  
✅ Indicate state change via subtle text changes, as this is likely to happen repeatedly  
🚫 Don’t block parts of the app whilst saving  

## Handling errors

### Failure to load
✅ Return to the previous state  
✅ Use a toast or banner to communicate the issue  
✅ Present an option to retry  

### Long response times
✅ Use a toast or banner to communicate the issue  
✅ Presenting an option to retry or diagnose the issue  

## Components referenced
```
Loader
Button
Panel
Dropdown
Modal
```

## Similar pages
```
Pagination
Errors
Autosave
Skeleton loaders (TBC)
Toast
Banner
```