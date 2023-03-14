//
//  IdentityTests.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import XCTest
import Foundation
@testable import Akahu
import AkahuFixtures

class IdentityTests: XCTestCase {
  func testDecoding() throws {
    let url = AkahuFixtures.Responses.identity.fileUrl
    let identity = try IdentityResponse(fromURL: url)
    
    XCTAssertEqual(identity.success, true)
    XCTAssertEqual(identity.item.status, .processing)
  }
}
