//
//  Router+Transactions.swift
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
    case all(query: DateRangeQuery = .init(), cursor: PaginationQuery = .init())
    /// An Individual transaction.
    case transaction(id: String, Self.Transaction = .get)
    /// Get a list of pending transactions ``Akahu/Akahu/TransactionPending`` from a user's connected accounts within the `start` and `end` time range.
    ///
    /// This endpoint returns pending transactions from all of a user's accounts that the user has connected to your application.
    case pending(cursor: PaginationQuery = .init())
    /// Gets a list of the user's transactions that match the provided list of Akahu transaction identifiers.
    ///
    /// The intended use for this endpoint is to assist in [transaction webhooks](https://developers.akahu.nz/docs/reference-webhooks#transaction)
    /// When a webhook arrives it contains a list of changed transaction identifiers, which you can simply pass unchanged to this endpoint to retrieve the full transactions.
    case ids(ids: [String])
    
    internal static let router = OneOf {
      Route(.case(Transactions.all)) {
        AkahuRoute.DateRangeQuery.parser
        AkahuRoute.PaginationQuery.parser
      }
      
      Route(.case(Transactions.transaction)) {
        Path { Parse(.string) }
        Transaction.router
      }
      
      Route(.case(Transactions.pending)) {
        Path { "pending" }
        AkahuRoute.PaginationQuery.parser
      }
      
      Route(.case(Transactions.ids(ids:))) {
        Method.post
        Body(.json([String].self))
      }
    }
    
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
  AkahuRoute.Transactions.router
}




