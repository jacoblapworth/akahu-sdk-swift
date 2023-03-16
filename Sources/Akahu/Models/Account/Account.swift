//
//  Account.swift
//  
//
//  Created by Jacob Lapworth on 21/09/22.
//

import Foundation
import RegexBuilder

/// At it's most basic, an Akahu account is something that has a balance.
///
/// Some connections (like banks) have lots of accounts, while others (like KiwiSaver providers) may only have one. Different types of accounts have different attributes and abilities, which can get a bit confusing!
///
/// Keep in mind that Akahu limit's what information is available depending on your app permissions. This is done in order to protect user privacy, however it also means that some of the data here may not be visible to you.
/// The id key is a unique identifier for the account in the Akahu system. It is always be prefixed by acc_ so that you can tell that it belongs to an account.
/// # Reference
/// [Akahu Reference](https://developers.akahu.nz/docs/the-account-model)
public struct Account: Codable, Identifiable {
  public var id: String = UUID().uuidString
  public let credentials: String
  public let connection: Connection
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

extension Account: Hashable {
  public static func == (lhs: Account, rhs: Account) -> Bool {
    lhs.id == rhs.id
  }
  
  public func hash(into hasher: inout Hasher) {
    hasher.combine(id)
  }
}

extension Account {
  init(data: Data) throws {
    self = try newJSONDecoder().decode(Account.self, from: data)
  }
  
  init(_ json: String, using encoding: String.Encoding = .utf8) throws {
    guard let data = json.data(using: encoding) else {
      throw NSError(domain: "JSONDecoding", code: 0, userInfo: nil)
    }
    try self.init(data: data)
  }

  init(fromURL url: URL) throws {
    try self.init(data: try Data(contentsOf: url))
  }
}

// MARK: - Computed properties
extension Account {
  public var displayName: String {
    var mutableName = self.name

    mutableName = mutableName.replacing("balance", with: "")
    mutableName = mutableName.replacing("\(self.connection.name)", with: "")
    mutableName = mutableName.trimmingCharacters(in: .whitespacesAndNewlines)
    
    if mutableName.isEmpty {
      return self.name
    }
    
    return mutableName
  }
  
  public var hasCard: Bool {
    let types: [Account.AccountType] = [
      .creditcard,
      .checking
    ]
    
    return types.contains(self.type)
  }
  
  public var shareableAccount: String? {
    guard let formattedAccount else { return nil }
    
    // Card numbers are redacted with asterisks
    let regex = Regex { OneOrMore("*") }
    if formattedAccount.contains(regex) { return nil }
    guard self.hasCard else { return nil }
    
    return formattedAccount
  }
}

