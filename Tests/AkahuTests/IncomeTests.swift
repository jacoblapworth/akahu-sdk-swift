//
//  IncomeTests.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import XCTest
import Foundation
@testable import Akahu
import AkahuFixtures

class IncomeTests: XCTestCase {
  func testDecoding() throws {
    let url = AkahuFixtures.Responses.income.fileUrl
    let income = try IncomesResponse(fromURL: url)
    
    XCTAssertEqual(income.success, true)
    XCTAssertEqual(income.items.first?.type, .salary)
  }
}
