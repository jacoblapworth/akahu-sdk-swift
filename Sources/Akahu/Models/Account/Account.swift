//
//  Account.swift
//  
//
//  Created by Jacob Lapworth on 21/09/22.
//

import Foundation

/// At it's most basic, an Akahu account is something that has a balance.
///
/// Some connections (like banks) have lots of accounts, while others (like KiwiSaver providers) may only have one.
/// Different types of accounts have different attributes and abilities, which can get a bit confusing!
///
/// Keep in mind that Akahu limit's what information is available depending on your app permissions.
/// This is done in order to protect user privacy, however it also means that some of the data here may not be visible to you.
/// The id key is a unique identifier for the account in the Akahu system. It is always be prefixed by acc_ so that you can tell that it belongs to an account.
/// # Reference
/// [Akahu Reference](https://developers.akahu.nz/docs/the-account-model)
public struct AkahuAccount: Codable, Identifiable {
  /// A unique identifier for the account in the Akahu system. It is always be prefixed by acc_ so that you can tell that it belongs to an account.
  public var id: String = UUID().uuidString
  /// When you connect accounts to Akahu you have to log in. Akahu keeps track of all of the accounts in that login session and gives them all a unique _credentials key, prefixed by creds_.
  public let credentials: String
  public let connection: AkahuConnection
  public let name: Name
  public let status: Status
  public let formattedAccount: FormattedAccount?
  public let meta: Meta
  public let refreshed: Refreshed
  public let balance: Balance
  public let attributes: Attributes
  public var branch: Branch? = nil
  public let type: AccountType
  
  enum CodingKeys: String, CodingKey {
    case id = "_id"
    case credentials = "_credentials"
    case connection, name, status, formattedAccount, meta, refreshed, balance, attributes, branch, type
  }
}

extension AkahuAccount: Hashable {
  public static func == (lhs: AkahuAccount, rhs: AkahuAccount) -> Bool {
    lhs.id == rhs.id
  }
  
  public func hash(into hasher: inout Hasher) {
    hasher.combine(id)
    hasher.combine(credentials)
    hasher.combine(connection)
    hasher.combine(name)
    hasher.combine(status)
    hasher.combine(formattedAccount)
    hasher.combine(refreshed)
    hasher.combine(balance)
    hasher.combine(attributes)
    hasher.combine(type)
  }
}

extension AkahuAccount {
  init(data: Data) throws {
    self = try AkahuJSONDecoder().decode(AkahuAccount.self, from: data)
  }
}

// MARK: - Computed properties
extension AkahuAccount {
  /// A simplified account name for display
  public var displayName: String {
    var mutableName = self.name

    mutableName = mutableName.replacingOccurrences(of: "balance", with: "")
    mutableName = mutableName.replacingOccurrences(of: "\(self.connection.name)", with: "")
    mutableName = mutableName.trimmingCharacters(in: .whitespacesAndNewlines)
    
    if mutableName.isEmpty {
      return self.name
    }
    
    return mutableName
  }
  
  /// If the account type should be displayed as having a physical card
  public var hasCard: Bool {
    let types: [AkahuAccount.AccountType] = [
      .creditcard,
      .checking
    ]
    
    return types.contains(self.type)
  }
  
  public var shareableAccount: String? {
    guard let formattedAccount else { return nil }
    guard self.hasCard else { return nil }
    
    // Card numbers are redacted with asterisks
    if formattedAccount.contains("*") {  return nil }
    
    return formattedAccount
  }
}

