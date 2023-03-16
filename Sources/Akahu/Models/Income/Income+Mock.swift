//
//  IncomePreviews.swift
//  
//
//  Created by Jacob Lapworth on 16/01/23.
//

import Foundation

extension Income: Mockable {
  
  public static var mock = Income(
    id: "income_1111111111111111111111111",
    account: "income_1111111111111111111111111",
    start: try! Date("2023-01-01T00:00:00Z", strategy: .iso8601),
    end: try! Date("2023-01-01T00:00:00Z", strategy: .iso8601),
    name: "The Green Dragon Inn",
    type: .salary,
    frequency: .weekly,
    summary: .mock,
    transactions: .mock,
    stability: .mock,
    projections: .mock
  )
}
