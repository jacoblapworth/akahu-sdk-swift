// swift-tools-version: 5.7

import PackageDescription

let package = Package(
  name: "Akahu",
  platforms: [
    .iOS(.v16)
  ],
  products: [
    .library(name: "Akahu", targets: ["Akahu"]),
  ],
  dependencies: [
    .package(url: "https://github.com/pointfreeco/swift-url-routing", from: "0.4.0"),
    .package(url: "https://github.com/pointfreeco/swift-custom-dump", from: "0.3.0")
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
        .product(name: "CustomDump", package: "swift-custom-dump")
      ]
    )
  ]
)
