//
//  Identity.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

public struct AkahuIdentity: Identifiable, Codable {
  /// A unique Akahu identity identifier.
  public var id: String
  public var status: Status
  public var source: AkahuConnection
  public var accounts: Accounts
  public var identities: Identities
  public var addresses: Addresses
  
  enum CodingKeys: String, CodingKey {
    case id = "_id"
    case status, source, accounts, identities, addresses
  }
}
