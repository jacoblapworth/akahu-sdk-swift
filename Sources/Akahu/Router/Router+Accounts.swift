//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public enum Accounts: Equatable {
    /// Get a list of all accounts that the user has connected to your application.
    case all
    /// An individual account that the user has connected to your application.
    case account(id: String, Account = .get)
    
    public enum Account: Equatable {
      case get
      /// Revoke your application's access to one of the user's connected accounts and its associated data, including transactions.
      ///
      ///Use this if you no longer require access to the consented account data.
      case revoke
      case transactions(Self.Transactions = .all())
      
      public enum Transactions: Equatable {
        case all(query: DateRangeOptions = .init(), cursor: PaginationOptions = .init())
        case pending
      }
    }
  }
}

internal let accountsRoute = Route(.case(AkahuRoute.accounts)) {
  Path { "accounts" }
  accountsRouter
}

internal let accountsRouter = OneOf {
  Route(.case(AkahuRoute.Accounts.all))
  Route(.case(AkahuRoute.Accounts.account)) {
    Path { Parse(.string) }
    accountRouter
  }
}

internal let accountRouter = OneOf {
  Route(.case(AkahuRoute.Accounts.Account.get))
  Route(.case(AkahuRoute.Accounts.Account.revoke)) {
    Method.delete
  }
  Route(.case(AkahuRoute.Accounts.Account.transactions)) {
    Path { "transactions" }
    accountTransactionsRouter
  }
}

internal let accountTransactionsRouter = OneOf {
  Route(.case(AkahuRoute.Accounts.Account.Transactions.all)) {
    dateRangeParser
    paginationParser
  }
  Route(.case(AkahuRoute.Accounts.Account.Transactions.pending)) {
    Path { "pending" }
  }
}
