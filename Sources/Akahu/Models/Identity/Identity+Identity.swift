//
//  Identity+Identity.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

extension Identity {
  /// Identity information derived from a user's connected accounts.
  public struct Identity: Codable {
    /// Name of one of the account holders.
    public var name: String
    /// Bank account number of the account this holder was derived from.
    public var formattedAccount: String
    public var meta: Meta
    
    /// Currently reserved for future use to house additional metadata about the user.
    public struct Meta: Codable {}
  }
  
  public typealias Identities = [Identity]
}

extension Identity.Identity: Mockable {
  public static var mock: Self = .init(
    name: "F BAGGINS",
    formattedAccount: "38-9009-0000000-00",
    meta: .init()
  )
}
