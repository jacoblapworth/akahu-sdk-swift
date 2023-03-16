//
//  Identity+Account.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

extension Identity {
  /// Identity information registered on linked accounts
  public struct Account: Codable {
    /// Registered address for the bank account
    public var address: String
    /// Display name of the bank
    public var bank: String
    /// Unique bank account identifer
    public var accountNumber: String
    /// Names of the owner of the account
    public var holder: String
  }
  
  public typealias Accounts = [Account]
}

extension Identity.Account: Mockable {
  public static var mock: Self = .init(
    address: "27 Bag End, Bagshot Row, Hobbiton, 1011",
    bank: "Kiwibank",
    accountNumber: "38-9009-0000000-00",
    holder: "F BAGGINS"
  )
}
