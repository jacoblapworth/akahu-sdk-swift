## Stateful picklist

This has been created to help solve an infinite loop issue with the stateful picklist, given a specific configuration

Details of the issue here: https://github.dev.xero.com/Xero/Projects.UI/issues/1780

The fix: Added a check to the "findFirstMenuItem" helper function to check the existence of dropdown footer pickitems, and whether or not they exist in the idCache. This returns false if the item doesn't exist in the idCache and as a result, does not return the footer's pickitem when it is under "should not render" state, thereby eliminating the infinite setState set of calls.
