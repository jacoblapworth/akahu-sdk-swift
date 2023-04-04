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
    /// Build the OAuth Authorization URL
    ///
    /// To begin the OAuth flow, the user must be directed to https://oauth.akahu.io, with several query parameters set.
    /// - Returns: ``AkahuAuth/AuthorizationSuccessResponse``
    case authorize(AuthorizationParams)
    /// This endpoint is the final step in the [OAuth Authentication Flow](https://developers.akahu.nz/docs/authorizing-with-oauth2 ).
    ///
    /// Use this endpoint to exchange an Authorization Code for a User Access Token, which can be used to access the rest of this API.
    /// - Returns: ``AkahuAuth/AuthorizationToken``
    case exchange(TokenParams)
    /// Revokes the User Access Token that is included in the `Authorization` header of the request.
    ///
    /// Revoking a User Access Token will remove your access to **all** of a user's connected account data including transactions.
    case revoke
    
    internal static let router = OneOf {
      Route(.case(Auth.exchange)) {
        Method.post
        Body(.json(Auth.TokenParams.self, decoder: AkahuJSONDecoder(), encoder: AkahuJSONEncoder()))
      }
      
      Route(.case(Auth.revoke)) {
        Method.delete
      }
    }
    
  }
}

internal let oauthRoute = Route(.case(AkahuRoute.auth)) {
  Route(.case(AkahuRoute.Auth.authorize)) {
    AkahuRoute.Auth.AuthorizationParamsParser()
  }
}

internal let authRoute = Route(.case(AkahuRoute.auth)) {
  Path { "token" }
  AkahuRoute.Auth.router
}

extension AkahuRoute.Auth {
  public struct AuthorizationParams: Equatable {
    /// Where to redirect the user once they have accepted or rejected the access request. This must match one of your app's Redirect URIs.
    public var redirectUri: String
    /// The type of oauth response. Currently "code" is the only supported option.
    public var responseType: String = "code"
    /// The type of oauth flow to perform. `ENDURING_CONSENT` is all you need to supply here.
    public var scope: [AkahuAuth.EnduringConsentScope] = [.enduringConsent]
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
  
  public struct TokenParams: Codable, Equatable {
    /// Must always be authorization_code
    public var grantType: String = "authorization_code"
    /// The code to be exchanged for a User Access Token, received upon the user's completion of the authorization redirect flow.
    public var code: String
    /// Same `redirectUri` you specified to start the OAuth flow to receive an exchange code.
    public var redirectUri: String
    /// Your Akahu App ID Token
    public var clientId: String
    /// Your Akahu App Secret
    public var clientSecret: String
  }
  
  public struct ScopesParser: ParserPrinter {
    var body: some ParserPrinter<Substring, [AkahuAuth.EnduringConsentScope]> {
      Many {
        AkahuAuth.EnduringConsentScope.parser(of: Substring.UTF8View.self)
      } separator: {
        Whitespace(1)
      }
    }
  }
  
  public struct AuthorizationParamsParser: ParserPrinter{
    public var body: some ParserPrinter<URLRequestData, AuthorizationParams> {
      ParsePrint(.memberwise(AuthorizationParams.init)) {
        Query {
          Field("redirect_uri", .string)
          Field("response_type", .string, default: "code")
          Field("scope") { ScopesParser() }
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
    }
  }
}
