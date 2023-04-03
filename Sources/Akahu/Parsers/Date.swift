//
//  DateTime.swift
//  
//
//  Created by Jacob Lapworth on 29/03/23.
//

import Foundation
import Parsing


/// Parse a Substring into DateComponents
///
/// Equivalent to ISO8601DateFormatter
struct DateTime: ParserPrinter {
  enum Errors: Error {
    case invalidDate
  }
  
  func print(_ output: DateComponents, into input: inout Substring) throws {
    guard let date = Calendar.autoupdatingCurrent.date(from: output) else {
      throw Errors.invalidDate
    }
    
    let string = date.ISO8601Format()
    try string.print(into: &input)
  }
  
  var body: some Parser<Substring, DateComponents> {
    Parse { year, month, day, hour, minute, second, nanosecond, timeZone in
      DateComponents(
        timeZone: timeZone,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        nanosecond: nanosecond
      )
    } with: {
      Digits(4)
      "-".utf8
      Digits(2)
      "-".utf8
      Digits(2)
      "T".utf8
      Digits(2)
      ":".utf8
      Digits(2)
      ":".utf8
      Digits(2)
      Self.nanosecond
      Self.timeZone
    }
  }
  
  /// Parse a Substring into an Int of nanoseconds
  static var nanosecond: some Parser<Substring, Int?> {
    Optionally {
      Parse {
        ".".utf8
        Prefix(1...9, while: (UInt8(ascii: "0")...UInt8(ascii: "9")).contains)
          .compactMap { n in Int(Substring(n)).map { $0 * Int(pow(10, 9 - Double(n.count))) } }
      }
    }
  }
  
  /// Parse a Substring into a TimeZone
  ///
  /// Z or +12:00
  static var timeZone: some Parser<Substring.UTF8View, TimeZone> {
    Parse(input: Substring.UTF8View.self) {
      OneOf {
        "Z".utf8.map { 0 }
        offset
      }
      .compactMap { TimeZone(secondsFromGMT: $0) }
    }
  }
  
  /// Parse a Substring matching a UTC offset, into seconds
  ///
  /// ±12:00 = 43_200
  static var offset: some Parser<Substring.UTF8View, Int> {
    Parse(input: Substring.UTF8View.self) {
      OneOf {
        "+".utf8.map { 1 }
        "-".utf8.map { -1 }
      }
      Digits(2).map { $0 * 60 * 60 }
      ":".utf8
      Digits(2).map { $0 * 60 }
    }
    .map { $0 * ($1 + $2) }
  }
}
