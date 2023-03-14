//
//  Account+Attribute.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

extension AkahuAccount {
  /// The list of attributes indicates which abilities an account has.
  public enum Attribute: String, Codable {
    /// This account can initiate payments to any Akahu account with the "PAYMENT_TO" attribute.
    case paymentFrom = "PAYMENT_FROM"
    /// This account can receive payments from any Akahu account with the "PAYMENT_FROM" attribute.
    case paymentTo = "PAYMENT_TO"
    /// This account has transactions and supports fetching them via Akahu.
    case transactions = "TRANSACTIONS"
    /// This account can initiate transfers to accounts belonging to the same set of credentials.
    case transferFrom = "TRANSFER_FROM"
    /// This account can receive transfers from accounts belonging to the same set of credentials.
    case transferTo = "TRANSFER_TO"
  }
  
  public typealias Attributes = [Attribute]
}

extension AkahuAccount.Attributes: Mockable {
  static var mock: Self = [
    .transactions,
    .paymentTo,
    .transferTo
  ]
}
