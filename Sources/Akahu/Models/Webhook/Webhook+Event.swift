//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 15/03/23.
//

import Foundation

protocol WebhookEvent {
  var type: AkahuWebhook.WebhookType { get }
  var code: String { get }
  var state: String  { get }
}

extension AkahuWebhook {
  public struct Event {
    /// Unique Akahu webhook event identifier.
    public var id: String
    /// Unique Akahu webhook identifier.
    public var hook: String
    /// Webhook event state
    public var status: Status
    /// ISO 8601 formatted timestamp that the webhook event was created.
    public var createdAt: Date
    /// ISO 8601 formatted timestamp that the webhook event was last updated.
    public var updatedAt: Date
    /// ISO 8601 formatted timestamp that the webhook event last failed.
    public var lastFailedAt: Date
    /// payload / event body sent to the _hook
    public var payload: Payload
    
    enum CodingKeys: String, CodingKey {
      case id = "_id"
      case hook
      case status
      case createdAt
      case updatedAt
      case lastFailedAt
      case payload
    }
    
    public enum Status: String, CaseIterable, Codable {
      /// Webhook has been sent and has been confirmed with a 200 response from the receiver.
      case sent = "SENT"
      /// Webhook has failed to send in a previous attempt but it will be retried.
      case failed = "FAILED"
      /// Webhook has failed to send after attempted retries, due to not receiving a 200 response from the receiver.
      case retry = "RETRY"
    }
    
    public struct Payload: Codable {
      public var success: Bool
      /// Resource the webhook event is related to for more details checkout the [Webhooks reference](https://developers.akahu.nz/docs/reference-webhooks)
      public var type: WebhookType
      /// Webhook action dependant on the `webhook_type` for more details on our provided webhooks checkout the [Webhooks reference](https://developers.akahu.nz/docs/reference-webhooks)
      public var code: String
      
      enum CodingKeys: String, CodingKey {
        case success
        case type = "webhook_type"
        case code = "webhook_code"
      }
      
      public enum Code: String, Codable {
        case create = "CREATE"
        case update = "UPDATE"
        case delete = "DELETE"
        /// This webhook has been cancelled, for example if the user revokes your app.
        case cancelled = "WEBHOOK_CANCELLED"
        
        case initialUpdate = "INITIAL_UPDATE"
        case defaultUpdate = "DEFAULT_UPDATE"
      
      }
    }
    
    
  }
}
