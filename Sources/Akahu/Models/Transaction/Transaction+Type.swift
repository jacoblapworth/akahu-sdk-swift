//
//  Type.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

extension AkahuTransaction {
  /// What sort of transaction this is. Akahu tries to find a specific transaction type, falling back to "CREDIT" or "DEBIT" if nothing else is available.
  public enum TransactionType: RawRepresentable, CaseIterable, Codable, Equatable {
    
    public typealias RawValue = String
    
    /// An ATM deposit or withdrawal.
    case atm
    /// Money has entered the account.
    case credit
    /// A credit card payment.
    case creditCard
    /// Money has left the account.
    case debit
    /// A direct credit (someone paying into the account).
    case directCredit
    /// A direct debit payment.
    case directDebit
    /// A payment made via the EFTPOS system.
    case eftpos
    /// A fee from the account provider.
    case fee
    /// An interest payment from the account provider.
    case interest
    /// A payment related to a loan.
    case loan
    /// A payment to an external account.
    case payment
    /// An automatic payment.
    case standingOrder
    /// A tax payment.
    case tax
    /// A transfer between accounts that are associated with the same credentials.
    case transfer
    /// An unsupported transaction type
    case unknown(RawValue)
    
    public static let allCases: AllCases = [
      .atm,
      .credit,
      .creditCard,
      .debit,
      .directCredit,
      .directDebit,
      .eftpos,
      .fee,
      .interest,
      .loan,
      .payment,
      .standingOrder,
      .tax,
      .transfer
    ]
    
    public init(rawValue: RawValue) {
      let value = Self.allCases.first{ rawValue.caseInsensitiveCompare($0.rawValue) == .orderedSame }
      
      guard let value else {
        self = .unknown(rawValue)
        return
      }
      
      self = value
    }
    
    public var rawValue: RawValue {
      switch self {
      case .atm : return "ATM"
      case .credit : return "CREDIT"
      case .creditCard : return "CREDIT CARD"
      case .debit : return "DEBIT"
      case .directCredit : return "DIRECT CREDIT"
      case .directDebit : return "DIRECT DEBIT"
      case .eftpos : return "EFTPOS"
      case .fee : return "FEE"
      case .interest : return "INTEREST"
      case .loan : return "LOAN"
      case .payment : return "PAYMENT"
      case .standingOrder : return "STANDING ORDER"
      case .tax : return "TAX"
      case .transfer : return "TRANSFER"
      case let .unknown(value) : return (value)
      }
    }
  }
}
