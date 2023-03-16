//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

public struct PaginationOptions: Equatable {
  var cursor: String? = nil
  
  public init(cursor: String? = nil) {
    self.cursor = cursor
  }
}

public let paginationParser = Parse(.memberwise(PaginationOptions.init(cursor:))) {
  Query {
    Optionally {
      Field("cursor") { Parse(.string) }
    }
  }
}


@available(*, deprecated, message: "Use individual ``PaginationOptions`` and ``DateRangeOptions`` options")
public struct PaginatedDateRangeOptions: Equatable {
  public var start: Date? = nil
  public var end: Date? = nil
  public var cursor: String? = nil
  
  public init(start: Date? = nil, end: Date? = nil, cursor: String? = nil) {
    self.start = start
    self.end = end
    self.cursor = cursor
  }
}

@available(*, deprecated, message: "Use individual ``paginationParser`` and ``dateRangeParser`` parsers")
public let paginatedDateRangeParser = Parse(.memberwise(PaginatedDateRangeOptions.init(start:end:cursor:))) {
  Query {
    Optionally {
      Field("start") { Parse { Formatted(.iso8601 ) } }
    }
    Optionally {
      Field("end") { Parse { Formatted(.iso8601 ) } }
    }
    Optionally {
      Field("cursor") { Parse(.string) }
    }
  }
}

//public struct PaginatedDateRangeOptions: Equatable {
//  var dateRange: DateRangeOptions? = nil
//  var pagination: PaginationOptions? = nil
//
//  var start: Date? { dateRange?.start }
//  var end: Date? { dateRange?.end }
//  var cursor: String? { pagination?.cursor }
//
//  public init(start: Date? = nil, end: Date? = nil, cursor: String? = nil) {
//    self.dateRange = .init(start: start, end: end)
//    self.pagination = .init(cursor: cursor)
//  }
//
//  public init(dateRange: DateRangeOptions? = nil, pagination: PaginationOptions? = nil) {
//    self.dateRange = dateRange
//    self.pagination = pagination
//  }
//}
//

//public let paginatedDateRangeParser = Parse(.memberwise(PaginatedDateRangeOptions(dateRange:pagination:))) {
//  paginationParser
//  dateRangeParser
//}
