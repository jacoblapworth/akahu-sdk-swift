//
//  Merchant.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation


extension AkahuTransaction {
  
  /// Akahu defines a merchant as the business who was party to this transaction. For example, "The Warehouse" is a merchant.
  public struct Merchant: Codable {
    /// The Akahu Merchant ID
    public let id: String
    /// The Akahu Merchant name
    public let name: String
    /// The Akahu Merchant website
    public var website: String? = nil
    public var businessNumber: BusinessNumber? = nil
    
    enum CodingKeys: String, CodingKey {
      case id = "_id"
      case name, website, businessNumber
    }
    
    public struct BusinessNumber: Codable {
      public let type: String
      public let value: String
    }
    
    public static var mock: Self = .init(id: "merchant_1111111111111111111111111", name: "MerchantMock", website: "https://google.com")
  }
}
