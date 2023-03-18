//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public enum Me: Equatable {
    case get
    
    internal static let router = OneOf {
      Route(.case(Me.get))
    }
  }
}

internal let meRoute = Route(.case(AkahuRoute.me)) {
  Path { "me" }
  AkahuRoute.Me.router
}


