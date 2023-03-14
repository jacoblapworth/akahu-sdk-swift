//
//  IncomeSummary.swift
//  
//
//  Created by Jacob Lapworth on 16/01/23.
//

import Foundation

extension AkahuIncome {
  
  public struct Summary: Codable {
    /// The max value of all the credits assigned to this income source.
    public let max: Double
    /// The mean value of all the credits assigned to this income source.
    public let mean: Double
    /// The median value of all the credits assigned to this income source.
    public let median: Double
    /// The mode value of all the credits assigned to this income source.
    public let mode: [Double]
    /// The minimum value of all the credits assigned to this income source.
    public let min: Double
    /// The summed value of all the credits assigned to this income source.
    public let total: Double
    public let occurrences: Occurrences
    
    public struct Occurrences: Codable {
      /// The number of credit transactions for this income source in this period
      public let count: Int
      /// The ISO 8601 timestamp of when the first credit transaction in this income source transaction was created by the bank
      public let first: Date
      /// The ISO 8601 timestamp of when the last credit transaction in this income source transaction was created by the bank
      public let last: Date
    }
  }
}

extension AkahuIncome.Summary {
  public init(from decoder: Decoder) throws {
    let container: KeyedDecodingContainer<AkahuIncome.Summary.CodingKeys> = try decoder.container(keyedBy: AkahuIncome.Summary.CodingKeys.self)
    self.max = try container.decode(Double.self, forKey: AkahuIncome.Summary.CodingKeys.max)
    self.mean = try container.decode(Double.self, forKey: AkahuIncome.Summary.CodingKeys.mean)
    self.median = try container.decode(Double.self, forKey: AkahuIncome.Summary.CodingKeys.median)
    if let mode = try? container.decode([Double].self, forKey: AkahuIncome.Summary.CodingKeys.mode) {
      self.mode = mode
    } else {
      let mode = try container.decode(Double.self, forKey: AkahuIncome.Summary.CodingKeys.mode)
      self.mode = [mode]
    }
    self.min = try container.decode(Double.self, forKey: AkahuIncome.Summary.CodingKeys.min)
    self.total = try container.decode(Double.self, forKey: AkahuIncome.Summary.CodingKeys.total)
    self.occurrences = try container.decode(AkahuIncome.Summary.Occurrences.self, forKey: AkahuIncome.Summary.CodingKeys.occurrences)
  }
}

extension AkahuIncome.Summary: Mockable {
  static let mock = AkahuIncome.Summary(
    max: 1000.01,
    mean: 1000.01,
    median:  1000.01,
    mode: [1000.01],
    min: 1000.01,
    total: 3000.01,
    occurrences: Occurrences(
      count: 3,
      first: try! Date("2022-02-08T20:52:22Z", strategy: .iso8601),
      last: try! Date("2022-02-22T20:53:47Z", strategy: .iso8601))
  )
  
}
