//
//  IncomeType.swift
//  
//
//  Created by Jacob Lapworth on 16/01/23.
//

import Foundation

extension AkahuIncome {
  // The type of income
  public enum IncomeType: String, Codable {
    /// Money earnt from a job salary payment
    case salary = "SALARY"
    /// Money received from govt benefit program
    case benefit = "BENEFIT"
    /// Money coming in for a rental i.e renting a property
    case rent = "RENT"
    /// Money received to reserve or use a certain goods or services
    case deposit = "DEPOSIT"
    /// Money received from an overseas account
    case offshore = "OFFSHORE"
    /// Money earnt from accruing interest on an investment
    case interest = "INTEREST"
    /// Money received from an unknown source
    case otherIncome = "OTHER_INCOME"
  }
}
