//
//  Router+Webhooks.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public enum Webhooks: Equatable {
    /// Gets the active webhook subscriptions that your app has created for the user.
    case all
    /// Get one of the public keys that Akahu uses to sign webhooks.
    /// - Parameter id: An Akahu webhook signing key ID
    case key(id: String)
    /// Returns a list of webhook events that have been published to your application by Akahu within the `start` and `end` time range.
    case events(status: AkahuWebhook.Event.Status, options: DateRangeQuery = .init())
    /// Subscribe and unsubscribe to a webhook for the user
    case webhook(Webhook)
    
    public enum Webhook: Equatable {
      /// Register a new webhook subscription for the user, allowing your application to receive events for ``AkahuWebhook.WebhookType``
      case subscribe(SubcribeParams)
      /// Delete a webhook subscription that your application has previously created for the user.
      /// - Parameter id: An Akahu Webhook ID
      case unsubscribe(id: String)
      
      public struct SubcribeParams: Codable, Equatable {
        /// Which types of events you want to receive webhooks for.
        public var type: AkahuWebhook.WebhookType
        /// State that will be returned with the webhook payload.
        ///
        /// It is a good idea to use the `state` field to store a unique identifier related to your end user,
        /// allowing you to determine on an arrival of a webhook event which user of your application needs to be updated or notified.
        public var state: String
      }
    }
    
    internal static let statusParser = Query {
      Field("status") { AkahuWebhook.Event.Status.parser() }
    }
  }
}


internal let webhooksRoute = Route(.case(AkahuRoute.webhooks)) {
  OneOf {
    Route(.case(AkahuRoute.Webhooks.all)) {
      Path { "webhooks" }
    }
    
    Route(.case(AkahuRoute.Webhooks.key)) {
      Path { "keys" }
      Path { Parse(.string) }
    }
    
    Route(.case(AkahuRoute.Webhooks.webhook)) {
      Path { "webhooks" }
      OneOf {
        Route(.case(AkahuRoute.Webhooks.Webhook.subscribe)) {
          Method.post
          Body(.json(AkahuRoute.Webhooks.Webhook.SubcribeParams.self))
        }
        Route(.case(AkahuRoute.Webhooks.Webhook.unsubscribe)) {
          Method.delete
          Path { Parse(.string) }
        }
      }
    }
    
    Route(.case(AkahuRoute.Webhooks.events)) {
      Path { "webhook-events" }
      AkahuRoute.Webhooks.statusParser
      AkahuRoute.DateRangeQuery.Parser()
    }
  }
}

