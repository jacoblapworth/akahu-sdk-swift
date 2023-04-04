//
//  User+Mock.swift
//  
//
//  Created by Jacob Lapworth on 13/02/23.
//

import Foundation

extension AkahuUser {
  public static var mock: Self = .init(
    id: "user_1111111111111111111111111",
    createdAt: Date(timeIntervalSince1970: 1672531200),
    firstName: "Jacob",
    lastName: "Lapworth",
    preferredName: "J",
    email: "test@google.com"
  )
}
