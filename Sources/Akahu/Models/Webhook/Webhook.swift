//
//  Webhook.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

/// Webhooks are the best way to make your application responsive to new or changing data.
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
  
  public enum WebhookType: Codable, Equatable {
    case token(TokenPayload)
    case identity(IdentityPayload)
    case account(AccountPayload)
    case transaction(TransactionPayload)
    case income(IncomePayload)
    case transfer(TransferPayload)
    case payment(PaymentPayload)
    
    public var rawValue: String {
      switch self {
      case .token: return "TOKEN"
      case .identity: return "IDENTITY"
      case .account: return "ACCOUNT"
      case .transaction: return "TRANSACTION"
      case .income: return "INCOME"
      case .transfer: return "TRANSFER"
      case .payment: return "PAYMENT"
      }
    }
    
    public enum TokenPayload: Codable, Equatable {
      case delete(id: String)
    }
    
    public enum IdentityPayload: Codable, Equatable {
      case create(id: String)
      case update(id: String)
      case delete(id: String)
    }
    
    public enum AccountPayload: Codable, Equatable {
      case create(id: String)
      case update(id: String, updatedFields: [String])
      case delete(id: String)
    }
    
    public enum TransactionPayload: Codable, Equatable {
      case initialUpdate(id: String, newTransactions: Int, newTransactionId: [String])
      case defaultUpdate(id: String, newTransactions: Int, newTransactionId: [String])
      case delete(id: String, removedTransactions: [String])
    }
    
    public enum TransferPayload: Codable, Equatable {
      case update(id: String, status: AkahuTransfer.Status, statusText: String?)
      case received(id: String, receivedAt: String)
    }
    
    public enum PaymentPayload: Codable, Equatable {
      case update(id: String, status: AkahuPayment.Status, statusText: String?)
      case received(id: String, receivedAt: String)
    }
    
    public enum IncomePayload: Codable, Equatable {
      case create(id: String, newTransactions: Int, newTransactionId: [String])
      case update(id: String, newTransactions: Int, newTransactionId: [String], removedTransactions: Int, removedTransactionIds: [String])
      case delete(id: String)
      case cancelled
    }
  }
}
