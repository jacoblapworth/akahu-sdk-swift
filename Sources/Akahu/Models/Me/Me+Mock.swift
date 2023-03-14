//
//  Me+Mock.swift
//  
//
//  Created by Jacob Lapworth on 13/02/23.
//

import Foundation

extension AkahuMe {
  public static var mock: Self = .init(
    id: "user_1111111111111111111111111",
    createdAt: try! Date("2023-01-01T00:00:00Z", strategy: .iso8601),
    firstName: "Jacob",
    lastName: "Lapworth",
    preferredName: "J",
    email: "test@google.com"
  )
}
