//
//  IncomePreviews.swift
//  
//
//  Created by Jacob Lapworth on 16/01/23.
//

import Foundation

extension AkahuIncome: Mockable {
  
  public static var mock = AkahuIncome(
    id: "income_1111111111111111111111111",
    account: "income_1111111111111111111111111",
    start: Date(timeIntervalSince1970: 1672531200),
    end: Date(timeIntervalSince1970: 1672531200),
    name: "The Green Dragon Inn",
    type: .salary,
    frequency: .weekly,
    summary: .mock,
    transactions: .mock,
    stability: .mock,
    projections: .mock
  )
}
