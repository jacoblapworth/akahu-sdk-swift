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
    case all
    case income(id: String)
  }
}

internal let incomeRoute = Route(.case(AkahuRoute.income)) {
  Path { "income" }
  incomeRouter
}

internal let incomeRouter = OneOf {
  Route(.case(AkahuRoute.Income.all))
  Route(.case(AkahuRoute.Income.income)) {
    Path { Parse(.string) }
  }
}
