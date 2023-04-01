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
    
    public struct Parser: ParserPrinter {
      let dateTimeParser = DateTime().map(AnyConversion(
        apply: { Calendar.current.date(from: $0) },
        unapply: { Calendar.current.dateComponents(in: .autoupdatingCurrent, from: $0) }
      ))
      
      public var body: some ParserPrinter<URLRequestData, DateRangeQuery> {
        Parse(.memberwise(DateRangeQuery.init)) {
          Query {
            Optionally {
              Field("start") { dateTimeParser }
            }
            Optionally {
              Field("end") { dateTimeParser }
            }
          }
        }
      }
    }
  }
}
