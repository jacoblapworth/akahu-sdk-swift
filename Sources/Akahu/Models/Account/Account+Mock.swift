//
//  Account+Mock.swift
//  
//
//  Created by Jacob Lapworth on 13/02/23.
//

import Foundation

extension AkahuAccount: Mockable {
  public static var mock: Self = .init(
    id: "acc_1111111111111111111111111",
    credentials: "creds_1111111111111111111111111",
    connection: .mock,
    name: "Spending",
    status: .active,
    formattedAccount: "00-1234-1234567-00",
    meta: .mock,
    refreshed: .mock,
    balance: .mock,
    attributes: [],
    type: .creditcard
  )
}
