//
//  Connection.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

public struct AkahuConnection: Codable {
  public let id: String
  public let name: String
  public let logo: URL
  
  enum CodingKeys: String, CodingKey {
    case id = "_id"
    case name, logo
  }
}
