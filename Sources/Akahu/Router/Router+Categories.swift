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
    
    internal static let router = OneOf {
      Route(.case(Categories.all))
      Route(.case(Categories.category)) {
        Path { Parse(.string) }
        Category.router
      }
    }
    
    public enum Category: Equatable {
      case get
      
      internal static let router = OneOf {
        Route(.case(Category.get))
      }
    }
  }
}

internal let categoriesRoute = Route(.case(AkahuRoute.categories)) {
  Path { "categories" }
  AkahuRoute.Categories.router
}



