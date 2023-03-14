//
//  Account+Status.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

extension AkahuAccount {
  /// This tells you whether Akahu can currently sign in to the account to refresh it's data.
  public enum Status: String, Codable {
    /// Akahu can sign in and refresh this account.
    case active = "ACTIVE"
    /// Akahu no longer has access to this account. This may be caused by the user revoking Akahu's access at the institution or changing their login credentials.
    /// When an account becomes INACTIVE your application should direct the the user back to the OAuth flow or to my.akahu.io where they will be prompted to to re-establish this connection.
    case inactive = "INACTIVE"
  }
  
  public var isError: Bool {
    self.status != .active
  }
}
