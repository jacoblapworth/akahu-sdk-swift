//
//  Identity+Source.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

extension AkahuIdentity {
  /// The source that provided this data. This is supplied as an object with the following keys:
  public struct Source: Codable {
    /// The connected financial institution's unique identifier. This will always be prefixed with conn_.
    public var id: String
    /// Display name for the connected institution.
    public var name: String
    /// Url of the institution's website
    public var url: URL
    /// Url of institution's logo
    public var logo: URL
    
    enum CodingKeys: String, CodingKey {
      case id = "_id"
      case name, url, logo
    }
  }
}
