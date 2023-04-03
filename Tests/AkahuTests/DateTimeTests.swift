//
//  DateTimeTests.swift
//  
//
//  Created by Jacob Lapworth on 2/04/23.
//

import XCTest
import Foundation
import CustomDump
@testable import Akahu

class DateTimeTests: XCTestCase {
  let parser = DateTime()
  
  func testParsingDateTime() throws {
    let input = "1979-05-27"
    XCTAssertThrowsError(try parser.parse(input))
  }
  
  func testParsingWithFractionalSeconds() throws {
    let input = "1979-05-27T00:32:00.191Z"
    let expected: DateComponents = .init(
      timeZone: TimeZone(identifier: "GMT"),
      year: 1979,
      month: 5,
      day: 27,
      hour: 0,
      minute: 32,
      second: 0,
      nanosecond: 191000000
    )
    let output = try parser.parse(input)
    XCTAssertNoDifference(expected, output)
  }
  
  func testParsingUTC() throws {
    let input = "1979-05-27T00:32:00Z"
    let expected: DateComponents = .init(
      timeZone: TimeZone(identifier: "GMT"),
      year: 1979,
      month: 5,
      day: 27,
      hour: 0,
      minute: 32,
      second: 0
    )
    let output = try parser.parse(input)
    XCTAssertNoDifference(expected, output)
  }
  
  func testParsingOffset() throws {
    let input = "1979-05-27T00:32:00+12:00"
    let expected: DateComponents = .init(
      timeZone: TimeZone(identifier: "GMT+1200"),
      year: 1979,
      month: 5,
      day: 27,
      hour: 0,
      minute: 32,
      second: 0
    )
    let output = try parser.parse(input)
    XCTAssertNoDifference(expected, output)
  }
  
  func testPrintingUTC() throws {
    let date = Date(timeIntervalSince1970: 296_613_120)
    let input = Calendar.autoupdatingCurrent.dateComponents(in: .autoupdatingCurrent, from: date)
    let output = try parser.print(input)
    XCTAssertNoDifference("1979-05-27T00:32:00Z", output)
  }
}


