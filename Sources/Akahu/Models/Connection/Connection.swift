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
public struct AkahuConnection: Codable, Identifiable, Hashable {
  /// A unique identifier for this institution, prefixed by conn_.
  public let id: String
  /// The name of the institution.
  public let name: String
  /// Image of the institution's logo.
  public let logo: URL
  /// The institution's website.
  public let url: URL? = nil
  /// Mapping of the connection ID to known financial insitutions.
  public var bank: BankConnection? {
    BankConnection(rawValue: self.id)
  }
  
  enum CodingKeys: String, CodingKey {
    case id = "_id"
    case name, logo, url
  }
}

extension AkahuConnection: Equatable {
  
}
