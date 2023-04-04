//
//  PaymentTests.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import XCTest
import Foundation
@testable import Akahu
import AkahuFixtures

class PaymentTests: XCTestCase {
  func testDecoding() throws {
    let url = AkahuFixtures.Responses.payments.fileUrl
    let payments = try PaymentsResponse(fromURL: url)
    
    XCTAssertEqual(payments.success, true)
    XCTAssertEqual(payments.items.count, 1)
    XCTAssertEqual(payments.items.first?.status, .ready)
  }
}
