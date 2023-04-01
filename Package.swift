// swift-tools-version: 5.7

import PackageDescription

let package = Package(
  name: "Akahu",
  platforms: [
    .iOS(.v16),
    .macOS(.v12)
  ],
  products: [
    .library(name: "Akahu", targets: ["Akahu"]),
  ],
  dependencies: [
    .package(url: "https://github.com/apple/swift-docc-plugin.git", from: "1.0.0"),
    .package(url: "https://github.com/pointfreeco/swift-custom-dump", from: "0.3.0"),
    .package(url: "https://github.com/pointfreeco/swift-dependencies", from: "0.2.0"),
    .package(url: "https://github.com/pointfreeco/swift-url-routing", from: "0.5.0")
  ],
  targets: [
    .target(
      name: "Akahu",
      dependencies: [
        "AkahuFixtures",
        .product(name: "URLRouting", package: "swift-url-routing")
      ]
    ),
    .target(
      name: "AkahuFixtures",
      resources: [
        .process("Resources")
      ]
    ),
    .testTarget(
      name: "AkahuTests",
      dependencies: [
        "Akahu",
        "AkahuFixtures",
        .product(name: "CustomDump", package: "swift-custom-dump"),
        .product(name: "Dependencies", package: "swift-dependencies")
      ]
    )
  ]
)
