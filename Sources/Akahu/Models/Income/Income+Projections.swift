//
//  IncomeProjections.swift
//  
//
//  Created by Jacob Lapworth on 16/01/23.
//

import Foundation

extension AkahuIncome {
  
  /// Projections for this income source. This object is only included if the income frequency is recurring and is active (frequency is WEEKLY, BIWEEKLY or MONTHLY).
  public struct Projections: Codable {
    /// Projected yearly net income for this income source.
    public let yearlyNetIncome: Double
    /// Projected day of the week that income is received.
    /// Mon, Tue, Wed, Thu, Fri, Sat, Sun
    public let payDay: String
    /// The ISO 8601 timestamp of the next day income will be received.
    public let nextDate: Date
    /// Projected amount of the next payment.
    public let nextPaymentAmount: Double
    public let yearlyGrossRange: [Int]
    
    enum CodingKeys: String, CodingKey {
      case yearlyNetIncome, payDay, nextDate, nextPaymentAmount, yearlyGrossRange
    }
  }
  
}

extension AkahuIncome.Projections: Mockable {
  public static let mock = AkahuIncome.Projections(
    yearlyNetIncome: 48000.01,
    payDay: "Mon",
    nextDate: Date(timeIntervalSinceNow: 60*60*24),
    nextPaymentAmount: 1000.01,
    yearlyGrossRange: [
      50000,
      60000
    ]
  )
}
