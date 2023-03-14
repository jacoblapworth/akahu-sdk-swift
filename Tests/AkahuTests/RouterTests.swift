//
//  Router.swift
//  
//
//  Created by Jacob Lapworth on 8/02/23.
//

import XCTest
import Foundation
import URLRouting
import CustomDump
@testable import Akahu


final class RouterTests: XCTestCase {
//  func testLiveAPIcall() async throws {
//    let (value, _) = try await akahuApi.decodedResponse(
//      for: .transactions(.transaction(id: "trans_cldv6ar7609qa08lb3xh53p2u")),
//      as: AkahuItemResponse<AkahuTransaction>.self
//    )
//
//    XCTAssertTrue(value.success)
//  }
//
//  func testLiveAPIcallItems() async throws {
//    let (value, _) = try await akahuApi.decodedResponse(
//      for: .transactions(.all(options: PaginatedDateRangeOptions(start: Date.init(timeIntervalSinceNow: -60*60*24*30), end: Date.now))),
//      as: AkahuItemsResponse<AkahuTransaction>.self
//    )
//
//    XCTAssertTrue(value.success)
//  }
  
//  func testEnumDecoding() async throws {
//    let (value) = try await akahuApi.decodedResponse(
//      for: .transactions(.all()),
//      as: AkahuSuccessResponse.items(AkahuItemsResponse<AkahuTransaction>)
//      
//    )
//  }
  
  func testPrintedRoute() {
    let string = baseRouter.url(for: .transactions(.transaction(id: "123abc"))).absoluteString
    XCTAssertEqual(string, "/transactions/123abc")
  }
  
  func testPrintedRouteWithDate() {
    let end = Date(timeIntervalSinceReferenceDate: 1234567890)
    let start = Calendar.current.date(byAdding: .day, value: -30, to: end)!
    let string = baseRouter.url(for: .transactions(.all(options: .init(start: start, end: end, cursor: "123")))).absoluteString
    XCTAssertEqual(string, "/transactions?start=2040-01-15T23:31:30Z&end=2040-02-14T23:31:30Z&cursor=123")
  }
  
  func testParsingRouteWithID() {
    let result = try! baseRouter.match(path: "/transactions/123456")
    
    if case let AkahuRoute.transactions(.transaction(id, _)) = result {
      XCTAssertEqual(id, "123456")
    } else {
      XCTFail()
    }
  }
  
  func testParsingRouteWithDate() {
    let route = try! baseRouter.match(path: "/transactions?start=2040-01-15T23:31:30Z")
    let expected = AkahuRoute.transactions(.all(options: .init(start: try! Date("2040-01-15T23:31:30Z", strategy: .iso8601))))
    XCTAssertNoDifference(route, expected)
    
    guard case let AkahuRoute.transactions(.all(options)) = route else {
      return XCTFail()
    }
    XCTAssertEqual(options.start?.ISO8601Format(), "2040-01-15T23:31:30Z")
  }
  
  func testAkahuRouterParsing() {
    let route = try! akahuRouter.parse(URLRequestData(string: "/accounts")!)
    
    guard case AkahuRoute.accounts = route else {
      return XCTFail()
    }
  }
  
  func testAkahuRouterPrinting() {
    let string = akahuRouter.url(for: .accounts()).absoluteString
    XCTAssertEqual(string, "https://api.akahu.io/v1/accounts")
  }
}
