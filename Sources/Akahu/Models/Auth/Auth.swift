//
//  Auth.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

public struct AkahuAuth {
 
  /// The authorization response is delivered to your app by redirecting the user to your supplied Redirect URI, with results included in the query parameters.
  ///
  /// When the user accepts your app's request for authorization, they will be returned to your supplied Redirect URI with the following query parameters:
  public struct AuthorizationSuccessResponse {
    /// An `Authorization Code`. Keep track of this for the next step.
    public var code: String
    /// The state you supplied when you made the request.
    public var state: String?
    /// For OAuth requests, this will always be "oauth".
    public var source: String = "oauth"
    /// The type of event the user has performed
    public var event: Event
    
    public enum Event: String {
      case accept = "ACCEPT"
      case revoke = "REVOKE"
      case update = "UPDATE"
    }
  }
  
  /// In keeping with the OAuth2 specification, error responses from ``AkahuRoute/Auth/exchange(_:)`` contain an error in the error field, rather than the message field used by other Akahu endpoints.
  public struct AuthorizationErrorResponse {
    public var success: Bool = false
    public var error: String
  }
}

extension AkahuAuth {
  /// The User Access Token returned from exchanging an `Authorization Code`
  ///
  /// This token can be used to access the rest of the API.
  public struct AuthorizationToken {
    /// Authorised User Access Token used to authenticate the user upon additional resource request.
    public var accessToken: String
    /// Type of authentication
    public var tokenType: String = "bearer"
    /// List of granted permissions and resources the given token has access to.
    public var scope: [EnduringConsentScope]
  }
}

extension AkahuAuth.AuthorizationToken: Codable {
  enum CodingKeys: CodingKey {
    case accessToken, tokenType, scope
  }
  
  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    self.accessToken = try container.decode(String.self, forKey: .accessToken)
    self.tokenType = try container.decode(String.self, forKey: .tokenType)
    let scopes = try container.decode(String.self, forKey: .scope)
    self.scope = try AkahuRoute.Auth.ScopesParser().parse(scopes)
  }
}

extension Akahu {
  
  public struct Credentials {
    var appToken: String
    var userToken: String
    
    init(
      appToken: String,
      userToken: String
    ) throws {
      guard Self.validateAppToken(appToken) else { throw Errors.invalidAppToken(appToken) }
      self.appToken = appToken
      guard Self.validateUserToken(userToken) else { throw Errors.invalidUserToken(userToken) }
      self.userToken = userToken
    }
       
    /// Check that an Akahu App Token is valid
    /// ```
    /// validateAppToken("app_token_abcdefghi012345abcdefghij") // true
    /// ```
    public static func validateAppToken(_ token: String) -> Bool {
      token.starts(with: "app_token_")
    }
    
    /// Check that an Akahu User Token is valid
    /// ```
    /// validateAppToken("user_token_abcdefghi012345abcdefghij") // true
    /// ```
    public static func validateUserToken(_ token: String) -> Bool {
      token.starts(with: "user_token_")
    }
    
    enum Errors: Error, Equatable, CustomStringConvertible {
      case invalidAppToken(String)
      case invalidUserToken(String)
      
      var description: String {
        switch self {
        case let .invalidAppToken(token):
          return """
               Invalid appToken value: "\(token)".
               `appToken` must be a string beginning with "app_token_"
               """
        case let .invalidUserToken(token):
          return """
               Invalid userToken value: "\(token)".
               `userToken` must be a string beginning with "user_token_"
               """
        }
      }
    }
  }
}


