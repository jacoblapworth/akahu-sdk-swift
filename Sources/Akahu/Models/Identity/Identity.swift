//
//  Identity.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

/// Akahu supports the one-off retrieval of identity information using an OAuth2-like flow.
///
/// Unlike the Authorization OAuth2 flow, the user is not required to create an Akahu account in order to verify their identity with you.
/// This is because accessing identity data is a one time occurrence.
/// Akahu does not store, log, or cache the user's login credentials, and all data retrieved through this endpoint is deleted within 30 days.
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
