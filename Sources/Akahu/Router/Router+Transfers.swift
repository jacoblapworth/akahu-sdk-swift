//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public enum Transfers: Equatable {
    /// Get a list of the money transfers that your application has initiated between the user's connected accounts within the start and end time range.
    case all(query: DateRangeQueryParams = .init())
    /// Initiate a transfer between two of the user's connected accounts.
    case create
    case transfer(id: String, transfer: Transfer = .get)
    
    public enum Transfer: Equatable {
      /// Get the record of an individual money transfer that your application has initiated between two of the user's connected accounts.
      case get
    }
  }
}

internal let transfersRoute = Route(.case(AkahuRoute.transfers)) {
  Path { "transfers" }
  OneOf {
    Route(.case(AkahuRoute.Transfers.all(query:))) {
      dateRangeParser
    }
    Route(.case(AkahuRoute.Transfers.create)) {
      Method.post
    }
    Route(.case(AkahuRoute.Transfers.transfer)) {
      Path { Parse(.string) }
      transferRouter
    }
  }
}

internal let transferRouter = OneOf {
  Route(.case(AkahuRoute.Transfers.Transfer.get))
}
