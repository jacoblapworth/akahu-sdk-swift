//
//  Account+Refreshed.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

extension AkahuAccount {
  /// Akahu can refresh different parts of an account's data at different rates.
  /// The timestamps in the refreshed object tell you when that account data was last updated.
  /// This can be thought of as "Akahu's view of the account (balance/metadata/transactions) is up to date as of $TIME".
  public struct Refreshed: Codable, Hashable {
    /// The ISO 8601 timestamp when the balance was last retrieved
    public var balance: Date? = nil
    /// The ISO 8601 timestamp when other account metadata was last retrieved (any property apart from balance)
    public var meta: Date? = nil
    /// The ISO 8601 timestamp when we last checked for and processed any new transactions.
    /// This flag may be missing when an account has first connected, as it takes a few seconds for new transactions to be processed.
    public var transactions: Date? = nil
  }
}

extension AkahuAccount.Refreshed: Mockable {
  public static let mock: Self = .init(balance: Date(timeIntervalSinceNow: TimeInterval(-60*6)))
}
