//
//  Webhook+Mock.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

extension AkahuWebhook: Mockable {
  public static var mock: Self = .init(
    id: "hook_1111111111111111111111111",
    createdAt: try! Date("2023-01-01T00:00:00Z", strategy: .iso8601),
    updatedAt: try! Date("2023-01-01T00:00:00Z", strategy: .iso8601),
    lastCalledAt: try! Date("2023-01-01T00:00:00Z", strategy: .iso8601),
    state: "foobarbaz",
    url: URL(string: "https://webhooks.myapp.com/akahu")!)
}
