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
    let parser = AkahuAuth.EnduringConsentScope.parser(of: Substring.self)
    let scope = try parser.parse("IDENTITY_TAX_NUMBERS")
    XCTAssertNoDifference(scope, .identityTaxNumbers)
    
    let scopes = try AkahuRoute.Auth.scopesParser.parse("ENDURING_CONSENT AKAHU IDENTITY_NAMES")
    XCTAssertNoDifference(scopes, [
      .enduringConsent,
      .akahu,
      .identityNames
    ])
  }
  
  func testAuthScopePrinter() throws {
    let scopes = try AkahuRoute.Auth.scopesParser.print([
      .enduringConsent,
      .akahu,
      .identityNames
    ])
    
    XCTAssertNoDifference(scopes, "ENDURING_CONSENT AKAHU IDENTITY_NAMES")
  }
}
