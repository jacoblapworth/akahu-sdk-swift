//
//  Me.swift
//  
//
//  Created by Jacob Lapworth on 13/02/23.
//

import Foundation

/// The user's profile information that they have provided to Akahu.
/// 
/// The `email` and `mobile` keys will be visible if you have the required permissions.
public struct AkahuMe: Codable, Identifiable {
  /// Unique Akahu user identifier.
  public var id: String
  /// ISO 8601 formatted date of when the users account was created
  public var createdAt: Date?
  /// Users first name
  public var firstName: String
  /// Users last name
  public var lastName: String
  /// Users preferred name
  public var preferredName: String
  /// Users email
  public var email: String?
  /// Users phone number
  public var mobile: String?
  
  enum CodingKeys: String, CodingKey {
    case id = "_id"
    case createdAt, firstName, lastName, preferredName, email, mobile
  }
}

extension AkahuMe {
  init(data: Data) throws {
    self = try AkahuJSONDecoder().decode(AkahuMe.self, from: data)
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

extension AkahuMe {
  public var name: PersonNameComponents {
    .init(
      givenName: self.firstName,
      familyName: self.lastName,
      nickname: self.preferredName
    )
  }
}
