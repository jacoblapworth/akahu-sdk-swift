//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public enum Auth: Equatable {
    /// This endpoint is the final step in the [OAuth Authentication Flow](https://developers.akahu.nz/docs/authorizing-with-oauth2 ).
    ///
    /// Use this endpoint to exchange an Authorization Code for a User Access Token, which can be used to access the rest of this API.
    case exchange(AuthParameters)
    /// Revokes the User Access Token that is included in the `Authorization` header of the request.
    ///
    /// Revoking a User Access Token will remove your access to **all** of a user's connected account data including transactions.
    case revoke
  }
}

internal let authRoute = Route(.case(AkahuRoute.auth)) {
  Path { "token" }
  authRouter
}

internal let authRouter = OneOf {
  Route(.case(AkahuRoute.Auth.exchange)) {
    Method.post
    Body(.json(AuthParameters.self))
  }

  Route(.case(AkahuRoute.Auth.revoke)) {
    Method.delete
  }
}

let scopesParser = Many {
  EnduringConsentScope.parser(of: Substring.self)
} separator: {
  Whitespace(1)
}

public struct AuthParameters: Codable, Equatable {
  public var grantType: String = "authorization_code"
  public var code: String
  public var redirectUri: String
  public var clientId: String
  public var clientSecret: String
}
