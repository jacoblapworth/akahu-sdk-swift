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
    case all
    case key(id: String)
    case events(status: AkahuWebhook.Event.Status, options: DateRangeQueryParams)
    case webhook(Webhook)
    
    public enum Webhook: Equatable {
      case subscribe(WebhookSubcribeParams)
      case unsubscribe(id: String)
    }
  }
}

public struct WebhookSubcribeParams: Codable, Equatable {
//  public var type: AkahuWebhook.WebhookType
  public var state: String
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
          Body(.json(WebhookSubcribeParams.self))
        }
        Route(.case(AkahuRoute.Webhooks.Webhook.unsubscribe)) {
          Method.delete
          Path { Parse(.string) }
        }
      }
    }
    
    Route(.case(AkahuRoute.Webhooks.events)) {
      Path { "webhook-events" }
      webhookStatusParser
      dateRangeParser
    }
  }
}

internal let webhookStatusParser = Query {
  Field("status") { AkahuWebhook.Event.Status.parser(of: Substring.self) }
}
