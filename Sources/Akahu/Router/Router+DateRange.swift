//
//  Router+DateRange.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public struct DateRangeQuery: Equatable {
    var start: Date? = nil
    var end: Date? = nil
    
    public init(start: Date? = nil, end: Date? = nil) {
      self.start = start
      self.end = end
    }
    
    public static let parser = Parse(.memberwise(DateRangeQuery.init(start:end:))) {
      Query {
        Optionally {
          Field("start") { Parse { Formatted(.iso8601 ) } }
        }
        Optionally {
          Field("end") { Parse { Formatted(.iso8601 ) } }
        }
      }
    }
  }
}
