//
//  Transfer+Timeline.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

extension Transfer {
  /// A timeline of events regarding this transfer
  public struct TimelineEntry: Codable {
    /// The transfer's status at this time
    public var status: Status
    /// An ISO 8701 timestamp of when this event was created
    public var time: Date
  }
  
  public typealias Timeline = [TimelineEntry]
}
