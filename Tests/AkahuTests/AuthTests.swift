//
//  AuthTests.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import XCTest
import Foundation
import CustomDump
@testable import Akahu
import AkahuFixtures
import Dependencies

class AuthTests: XCTestCase {
  
  func testAuthRoutePrinting() throws {
    let params = AkahuRoute.Auth.TokenParams(
      code: "code",
      redirectUri: "http://localhost:3000/redirect",
      clientId: "<<appToken>>",
      clientSecret: "<<appSecret>>"
    )
    
    let request = try akahuRouter.print(.auth(.exchange(params)))
    
    XCTAssertNoDifference(
      "POST",
      request.method
    )
    XCTAssertNoDifference(
      ["v1","token"],
      request.path
    )
    XCTAssertNoDifference(
#"""
{
  "code" : "code",
  "client_id" : "<<appToken>>",
  "redirect_uri" : "http:\/\/localhost:3000\/redirect",
  "client_secret" : "<<appSecret>>",
  "grant_type" : "authorization_code"
}
"""#,
String(data: request.body!, encoding: .utf8)!
    )
  }
  
  func testAuthorizationUrl() throws {
    let request = try withDependencies {
      $0.uuid = .incrementing
    } operation: {
      @Dependency(\.uuid) var uuid
      let options = AkahuRoute.Auth.AuthorizationParams(
        redirectUri: "http://localhost:3000",
        scope: [.enduringConsent,.akahu],
        clientId: "123",
        state: uuid().uuidString
      )
      
      return try Akahu.router.request(for: .auth(.authorize(options)))
    }
    
    XCTAssertNoDifference(
      "https://oauth.akahu.io/?redirect_uri=http://localhost:3000&scope=ENDURING_CONSENT%20AKAHU&client_id=123&state=00000000-0000-0000-0000-000000000000",
      request.url?.absoluteString
    )
  }
  
  func testAuthScopeParser() throws {
    let parser = AkahuAuth.EnduringConsentScope.parser(of: Substring.UTF8View.self)
    let scope = try parser.parse("IDENTITY_TAX_NUMBERS")
    XCTAssertNoDifference(scope, .identityTaxNumbers)
    
    let scopes = try AkahuRoute.Auth.ScopesParser().parse("ENDURING_CONSENT AKAHU IDENTITY_NAMES")
    XCTAssertNoDifference([
        .enduringConsent,
        .akahu,
        .identityNames
      ],
      scopes
    )
  }
  
  func testAuthScopePrinter() throws {
    let scopes = try AkahuRoute.Auth.ScopesParser().print([
      .enduringConsent,
      .akahu,
      .identityNames
    ])
    
    XCTAssertNoDifference("ENDURING_CONSENT AKAHU IDENTITY_NAMES", String(scopes))
  }
}
