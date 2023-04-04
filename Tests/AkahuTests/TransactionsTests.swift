//
//  TransactionsTests.swift
//  
//
//  Created by Jacob Lapworth on 4/10/22.
//

import XCTest
import Foundation
@testable import Akahu
import AkahuFixtures
import CustomDump

class TransactionTests: XCTestCase {
  func testDecoding() throws {
    let url = AkahuFixtures.Responses.transactions.fileUrl
    XCTAssertNoThrow(try TransactionsResponse(fromURL: url))
  }
  
  func testmock() throws {
    let response = TransactionsResponse.mock
    XCTAssertEqual(response.success, true)
    XCTAssertEqual(response.items.count, 100)
    XCTAssertEqual(response.items.first?.amount, -1000.0)
  }
  
  func testCodableEnumWithUnknown() throws {
    let data = #""❌""#.data(using: .utf8)!
    let value = try JSONDecoder().decode(AkahuTransaction.TransactionType.self, from: data)
    XCTAssertNoDifference(value, .unknown("❌"))
  }
}
