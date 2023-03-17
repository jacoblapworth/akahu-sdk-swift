//
//  Auth.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

public struct AkahuAuth {
  public struct AuthorizationOptions: Equatable {
    /// Where to redirect the user once they have accepted or rejected the access request. This must match one of your app's Redirect URIs.
    public var redirectUri: String
    /// The type of oauth response. Currently "code" is the only supported option.
    public var responseType: String = "code"
    /// The type of oauth flow to perform. `ENDURING_CONSENT` is all you need to supply here.
    public var scope: [EnduringConsentScope] = [.enduringConsent]
    /// Your App ID Token.
    public var clientId: String
    /// The user's email.
    public var email: String?
    /// Direct the user to a specific connection from your app.
    public var connection: String?
    /// An arbitrary string that will be returned with the Authorization Code. Useful to keep track of request-specific state and to prevent CSRF attacks.
    /// **Recommended**
    public var state: String?
  }
  
  public static let authorizationOptionsParser = Parse(.memberwise(AuthorizationOptions.init(
      redirectUri:responseType:scope:clientId:email:connection:state:
  ))) {
    Query {
      Field("redirect_uri", .string)
      Field("response_type", .string, default: "code")
      Field("scope") { scopesParser }
      Field("client_id", .string)
      Optionally {
        Field("email", .string)
      }
      Optionally {
        Field("connection", .string)
      }
      Optionally {
        Field("state", .string)
      }
    }
  }
  
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
  
  public struct AuthorizationErrorResponse {
  }
}

extension AkahuAuth {
  public struct AuthorizationToken {
    public var accessToken: String
    public var tokenType: String = "bearer"
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
    self.scope = try scopesParser.parse(scopes)
  }
}


