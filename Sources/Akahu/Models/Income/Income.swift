//
//  Income.swift
//  
//
//  Created by Jacob Lapworth on 14/01/23.
//

import Foundation

public struct AkahuIncome: Codable, Identifiable {
  /// A unique identifier for this income source. It is always prefixed by income_.
  public let id: String
  /// The Akahu Account ID that this income source belongs to.
  public let account: String
  /// The ISO 8601 timestamp of the start date for this income query.
  public let start: Date
  /// The ISO 8601 timestamp of the end date for this income query.
  public let end: Date
  /// The clean name for this income source
  public let name: String
  public let type: IncomeType
  public let frequency: Frequency
  public let summary: Summary
  public let transactions: Transactions
  public let stability: Stability?
  public let projections: Projections?
  
  public enum CodingKeys: String, CodingKey {
    case id = "_id"
    case account = "_account"
    case start, end, name, type, frequency, summary, transactions, stability, projections
  }
}
