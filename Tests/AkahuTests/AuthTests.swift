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

class AuthTests: XCTestCase {
  
  func testAuthRoutePrinting() throws {
    let params = AuthParameters(
      code: "code",
      redirectUri: "http://localhost:3000/redirect",
      clientId: "<<appToken>>",
      clientSecret: "<<appSecret>>"
    )
    let request = try akahuRouter.print(.auth(.exchange(params)))
    
    XCTAssertNoDifference(request.method, "POST")
    XCTAssertNoDifference(request.path, ["v1","token"])
  }
}
