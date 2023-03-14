//
//  IncomeFrequency.swift
//  
//
//  Created by Jacob Lapworth on 16/01/23.
//

import Foundation

extension AkahuIncome {
  /// The frequency of income payments
  public enum Frequency: String, Codable {
    /// Income failed meet the criteria of an current ongoing recurring pattern, for example this may be income for a past job.
    case inactive = "INACTIVE"
    /// Payments do not follow a recurring pattern.
    case irregular = "IRREGULAR"
    /// Active and recurring income on a monthly basis.
    case monthly = "MONTHLY"
    /// Active and recurring income every two weeks or on a twice week basis.
    case biweekly = "BIWEEKLY"
    /// Active and recurring income on a weekly basis.
    case weekly = "WEEKLY"
    /// Active and recurring income on a daily basis.
    case daily = "DAILY"
  }
}
