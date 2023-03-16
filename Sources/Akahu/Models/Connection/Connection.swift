//
//  Connection.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

/// The connection to a 3rd party integration
///
/// The bank integrations are generally stable and consistent in terms of functionality.
/// Non-bank integrations are more variable because these institutions tend to offer differing functionality in their consumer apps.
/// [Supported integrations](https://developers.akahu.nz/docs/integrations#supported-integrations)
public struct Connection: Codable, Identifiable {
  public let id: String
  public let name: String
  public let logo: URL
  public var bank: BankConnection? {
    BankConnection(rawValue: self.id)
  }
  
  enum CodingKeys: String, CodingKey {
    case id = "_id"
    case name, logo
  }
}
