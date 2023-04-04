//
//  TransactionsPending.swift
//  
//
//  Created by Jacob Lapworth on 9/02/23.
//

import XCTest
import Foundation
@testable import Akahu
import AkahuFixtures

class TransactionPendingTests: XCTestCase {
  func testDecoding() throws {
    let url = AkahuFixtures.Responses.transactionsPending.fileUrl
    let transactions = try TransactionsPendingResponse(fromURL: url)
    
    XCTAssertEqual(transactions.success, true)
    XCTAssertEqual(transactions.items.count, 7)
    XCTAssertEqual(transactions.items.first?.amount, -11.5)
  }
}
