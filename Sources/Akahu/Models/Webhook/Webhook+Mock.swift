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
    createdAt: Date(timeIntervalSince1970: 1672531200),
    updatedAt: Date(timeIntervalSince1970: 1672531200),
    lastCalledAt: Date(timeIntervalSince1970: 1672531200),
    state: "foobarbaz",
    url: URL(string: "https://webhooks.myapp.com/akahu")!)
}
