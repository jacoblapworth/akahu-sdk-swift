//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public enum Income: Equatable {
    /// Get a list of the user's income sources, derived from transactions belonging to the accounts that the user has connected to your application.
    case all(DateRangeQuery = .init())
    /// Get the details of a single income source, calculated using transactions that have occurred with the start and end time range.
    case income(id: String, DateRangeQuery = .init())
    
    internal static let router = OneOf {
      Route(.case(AkahuRoute.Income.all)) {
        DateRangeQuery.parser
      }
      Route(.case(AkahuRoute.Income.income)) {
        Path { Parse(.string) }
        DateRangeQuery.parser
      }
    }
  }
}

internal let incomeRoute = Route(.case(AkahuRoute.income)) {
  Path { "income" }
  AkahuRoute.Income.router
}


