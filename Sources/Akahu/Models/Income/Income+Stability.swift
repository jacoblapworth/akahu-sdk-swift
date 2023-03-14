//
//  IncomeStability.swift
//  
//
//  Created by Jacob Lapworth on 16/01/23.
//

import Foundation

extension AkahuIncome {
  /// An indication of the stability of this income source. This object is only included if the income frequency is recurring and is active (frequency is WEEKLY, BIWEEKLY or MONTHLY).
  public struct Stability: Codable {
    /// Standard deviation of the difference in days between payments. The closer this is to 0, the more regular the payments are. Less than 1 is a good indication that this income is being paid regularly.
    public let paymentRegularity: Double
    /// Standard deviation of the difference in amounts between payments. The closer this is to 0 this is means the more consistent the payment amounts are. Less than 1 is a good indication that the payment amounts are consistent.
    public let paymentAmount: Double
    
    enum CodingKeys: String, CodingKey {
      case paymentRegularity, paymentAmount
    }
  }
}

extension AkahuIncome.Stability: Mockable {
  static let mock = AkahuIncome.Stability(
    paymentRegularity: 0.47,
    paymentAmount: 0
  )
}
  
