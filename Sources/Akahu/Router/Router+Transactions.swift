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
    case all(query: DateRangeOptions = .init(), cursor: PaginationOptions = .init())
    case transaction(id: String, Self.Transaction = .get)
    case pending
    case ids(ids: [String])
    
    public enum Transaction: Equatable {
      case get
    }
  }
}

internal let transactionsRoute = Route(.case(AkahuRoute.transactions)) {
  Path { "transactions" }
  transactionsRouter
}

internal let transactionsRouter = OneOf {
  Route(.case(AkahuRoute.Transactions.all)) {
    dateRangeParser
    paginationParser
  }
  
  Route(.case(AkahuRoute.Transactions.transaction)) {
    Path { Parse(.string) }
    transactionRouter
  }
  
  Route(.case(AkahuRoute.Transactions.pending)) {
    Path { "pending" }
  }
  
//  Route(.case(AkahuRoute.Transactions.ids(ids:))) {
//    Method.post
//    Body {
//      Parse {
//        "["
//        Many {
//          Parse(.string)
//        } separator: {
//          ","
//        }
//        "]"
//      }
//    }
//  }
}

internal let transactionRouter = OneOf {
  Route(.case(AkahuRoute.Transactions.Transaction.get))
}
