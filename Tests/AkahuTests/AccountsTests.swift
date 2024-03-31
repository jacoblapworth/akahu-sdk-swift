//
//  Account.swift
//  CashTests
//
//  Created by Jacob Lapworth on 2/10/22.
//

import XCTest
import Foundation
@testable import Akahu
import AkahuFixtures

class AccountTests: XCTestCase {
  func testDecoding() throws {
    let url = AkahuFixtures.Responses.accounts.fileUrl
    let accounts: AccountsResponse = try AccountsResponse(fromURL: url)
    
    XCTAssertEqual(accounts.success, true)
    XCTAssertEqual(accounts.items.first?.type, .checking)
    XCTAssertEqual(accounts.items.count, 13)
  }
}
