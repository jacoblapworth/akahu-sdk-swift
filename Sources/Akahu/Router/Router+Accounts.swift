//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public enum Accounts: AkahuEndpoint {
    /// Get a list of all accounts that the user has connected to your application.
    case all
    /// An individual account that the user has connected to your application.
    case account(id: String, Account = .get)
    
    internal static let router = OneOf {
      Route(.case(Accounts.all))
      Route(.case(Accounts.account)) {
        Path { Parse(.string) }
        Account.router
      }
    }
    
    static var auth: AkahuRoute.AuthLevel = .user
    
    public enum Account: Equatable {
      /// Get an individual account that the user has connected to your application.
      case get
      /// Revoke your application's access to one of the user's connected accounts and its associated data, including transactions.
      ///
      /// Use this if you no longer require access to the consented account data.
      case revoke
      /// Transactions for a specific account
      case transactions(Self.Transactions = .all())
      
      internal static let router = OneOf {
        Route(.case(Account.get))
        Route(.case(Account.revoke)) {
          Method.delete
        }
        Route(.case(Account.transactions)) {
          Path { "transactions" }
          Transactions.router
        }
      }
      
      public enum Transactions: Equatable {
        /// Get a list of the user's transactions for a specific connected account within the `start` and `end` time range.
        ///
        /// Time range defaults to the last 30 days
        case all(query: DateRangeQuery = .init(), cursor: PaginationQuery = .init())
        /// Get a list of the user's pending transactions for a specific connected account.
        case pending
        
        internal static let router = OneOf {
          Route(.case(Transactions.all)) {
            DateRangeQuery.Parser()
            PaginationQuery.Parser()
          }
          Route(.case(Transactions.pending)) {
            Path { "pending" }
          }
        }
      }
    }
  }
}

internal let accountsRoute = Route(.case(AkahuRoute.accounts)) {
  Path { "accounts" }
  AkahuRoute.Accounts.router
}




