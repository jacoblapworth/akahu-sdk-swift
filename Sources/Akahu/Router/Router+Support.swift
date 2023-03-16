//
//  Router+Support.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting


extension AkahuRoute {
  public enum Support: Equatable {
    case transaction(id: String, TransactionSupportType)
  }
}

internal let supportRoute = Route(.case(AkahuRoute.support)) {
  Path { "support" }
  supportRouter
}

internal let supportRouter = OneOf {
  Route(.case(AkahuRoute.Support.transaction)) {
    Method.post
    Path { Parse(.string) }
    Body(.json(TransactionSupportType.self))
  }
}

public enum TransactionSupportType: Codable, Equatable {
  /// Let Akahu know that two Akahu transactions are actually the same transaction in the bank.
  /// - Parameter id: The duplicate transaction ID.
  case duplicate(id: String)
  /// Let Akahu know when they get something wrong.
  /// - Parameter fields: A list of dot-separated paths to the incorrect values e.g. `["merchant.name"]`
  /// - Parameter comment: Additional info you want to include.
  case enrichmentError(fields: [String], comment: String)
  /// Let Akahu know about further enrichment that can be applied to this transaction in the bank.
  /// - Parameter comment: The enrichment information you want to tell us about.
  case enrichmentSuggestion(comment: String)
  
  public var rawValue: String {
    switch self {
    case .duplicate: return "DUPLICATE"
    case .enrichmentError: return "ENRICHMENT_ERROR"
    case .enrichmentSuggestion: return "ENRICHMENT_SUGGESTION"
    }
  }
  
  enum CodingKeys: CodingKey {
    case type
    case id
    case fields
    case comment
  }

  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    let type = try container.decode(String.self, forKey: .type)
    let id = try container.decodeIfPresent(String.self, forKey: .id)
    let fields = try container.decodeIfPresent([String].self, forKey: .fields)
    let comment = try container.decodeIfPresent(String.self, forKey: .comment)
    
    switch type {
    case "DUPLICATE":
      guard let id else {
        throw DecodingError.keyNotFound(CodingKeys.id, .init(
          codingPath: decoder.codingPath,
          debugDescription: "No `id` found for duplicate"))
      }
      self = .duplicate(id: id)
    case "ENRICHMENT_ERROR":
      guard let fields else {
        throw DecodingError.keyNotFound(CodingKeys.fields, .init(
          codingPath: decoder.codingPath,
          debugDescription: "No `fields` found for error"))
      }
      guard let comment else {
        throw DecodingError.keyNotFound(CodingKeys.comment, .init(
          codingPath: decoder.codingPath,
          debugDescription: "No `comment` found for error"))
      }
      self = .enrichmentError(fields: fields, comment: comment)
    case "ENRICHMENT_SUGGESTION":
      guard let comment else {
        throw DecodingError.keyNotFound(CodingKeys.comment, .init(
          codingPath: decoder.codingPath,
          debugDescription: "No `comment` found for suggestion"))
      }
      self = .enrichmentSuggestion(comment: comment)
    default: throw DecodingError.keyNotFound(CodingKeys.type, .init(
      codingPath: decoder.codingPath,
      debugDescription: "Invalid support `type`: \(type)"))
    }
  }
  
  public func encode(to encoder: Encoder) throws {
    var container = encoder.container(keyedBy: CodingKeys.self)
    try container.encode(self.rawValue, forKey: .type)
    switch self {
    case .duplicate(let id):
      try container.encode(id, forKey: .id)
    case .enrichmentError(let fields, let comment):
      try container.encode(fields, forKey: .fields)
      fallthrough
    case .enrichmentSuggestion(let comment):
      try container.encode(comment, forKey: .comment)
    }
  }
}
