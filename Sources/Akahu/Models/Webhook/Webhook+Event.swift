//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 15/03/23.
//

import Foundation

protocol WebhookEvent {
  var type: Webhook.WebhookType { get }
  var code: String { get }
  var state: String  { get }
}

extension Webhook {
  public struct Event {
    public var type: WebhookType
    public var code: String
    public var state: String
    
    enum CodingKeys: String, CodingKey {
      case type = "webhook_type"
      case code = "webhook_code"
      case state
    }
  }
  
  public enum WebhookType: String {
    case token = "TOKEN"
    case identity = "IDENTITY"
    case account = "ACCOUNT"
    case transaction = "TRANSACTION"
    case income = "INCOME"
    case transfer = "TRANSFER"
    case payment = "PAYMENT"
  }
}
