//
//  DateTime.swift
//  
//
//  Created by Jacob Lapworth on 29/03/23.
//

import Foundation
import Parsing

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
      Optionally {
        ".".utf8
        Prefix(1...9, while: (UInt8(ascii: "0")...UInt8(ascii: "9")).contains)
          .compactMap { n in Int(Substring(n)).map { $0 * Int(pow(10, 9 - Double(n.count))) } }
      }
      OneOf {
        "Z".utf8.map { 0 }
        Parse {
          OneOf {
            "+".utf8.map { 1 }
            "-".utf8.map { -1 }
          }
          Digits(2).map { $0 * 60 }
          ":".utf8
          Digits(2)
        }
        .map { $0 * ($1 + $2) }
      }
      .map { TimeZone(secondsFromGMT: $0) }
    }
  }
}

//struct DateTime1: ParserPrinter {
//  var body: some ParserPrinter<Substring, DateComponents> {
//    ParsePrint {
//      Digits(4)
//      "-".utf8
//      Digits(2)
//      "-".utf8
//      Digits(2)
//      "T".utf8
//      Digits(2)
//      ":".utf8
//      Digits(2)
//      ":".utf8
//      Digits(2)
//      Optionally {
//        ".".utf8
//        Prefix(1...9, while: (UInt8(ascii: "0")...UInt8(ascii: "9")).contains)
//          .compactMap { n in Int(Substring(n)).map { $0 * Int(pow(10, 9 - Double(n.count))) } }
//      }
//      OneOf {
//        "Z".utf8.map { 0 }
//        Parse {
//          OneOf {
//            "+".utf8.map { 1 }
//            "-".utf8.map { -1 }
//          }
//          Digits(2).map { $0 * 60 }
//          ":".utf8
//          Digits(2)
//        }
//        .map { $0 * ($1 + $2) }
//      }
//      .map { TimeZone(secondsFromGMT: $0) }
//    }.map(.memberwise({ year, month, day, hour, minute, second, nanosecond, timeZone in
//      DateComponents(
//        timeZone: timeZone,
//        year: year,
//        month: month,
//        day: day,
//        hour: hour,
//        minute: minute,
//        second: second,
//        nanosecond: nanosecond
//      )
//    }))
//  }
//}


