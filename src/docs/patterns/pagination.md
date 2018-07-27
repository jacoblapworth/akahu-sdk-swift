There are a number of reasons why you’d want to paginate data. Data restrictions, speed concerns, improving digestibility, and screen size restrictions being among the key factors.

## Best practice
✅ Only show the amount of data that is appropriate for your screen size  
✅ Use labels to outline where you are in the context of the entire dataset  
✅ Use xui-buttons to explicitly trigger pagination  
✅ Use xui loader when pagination is triggered on scroll  
✅ Use dot indicators when pagination is few and linear  
✅ Allow for infinite page cycling or restricted pagination sequence, depending on context  
✅ Optimize for the device when possible, ie. snap to scroll  
⚠️ Consider the data size you are loading by default, especially if mobile is a likely use-case  
🚫 Don’t rely on a dot indicator as the only way to trigger pagination  

## Applications

### Lists – Content block, Table, Card
✅ Trigger pagination on scroll  
✅ Use xui loader when fetching data  
⚠️ Consider the data size you are loading by default, especially if mobile is a likely use-case  

### Charts – Bar
✅ Show contextually appropriate amount of data. Ie. week & month view  
✅ Use labels to outline where you are in the context of the entire process (Page 2 of 5)  
✅ Use xui-button-icons with left and right arrows to trigger preceding and subsequent pages  
⚠️ Consider the data size you are loading by default, especially if mobile is a likely use-case  

### Pages – Invoice
✅ Use icon buttons with left and right icons to trigger preceding and subsequent documents  
⚠️ Only implement when viewing items on bulk is a common task-driven behaviour  