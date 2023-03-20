//
//  SupportTests.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import XCTest
import Foundation
import CustomDump
@testable import Akahu
import AkahuFixtures

class SupportTests: XCTestCase {
  
  func testSupportTransactionEncoding() throws {
    let encoder = newJSONEncoder()
    
    let duplicate = AkahuRoute.Support.TransactionSupportType.duplicate(id: "123")
    let error = AkahuRoute.Support.TransactionSupportType.enrichmentError(fields: ["merchant.name"], comment: "error")
    let suggestion = AkahuRoute.Support.TransactionSupportType.enrichmentSuggestion(comment: "suggestion")
    
    let duplicateData = try encoder.encode(duplicate)
    let duplicateString = String(data: duplicateData, encoding: .utf8)!
    let errorData = try encoder.encode(error)
    let errorString = String(data: errorData, encoding: .utf8)!
    let suggestionData = try encoder.encode(suggestion)
    let suggestionString = String(data: suggestionData, encoding: .utf8)!
    XCTAssertNoDifference(
      """
      {
        "type" : "DUPLICATE",
        "id" : "123"
      }
      """,
      duplicateString
    )
    XCTAssertNoDifference(
      #"""
      {
        "type" : "ENRICHMENT_ERROR",
        "comment" : "error",
        "fields" : [
          "merchant.name"
        ]
      }
      """#,
      errorString
    )
    XCTAssertNoDifference(
      #"""
      {
        "type" : "ENRICHMENT_SUGGESTION",
        "comment" : "suggestion"
      }
      """#,
      suggestionString
    )
  }
  
  func testSupportTransactionDecoding() throws {
    let decoder = newJSONDecoder()
    
    let duplicate = #"{"type":"DUPLICATE","id":"123"}"#
    let duplicateWithNoId = #"{"type":"DUPLICATE"}"#
    
    let duplicateResult = try decoder.decode(AkahuRoute.Support.TransactionSupportType.self, from: duplicate.data(using: .utf8)!)
    
    XCTAssertNoDifference(duplicateResult, .duplicate(id: "123"))
    
    XCTAssertThrowsError(try decoder.decode(AkahuRoute.Support.TransactionSupportType.self, from: duplicateWithNoId.data(using: .utf8)!)) {
      XCTAssertTrue($0 is DecodingError)
    }
  }
}
