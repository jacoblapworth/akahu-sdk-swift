//
//  Auth+Scopes.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation

/// Akahu provides the following scopes for requests that require enduring consent.
public enum EnduringConsentScope: String, CaseIterable, Codable {
  /// Gives your app ongoing permission to access the user's accounts.
  ///
  /// Supply this scope in an OAuth request to begin an enduring consent flow.
  /// Required
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

/// Akahu provides the following scopes for one-off verification requests.
public enum OneOffScope: String, CaseIterable, Codable {
  /// Gives your app permission to access a user's data at the time you request it. Supply this scope in an OAuth request to begin a one-off verification flow.
  case oneoff = "ONEOFF"
  
  /// Gives access to the user's account holder information, as supplied by the connected institution.
  case holder = "HOLDER"
  
  /// Gives access to the user's residential and postal address, as supplied by the connected institution.
  case address = "ADDRESS"
  
  /// Gives access to the user's account details, including the holder name, account number, and branch details, as supplied by the connected institution.
  case account = "ACCOUNT"
  
  /// Gives access to transactions associated with the user's connected account(s).
  case transactions = "TRANSACTIONS"
}

