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
    XCTAssertNoDifference(
      "https://api.akahu.io/v1/transactions/123abc",
      string
    )
  }
  
  func testPrintedRouteWithDate() {
    let end = Date(timeIntervalSinceReferenceDate: 1234567890)
    let start = Calendar.current.date(byAdding: .day, value: -30, to: end)!
    let string = enduringEndpoints.url(for: .transactions(.all(query: .init(start: start, end: end), cursor: .init(cursor: "123")))).absoluteString
    XCTAssertNoDifference(
      "https://api.akahu.io/v1/transactions?start=2040-01-15T23:31:30Z&end=2040-02-14T23:31:30Z&cursor=123",
      string
    )
  }
  
  func testParsingRouteWithID() throws {
    let result = try akahuRouter.match(path: "/v1/transactions/123456")
    
    if case let AkahuRoute.transactions(.transaction(id, _)) = result {
      XCTAssertNoDifference("123456", id)
    } else {
      XCTFail()
    }
  }
  
  func testParsingRouteWithDate() throws {
    let route = try akahuRouter.match(path: "/v1/transactions?start=2040-01-15T23:31:30Z")
    let expected = AkahuRoute.transactions(.all(query: .init(start: Date(timeIntervalSince1970: 2210283090))))
    XCTAssertNoDifference(route, expected)
    
    guard case let AkahuRoute.transactions(.all(query, _)) = route else {
      return XCTFail()
    }
    XCTAssertNoDifference(
      "2040-01-15T23:31:30Z",
      query.start?.ISO8601Format()
    )
  }
  
  func testAkahuRouterParsing() throws {
    let route = try akahuRouter.match(path: "/v1/accounts")
    XCTAssertNoDifference(AkahuRoute.accounts(), route)
  }
  
  func testAkahuRouterPrinting() {
    let string = akahuRouter.url(for: .accounts()).absoluteString
    XCTAssertNoDifference("https://api.akahu.io/v1/accounts", string)
  }
  
  func testPaginationParser() throws {
    let cursor = try AkahuRoute.PaginationQuery.Parser().match(path: "https://api.akahu.io/v1/transactions?start=2040-01-15T23:31:30Z&end=2040-02-14T23:31:30Z&cursor=abc123")
    XCTAssertNoDifference(
      AkahuRoute.PaginationQuery(cursor: "abc123"),
      cursor
    )
    
    let request = try AkahuRoute.PaginationQuery.Parser().request(for: cursor)
    XCTAssertNoDifference(
      "/?cursor=abc123",
      request.url?.absoluteString
    )
  }
}
