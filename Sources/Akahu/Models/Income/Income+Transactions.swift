//
//  IncomeTransactions.swift
//  
//
//  Created by Jacob Lapworth on 16/01/23.
//

import Foundation

extension Income {
  
  public struct Transaction: Codable, Identifiable {
    /// The Akahu Transaction ID
    public let id: String
    /// How much money this transaction was for
    public let amount: Double
    /// The ISO 8601 timestamp of when this transaction was created by the bank
    public let date: Date
    /// The raw transaction description, essentially what you see on a bank statement
    public let description: String
    
    enum CodingKeys: String, CodingKey {
      case id = "_id"
      case amount, date, description
    }
  }
  
  public typealias Transactions = [Income.Transaction]
}

extension Income.Transactions {
  static let mock: Self = [
    .init(
      id: "trans_1111111111111111111111111",
      amount: 1000.01,
      date: try! Date("2022-02-22T20:53:47Z", strategy: .iso8601),
      description: "The Green Dragon Inn"
    ),
    .init(
      id: "trans_2222222222222222222222222",
      amount: 1000.01,
      date: try! Date("2022-02-22T20:53:47Z", strategy: .iso8601),
      description: "The Green Dragon Inn"
    )
  ]
}

extension Income.Transaction: Comparable {
  public static func < (lhs: Income.Transaction, rhs: Income.Transaction) -> Bool {
    lhs.date < rhs.date
  }
}
