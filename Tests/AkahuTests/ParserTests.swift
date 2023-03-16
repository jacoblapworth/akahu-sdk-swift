//
//  ParserTests.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import XCTest
import CustomDump
import Foundation
@testable import Akahu

class ParserTests: XCTestCase {
  func testAuthScopeParser() throws {
    let parser = EnduringConsentScope.parser(of: Substring.self)
    let scope = try parser.parse("IDENTITY_TAX_NUMBERS")
    XCTAssertNoDifference(scope, .identityTaxNumbers)
    
    let scopes = try scopesParser.parse("ENDURING_CONSENT AKAHU IDENTITY_NAMES")
    XCTAssertNoDifference(scopes, [
      .enduringConsent,
      .akahu,
      .identityNames
    ])
  }
  
  func testAuthScopePrinter() throws {
    let scopes = try scopesParser.print([
      .enduringConsent,
      .akahu,
      .identityNames
    ])
    
    XCTAssertNoDifference(scopes, "ENDURING_CONSENT AKAHU IDENTITY_NAMES")
  }
}
