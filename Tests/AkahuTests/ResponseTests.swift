//
//  ResponseTests.swift
//  
//
//  Created by Jacob Lapworth on 27/02/23.
//

import XCTest
import Foundation
import CustomDump
@testable import Akahu
import AkahuFixtures

class ResponseTests: XCTestCase {
  func testErrorResponse() throws {
    let data = AkahuFixtures.Responses.error.data
    let response = try AkahuJSONDecoder().decode(AkahuResult<AkahuAccount>.self, from: data)
    
    switch response {
    case .success: return XCTFail()
    case let .error(response):
      XCTAssertEqual(response.message, "Server error")
    }
    
    XCTAssertEqual(response.error, "Server error")
    XCTAssertNil(response.success)
  }
  
  func testSuccessResponse() throws {
    let data = AkahuFixtures.Responses.accounts.data
    let response = try AkahuJSONDecoder().decode(AkahuResult<Akahu.Account>.self, from: data)
    
    switch response {
    case .success(let value):
      guard case let .items(items, _) = value else { return XCTFail("No items in response") }
      XCTAssertEqual(items.count, 18)
    case .error: return XCTFail("Response has error")
    }
    
    XCTAssertNil(response.error)
    XCTAssertEqual(response.success?.items?.count, 18)
  }
  
  func testIdResponse() throws {
    let response = try AkahuJSONDecoder().decode(AkahuResult<Akahu.Account>.self, from: AkahuFixtures.Responses.id.data)
    XCTAssertEqual(response.itemId, "1234567890")
    XCTAssertNil(response.item)
    XCTAssertNil(response.items)
  }
  
  func testItemResponse() throws {
    let response = try AkahuJSONDecoder().decode(AkahuResult<Akahu.Account>.self, from: AkahuFixtures.Responses.account.data)
    XCTAssertNotNil(response.item)
    XCTAssertNil(response.items)
    XCTAssertNil(response.itemId)
  }
  
  func testItemsResponse() throws {
    let data = AkahuFixtures.Responses.transactions.data
    let response = try AkahuJSONDecoder().decode(AkahuResult<Akahu.Transaction>.self, from: data)
    
    XCTAssertEqual(response.items?.count, 100)
    XCTAssertNoDifference(
      Cursor(next: "kJjGz685busNHmA1_8k_WgvMS8k6o1ckoMhGBNyqh1eMYZvlLj5Tg5WE04AsexDnCXfF8CHG1mAMMykyPy-8XIVa_x9-1wch3F1NAnpFqgZMM_rtEWPUQvlCS1mIN5-r"),
      response.cursor
    )
    XCTAssertNil(response.item)
    XCTAssertNil(response.itemId)
  }
}
