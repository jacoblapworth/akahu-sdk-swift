PLATFORM_IOS = iOS Simulator,name=iPhone 14 Pro
PLATFORM_MACOS = macOS

default: test

test:
	xcodebuild test \
		-scheme Akahu \
		-destination platform="$(PLATFORM_IOS)"
	xcodebuild test \
		-scheme Akahu \
		-destination platform="$(PLATFORM_MACOS)"

test-swift:
	swift test \
		--enable-test-discovery \
		--parallel
