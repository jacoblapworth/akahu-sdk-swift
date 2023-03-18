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
import AkahuFixtures


final class RouterTests: XCTestCase {

//  func testAPIcallItems() async throws {
//    let mockApi = URLRoutingClient<AkahuRoute>.failing.override(AkahuRoute.transactions()) {
//      try .ok(TransactionsResponse.mock)
//    }
//    
//    let (value, _) = try await mockApi.decodedResponse(
//      for: .transactions(.all()),
//      as: AkahuItemsResponse<AkahuTransaction>.self
//    )
//    
//    XCTAssertTrue(value.success)
//    XCTAssertEqual(value.items.count, 100)
//  }
  
  
  func testPrintedRoute() {
    let string = akahuRouter.url(for: .transactions(.transaction(id: "123abc"))).absoluteString
    XCTAssertEqual("https://api.akahu.io/v1/transactions/123abc", string)
  }
  
  func testPrintedRouteWithDate() {
    let end = Date(timeIntervalSinceReferenceDate: 1234567890)
    let start = Calendar.current.date(byAdding: .day, value: -30, to: end)!
    let string = enduringEndpoints.url(for: .transactions(.all(query: .init(start: start, end: end), cursor: .init(cursor: "123")))).absoluteString
    XCTAssertEqual( "https://api.akahu.io/v1/transactions?start=2040-01-15T23:31:30Z&end=2040-02-14T23:31:30Z&cursor=123", string)
  }
  
  func testParsingRouteWithID() throws {
    let result = try akahuRouter.match(path: "/v1/transactions/123456")
    
    if case let AkahuRoute.transactions(.transaction(id, _)) = result {
      XCTAssertEqual("123456", id)
    } else {
      XCTFail()
    }
  }
  
  func testParsingRouteWithDate() throws {
    let route = try akahuRouter.match(path: "/v1/transactions?start=2040-01-15T23:31:30Z")
    let expected = AkahuRoute.transactions(.all(query: .init(start: try! Date("2040-01-15T23:31:30Z", strategy: .iso8601))))
    XCTAssertNoDifference(route, expected)
    
    guard case let AkahuRoute.transactions(.all(query, _)) = route else {
      return XCTFail()
    }
    XCTAssertEqual(query.start?.ISO8601Format(), "2040-01-15T23:31:30Z")
  }
  
  func testAkahuRouterParsing() throws {
    let route = try akahuRouter.match(path: "/v1/accounts")
    XCTAssertNoDifference(route, AkahuRoute.accounts())
  }
  
  func testAkahuRouterPrinting() {
    let string = akahuRouter.url(for: .accounts()).absoluteString
    XCTAssertEqual(string, "https://api.akahu.io/v1/accounts")
  }
  
  func testPaginationParser() throws {
    let match = try AkahuRoute.PaginationQuery.parser.match(path: "https://api.akahu.io/v1/transactions?start=2040-01-15T23:31:30Z&end=2040-02-14T23:31:30Z&cursor=123")
    XCTAssertNoDifference(match.cursor, "123")
    
    let request = try AkahuRoute.PaginationQuery.parser.request(for: match)
    XCTAssertNoDifference(request.url?.absoluteString, "/?cursor=123")
  }
}
