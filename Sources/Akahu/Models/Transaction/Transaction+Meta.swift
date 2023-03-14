//
//  Meta.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

extension AkahuTransaction {
  /// This is other metadata that we extract from the transaction, including the following fields (where possible). All of the meta fields are optional:
  public struct Meta: Codable {
    public var particulars: String? = nil
    public var code: String? = nil
    public var reference: String? = nil
    public var logo: String? = nil
    public var conversion: Conversion? = nil
    public var otherAccount: String? = nil
    
    public struct Conversion: Codable {
      public let currency: String
      public let amount: Double
      public let rate: Double
      public let fee: Double?
    }

  }

}

extension AkahuTransaction.Meta {
  public static var mock = AkahuTransaction.Meta()
}
