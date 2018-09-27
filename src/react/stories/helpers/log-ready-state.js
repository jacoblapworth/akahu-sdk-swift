// We only want to run the Backstop "readyEvent" hook if we are actually performing
// visual regressions (in a "headless" environment) and not if a user is simply
// using a "generic (Chrome)" Storybook instance to look at our XUI components.
const isHeadless = /Headless/.test(navigator.userAgent);

// Backstop has an issue that is yet to be addressed where the "readyEvent" can
// be fired before Backstop has begun listening for said event. This can result
// in Backstop logging that the visual regression has timed out (as it waited for
// a readyEvent that it thinks never came).
//
// Because this is a race condition, Backstop users have found that continuously
// logging the "readyEvent" until it is registered by Backstop is the only
// consistent answer at this point in time. Kinda lame, but the "readyEvent"
// functionality itself is important to allow us to test complex components and
// scenarios like interactions without relying on the very fragile "delay" hook.
// The "isHeadless" reference also ensures that this script is only run where
// appropriate =)
const logReadyState = readyState =>
	// eslint-disable-next-line no-console
	isHeadless && setInterval(() => console.log(readyState), 100);

// Because Backstop creates a new instance for every visual test we do not need
// to "clear" the "setInterval" because it will be destroyed when Backstop finishes.

export default logReadyState;
