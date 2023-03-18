//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public struct PaginationQuery: Equatable {
    var cursor: String? = nil
    
    public init(cursor: String? = nil) {
      self.cursor = cursor
    }
    
    public static let parser = Parse(.memberwise(Self.init(cursor:))) {
      Query {
        Optionally {
          Field("cursor") { Parse(.string) }
        }
      }
    }
  }
}
