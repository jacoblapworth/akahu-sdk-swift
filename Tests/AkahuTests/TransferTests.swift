//
//  TransferTests.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import XCTest
import Foundation
@testable import Akahu
import AkahuFixtures

class TransferTests: XCTestCase {
  func testDecoding() throws {
    let url = AkahuFixtures.Responses.transfers.fileUrl
    let transfers = try TransfersResponse(fromURL: url)
    
    XCTAssertEqual(transfers.success, true)
    XCTAssertEqual(transfers.items.first?.status, .ready)
  }
}
