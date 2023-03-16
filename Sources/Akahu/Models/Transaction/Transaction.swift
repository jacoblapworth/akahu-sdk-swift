//
//  Transaction.swift
//  
//
//  Created by Jacob Lapworth on 28/09/22.
//

import Foundation

/// A transaction is a record of money moving between two accounts.
///
/// Akahu can provide transaction data from connected accounts for all bank integrations and a selection of non-bank integrations.
public struct Transaction: Codable, Identifiable {
  /// The _id key is a unique identifier for the transaction in the Akahu system. It is always be prefixed by trans_ so that you can tell that it refers to a transaction.
  public var id: String
  /// The _account key indicates which account this transaction belongs to. See our guide to Accessing Account Data to learn how to get this account, and our Account Model docs to learn more about accounts.
  public var account: String
  public var user: String
  /// This is the ID of provider that Akahu has retrieved this transaction from. You can get a list of connections from our /connections endpoint.
  public var connection: String
  /// The time that Akahu first saw this transaction (as an ISO 8601 timestamp). This is unrelated to the transaction date (when the transaction occurred) because Akahu may have retrieved an old transaction.
  public var createdAt: Date
  /// The ISO 8601 timestamp of when this transaction was last updated by Akahu
  public var updatedAt: Date
  /// The date that the transaction was posted with the account holder, as an ISO 8601 timestamp. In many cases this will only be accurate to the day, due to the level of detail provided by the bank.
  public var date: Date
  public var hash: String
  /// The transacton description as provided by the bank. Some minor cleanup is done by Akahu (such as whitespace normalisation), but this value is otherwise direct from the bank.
  public var description: String
  /// The amount of money that was moved by this transaction.
  public var amount: Double
  /// If available, the account balance immediately after this transaction was made. This value is direct from the bank and not modified by Akahu.
  public var balance: Double? = nil
  public var type: TransactionType
  public var meta: Meta? = nil
  /// The merchant that generated this transaction. Only present when you have permission to view enriched transactions.
  public var merchant: Merchant? = nil
  public var category: Category? = nil
  
  enum CodingKeys: String, CodingKey {
    case id = "_id"
    case account = "_account"
    case user = "_user"
    case connection = "_connection"
    case createdAt, updatedAt, date, hash, description, amount, balance, type, meta, merchant, category
  }
}

extension Transaction: Hashable {
  public static func == (lhs: Transaction, rhs: Transaction) -> Bool {
    lhs.hash == rhs.hash
  }
  
  public func hash(into hasher: inout Hasher) {
    hasher.combine(hash)
  }
}

extension Transaction {
  init(data: Data) throws {
    self = try newJSONDecoder().decode(Transaction.self, from: data)
  }
  
  init(_ json: String, using encoding: String.Encoding = .utf8) throws {
    guard let data = json.data(using: encoding) else {
      throw NSError(domain: "JSONDecoding", code: 0, userInfo: nil)
    }
    try self.init(data: data)
  }
  
  init(fromURL url: URL) throws {
    try self.init(data: try Data(contentsOf: url))
  }
}
