//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

public struct DateRangeOptions: Equatable {
  var start: Date? = nil
  var end: Date? = nil
  
  public init(start: Date? = nil, end: Date? = nil) {
    self.start = start
    self.end = end
  }
}

public let dateRangeParser = Parse(.memberwise(DateRangeOptions.init(start:end:))) {
  Query {
    Optionally {
      Field("start") { Parse { Formatted(.iso8601 ) } }
    }
    Optionally {
      Field("end") { Parse { Formatted(.iso8601 ) } }
    }
  }
}
