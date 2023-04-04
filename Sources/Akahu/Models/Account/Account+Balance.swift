//
//  Account+Balance.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation


extension AkahuAccount {
  /// The account balance
  public struct Balance: Codable, Hashable {
    /// The current account balance.
    public var current: Double
    /// The balance that is currently available to the account holder.
    public var available: Double?
    /// The credit limit available to the account.
    public var limit: Int? = nil
    /// The (3 letter ISO 4217 currency code)[https://www.xe.com/iso4217.php] that this balance is in.
    public var currency: String? = nil
    ///A boolean indicating whether this account is in unarranged overdraft.
    public var overdrawn: Bool? = nil
  }
}

extension AkahuAccount.Balance: Mockable {
  public static var mock: Self = .init(current: -2575.54, available: 396, currency: "NZD", overdrawn: false)
}
