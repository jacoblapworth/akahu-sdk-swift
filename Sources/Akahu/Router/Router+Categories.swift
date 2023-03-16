//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  /// NZFCC categories that may be returned on a transaction.
  public enum Categories: Equatable {
    /// Gets a list of all NZFCC categories.
    case all
    /// Get an individual NZFCC Category.
    case category(id: String, category: Category = .get)
    
    public enum Category: Equatable {
      case get
    }
  }
}

internal let categoriesRoute = Route(.case(AkahuRoute.categories)) {
  Path { "categories" }
  categoriesParser
}

internal let categoriesParser = OneOf {
  Route(.case(AkahuRoute.Categories.all))
  Route(.case(AkahuRoute.Categories.category)) {
    Path { Parse(.string) }
    categoryParser
  }
}

internal let categoryParser = OneOf {
  Route(.case(AkahuRoute.Categories.Category.get))
}
