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

class TransactionTests: XCTestCase {
  func testDecoding() throws {
    let url = AkahuFixtures.Responses.transactions.fileUrl
    let transactions: TransactionsResponse = try TransactionsResponse(fromURL: url)
    
    XCTAssertEqual(transactions.success, true)
    XCTAssertEqual(transactions.items.first?.amount, -1000.0)
  }
  
  func testmock() throws {
    let response = TransactionsResponse.mock
    
    XCTAssertEqual(response.success, true)
    XCTAssertEqual(response.items.first?.amount, -1000.0)
  }
  
  func testCodableEnumWithUnknown() throws {
    struct Container: Decodable {
      let type: AkahuTransaction.TransactionType
    }
    
    let data = #"{"type": "❌"}"#.data(using: .utf8)!
    let val = try JSONDecoder().decode(Container.self, from: data)
    XCTAssertEqual(val.type, .unknown("❌"))
  }
}
