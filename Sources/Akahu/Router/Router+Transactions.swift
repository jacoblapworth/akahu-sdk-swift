//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public enum Transactions: Equatable {
    /// Get a list of the user's transactions within the `start` and `end` time range.
    ///
    /// This endpoint returns transactions from all accounts that the user has connected to your application.
    /// Time range defaults to the last 30 days.
    case all(query: DateRangeQueryParams = .init(), cursor: PaginationQueryParams = .init())
    case transaction(id: String, Self.Transaction = .get)
    /// Get a list of pending transactions from a user's connected accounts within the `start` and `end` time range.
    ///
    /// This endpoint returns pending transactions from all of a user's accounts that the user has connected to your application.
    case pending
    case ids(ids: [String])
    
    public enum Transaction: Equatable {
      case get
      
      internal static let router = OneOf {
        Route(.case(Transaction.get))
      }
    }
  }
}

internal let transactionsRoute = Route(.case(AkahuRoute.transactions)) {
  Path { "transactions" }
  transactionsRouter
}

internal let transactionsRouter = OneOf {
  Route(.case(AkahuRoute.Transactions.all)) {
    AkahuRoute.dateRangeParser
    AkahuRoute.paginationParser
  }
  
  Route(.case(AkahuRoute.Transactions.transaction)) {
    Path { Parse(.string) }
    AkahuRoute.Transactions.Transaction.router
  }
  
  Route(.case(AkahuRoute.Transactions.pending)) {
    Path { "pending" }
  }
  
  Route(.case(AkahuRoute.Transactions.ids(ids:))) {
    Method.post
    Body(.json([String].self))
  }
}



