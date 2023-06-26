//
//  Account+Branch.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

extension AkahuAccount {
  /// If this account is a NZ bank account, Akahu will provide details of the opening branch.
  @available(*, deprecated, message: "Akahu no longer provides branch details")
  public struct Branch: Codable {
    /// The branch name
    public let name: String
    /// The branch description
    public let description: String
    /// The branch phone number
    public let phone: String
    /// The branch physical address
    public let address: Address
  }
}

extension AkahuAccount.Branch {
  public struct Address: Codable {
    public let line1: String
    public let line2: String
    public let line3: String?
    public let line4: String?
    /// The city
    public let city: String
    /// The NZ postal code
    public let postcode: String?
    /// The country
    public let country: String
  }
}


