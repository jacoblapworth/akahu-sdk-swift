//
//  Payment.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

/// Online banking payments are a common way for consumers and businesses to pay bills, invoices, or another person.
///
/// Akahu payments are designed to move money from your user's connected account to another party's bank account.
/// To move money between a user's connected accounts, make a ``AkahuTransfer`` instead.
public struct Payment: Identifiable, Codable {
  /// The Akahu Payment ID
  public var id: String
  /// The Akahu Account ID of the source account
  public var from: String
  /// The Akahu Account ID of the destination account
  public var to: To
  /// How much money the payment is for
  public var amount: Double
  /// Payment metadata that you have specified
  public var meta: Meta
  /// Akahu's unique ID inserted into the particulars field
  public var sid: String
  /// Status of the payment
  public var status: Status
  /// If available, more information about the payment's status
  public var statusText: String
  /// If this payment has reached it's final state
  public var final: Bool
  /// An ISO 8701 timestamp of when this payment was created
  public var createdAt: Date
  /// An ISO 8701 timestamp of when this payment was last updated by Akahu
  public var updatedAt: Date
  /// An ISO 8701 timestamp of when this payment was received by the destination account. This field will only be populated if the destination account is connected to Akahu.
  public var receivedAt: Date?
  public var timeline: Timeline
  
  enum CodingKeys: String, CodingKey {
    case id = "_id"
    case from, to, amount, meta, sid, status, statusText, final, createdAt, updatedAt, receivedAt, timeline
  }
  
  public struct To: Codable {
    /// The NZ bank account number to whom this payment is made
    public var accountNumber: String
    /// The name of the account holder of the destination account
    public var name: String
  }
  
  public struct Meta: Codable {
    /// Metadata that will appear in the destination account
    public var destination: Destination
    /// Metadata that will appear in the source account
    public var source: Source
    
    public struct Destination: Codable {
      /// The particulars you have specified for the destination account
      public var particulars: String
      /// The code you have specified for the destination account
      public var code: String
      /// The reference you have specified for the destination account
      public var reference: String
    }
    
    public struct Source: Codable {
      /// The code you have specified for the destination account
      public var code: String
      /// The reference you have specified for the destination account
      public var reference: String
    }
  }
  
  public enum Status: String, Codable {
    /// Initial state payment is ready to be processed.
    case ready = "READY"
    /// Payment requires user approval before processing see the guide for more details.
    case pending_approval = "PENDING_APPROVAL"
    /// Payment initiated with the user's bank and we've received confirmation that it has been accepted.
    case sent = "SENT"
    /// Payment is not yet ready to be processed.
    case paused = "PAUSED"
    /// Payment has been declined by the user's bank.
    case declined = "DECLINED"
    /// Payment was cancelled.
    case cancelled = "CANCELLED"
    /// Internal Akahu error occurred.
    case error = "ERROR"
  }
  
  public struct TimelineEntry: Codable {
    /// The payment's status at this time
    public var status: String
    /// An ISO 8701 timestamp of when this event was created
    public var time: Date
    /// An ISO 8701 timestamp of when Akahu expects the payment to arrive. Only present on events for SENT statuses.
    public var eta: Date
  }
  
  public typealias Timeline = [TimelineEntry]
}

