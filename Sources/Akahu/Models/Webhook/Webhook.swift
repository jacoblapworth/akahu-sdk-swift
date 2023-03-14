//
//  Webhook.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

public struct AkahuWebhook: Codable, Identifiable {
  /// Unique Akahu webhook identifier.
  public var id: String
  /// ISO 8601 formatted timestamp that the webhook was created.
  public var createdAt: Date
  /// ISO 8601 formatted timestamp that the webhook was last updated.
  public var updatedAt: Date
  /// ISO 8601 formatted timestamp of the last time your webhook endpoint was sent a webhook event.
  public var lastCalledAt: Date
  /// Stored state upon creating a webhook and is made available on the webhook event allowing you to verify the event.
  ///
  /// **Tip:** can be used to store a unique identifier related to your end user allowing you to determine on an arrival of a webhook event which user of your application needs to be updated or notified.
  public var state: String
  /// Endpoint to send registered webhook events to.
  public var url: URL
  
  enum CodingKeys: String, CodingKey {
    case id = "_id"
    case createdAt, updatedAt, lastCalledAt, state, url
  }
}
