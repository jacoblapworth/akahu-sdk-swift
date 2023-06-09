//
//  ClientTests.swift
//  
//
//  Created by Jacob Lapworth on 20/03/23.
//

import XCTest
import Foundation
import CustomDump
@testable import Akahu
import AkahuFixtures
import Dependencies

class ClientTests: XCTestCase {
  
  func testAppTokenValidation() {
    XCTAssertFalse(Akahu.Credentials.validateAppToken("123"))
    XCTAssertTrue(Akahu.Credentials.validateAppToken("app_token_123"))
  }
  
  func testUserTokenValidation() {
    XCTAssertFalse(Akahu.Credentials.validateUserToken("123"))
    XCTAssertTrue(Akahu.Credentials.validateUserToken("user_token_123"))
  }
  
  func testValidCredentials() throws {
    let credentials = try Akahu.Credentials(appToken: "app_token_123", userToken: "user_token_123")
    
    
    if #available(iOS 16.0, macOS 13.0, *) {
      XCTAssertThrowsError(try Akahu.Credentials(appToken: "123", userToken: "user_token_123")) { error in
        XCTAssertTrue(
          error is Akahu.Credentials.Errors,
          "Unexpected error type: \(type(of: error))"
        )
        
        XCTAssertNoDifference(
          .invalidAppToken("123"),
          error as? Akahu.Credentials.Errors
        )
        XCTAssertNoDifference(
          """
          Invalid appToken value: "123".
          `appToken` must be a string beginning with "app_token_"
          """,
          "\(error)"
        )
      }
    }
  }
  
  func testAuthenticatingUserRouter() throws {
    let credentials = try! Akahu.Credentials(appToken: "app_token_123", userToken: "user_token_123")
    let router = Akahu.shared.authenticateUserRouter(with: credentials)
    let request = try router.request(for: .me())
    
    XCTAssertEqual(request.value(forHTTPHeaderField: "Authorization"), "Bearer user_token_123")
    XCTAssertEqual(request.value(forHTTPHeaderField: "x-akahu-id"), "app_token_123")
  }
  
  func testAuthenticatingAppRouter() throws {
    let router = try Akahu.shared.authenticateAppRouter(appToken: "app_token_123", appSecret: "app_secret_123")
//    let request = try router.request(for: .webhooks(.events(status: .sent, options: .init())))
    let request = try router.request(for: .me())
    
    XCTAssertEqual(request.value(forHTTPHeaderField: "Authorization"), "Basic YXBwX3Rva2VuXzEyMzphcHBfc2VjcmV0XzEyMw==")
  }
}
