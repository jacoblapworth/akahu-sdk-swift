//
//  Transaction+Pending.swift
//  
//
//  Created by Jacob Lapworth on 6/02/23.
//

import Foundation

public struct AkahuTransactionPending: Codable, Identifiable {
  public let id: String = UUID().uuidString
  /// The Akahu User ID that this transaction belongs to
  public let user: String
  /// The Akahu Account ID that this transaction belongs to
  public let account: String
  /// The Akahu Connection ID that this transaction belongs to
  public let connection: String
  /// The ISO 8601 timestamp for the transaction from the bank.
  public let date: Date
  /// The ISO 8601 timestamp of when this transaction was last updated by Akahu
  public let updatedAt: Date
  /// The raw transaction description, essentially what you see on a bank statement
  public let description: String
  /// How much money this transaction was for
  public let amount: Double
  public let type: AkahuTransaction.TransactionType
  
  enum CodingKeys: String, CodingKey {
    case user = "_user"
    case account = "_account"
    case connection = "_connection"
    case date, description, amount, type, updatedAt
  }
  
  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    self.user = try container.decode(String.self, forKey: .user)
    self.account = try container.decode(String.self, forKey: .account)
    self.connection = try container.decode(String.self, forKey: .connection)
    self.date = try container.decode(Date.self, forKey: .date)
    self.updatedAt = try container.decode(Date.self, forKey: .updatedAt)
    self.description = try container.decode(String.self, forKey: .description)
    guard let amount = Double(try container.decode(String.self, forKey: .amount)) else {
      throw DecodingError.typeMismatch(Double.self, .init(
        codingPath: decoder.codingPath,
        debugDescription: "Expected to decode String as Double but found a different type instead.")
      )
    }
    self.amount = amount
    self.type = try container.decode(AkahuTransaction.TransactionType.self, forKey: .type)
  }

}
