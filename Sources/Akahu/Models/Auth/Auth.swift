//
//  Auth.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation

public struct Auth {
  public struct AuthorizationToken {
    public var accessToken: String
    public var tokenType: String = "bearer"
    public var scope: [EnduringConsentScope]
  }
}

extension Auth.AuthorizationToken: Codable {
  enum CodingKeys: CodingKey {
    case accessToken, tokenType, scope
  }
  
  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    self.accessToken = try container.decode(String.self, forKey: .accessToken)
    self.tokenType = try container.decode(String.self, forKey: .tokenType)
    let scopes = try container.decode(String.self, forKey: .scope)
    self.scope = try scopesParser.parse(scopes)
  }
}


