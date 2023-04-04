//
//  ConnectionTests.swift
//  
//
//  Created by Jacob Lapworth on 15/03/23.
//

import XCTest
import Foundation
@testable import Akahu
import AkahuFixtures

class ConnectionTests: XCTestCase {
  func testDecoding() throws {
    let url = AkahuFixtures.Responses.connections.fileUrl
    let connections = try ConnectionsResponse(fromURL: url)
    
    XCTAssertEqual(connections.success, true)
    XCTAssertEqual(connections.items.count, 1)
    XCTAssertEqual(connections.items.first?.bank, .kiwibank)
  }
}
