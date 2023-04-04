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
    
    public struct Parser: ParserPrinter {
      public var body: some ParserPrinter<URLRequestData, PaginationQuery> {
        Parse(.memberwise(PaginationQuery.init)) {
          Query {
            Optionally {
              Field("cursor") { Parse(.string) }
            }
          }
        }
      }
    }
  }
}
