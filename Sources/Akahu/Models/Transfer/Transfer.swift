//
//  Transfer.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

public struct Transfer: Identifiable, Codable {
  /// The Akahu Transfer ID
  public var id: String
  /// The Akahu Account ID of the source account
  public var from: String
  /// The Akahu Account ID of the destination account
  public var to: String
  /// How much money is being transferred
  public var amount: Double
  /// Akahu's unique ID inserted into the particulars field
  public var sid: String
  public var status: Status
  /// If available, more information about the transfer's staus
  public var statusText: String
  /// If this transfer has reached it's final state
  public var final: Bool
  /// If this transfer is between banks, eg. ANZ → BNZ. These transfers take longer than transfers within a bank.
  public var crossBank: Bool
  /// An ISO 8701 timestamp of when this transfer was created
  public var createdAt: Date
  /// An ISO 8701 timestamp of when this transfer was last updated by Akahu
  public var updatedAt: Date
  public var timeline: Timeline
  
  enum CodingKeys: String, CodingKey {
    case id = "_id"
    case from
    case to
    case amount
    case sid
    case status
    case statusText
    case final
    case crossBank
    case createdAt
    case updatedAt
    case timeline
  }
}
