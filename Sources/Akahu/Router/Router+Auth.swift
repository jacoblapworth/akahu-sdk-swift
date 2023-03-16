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
    case token
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
  Route(.case(AkahuRoute.Auth.token)) {
    Method.post
  }
  
  Route(.case(AkahuRoute.Auth.revoke)) {
    Method.delete
  }
}

enum EnduringConsentScope: String {
  /// Gives your app ongoing permission to access the user's accounts.
  ///
  /// Supply this scope in an OAuth request to begin an enduring consent flow.
  case enduringConsent = "ENDURING_CONSENT"
  
  /// Gives your app access to the user's profile information held by Akahu, such as the email address they used to register their Akahu account.
  case akahu = "AKAHU"
  
  /// Gives access to the user's connected accounts.
  ///
  /// You will only be able to view the accounts shared with you by the user.
  /// The account data visible to your app is also limited, depending on whether your app needs access to balances, metadata, or account holder detail
  case accounts = "ACCOUNTS"
  
  /// Gives access to the user's transactions.
  ///
  /// You will only be able to view transactions from accounts shared with you by the user.
  /// Further restrictions may be applied including limiting the date window viewable for your app or limiting the categories of transactions visible to your ap
  case transactions = "TRANSACTIONS"
  
  /// Gives access to our transfer API, allowing your app to move money between a user's accounts you have been granted access to.
  case transfers = "TRANSFERS"
  
  /// Gives access to our payments API, allowing your app to send money to any account number from accounts you have been granted access to.
  case payments = "PAYMENTS"
  
  /// Gives access to the user's official name as retrieved from connected accounts.
  case identityNames = "IDENTITY_NAMES"
  
  /// Gives access to the user's date of birth as retrieved from connected accounts.
  case identityDobs = "IDENTITY_DOBS"
  
  /// Gives access to the user's email addresses as retrieved from connected accounts.
  case identityEmails = "IDENTITY_EMAILS"
  
  /// Gives access to the user's phone numbers as retrieved from connected accounts.
  case identityPhones = "IDENTITY_PHONES"
  
  /// Gives access to the user's tax numbers (IRD numbers) as retrieved from connected accounts.
  case identityTaxNumbers = "IDENTITY_TAX_NUMBERS"
  
  /// Gives access to the user's income data as derived by Akahu from transactions related the the user's connected accounts.
  case income = "INCOME"
}

//  "scope": "IDENTITY_BASIC ACCOUNTS TRANSACTIONS"
//internal let authScopeParser = Parse(.memberwise(
