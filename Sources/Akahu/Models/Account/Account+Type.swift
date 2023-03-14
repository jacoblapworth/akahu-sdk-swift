//
//  Account+Type.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

extension AkahuAccount {
  /// Type of account, Akahu provides specific bank account types, and falls back to more general types for other types of connection.
  public enum AccountType: RawRepresentable, Codable, CaseIterable, Equatable {
    public typealias RawValue = String
    
    /// An everyday spending account.
    case checking
    /// A savings account.
    case savings
    /// A credit card.
    case creditcard
    /// A loan of some sort (used when we can't get a more specific type).
    case loan
    /// A personal loan.
    case loanPersonal
    /// A home loan.
    case loanHome
    /// A business loan.
    case loanBusiness
    /// A KiwiSaver investment product.
    case kiwisaver
    /// A general investment product.
    case investment
    /// A term deposit.
    case termdeposit
    /// An account holding a foreign currency.
    case foreign
    /// An account with a telco provider.
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    case telco
    /// An account with an internet provider.
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    case isp
    /// An account with a electricity provider.
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    case power
    /// An account with a gas provider.
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    case gas
    /// An account with an electricity and gas provider.
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    case powerGas
    /// An account with a transport provider.
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    case transport
    /// An account with an entertainment provider.
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    case entertainment
    /// An account with tax authorities.
    case tax
    /// An account for rewards points, e.g. Fly Buys or True Rewards.
    case rewards
    /// Available cash for investment or withdrawal from an investment provider.
    case wallet
    /// Unknown account type.
    case unknown(RawValue)
    
    public var rawValue: RawValue {
      switch self {
      case .checking: return "CHECKING"
      case .savings: return "SAVINGS"
      case .creditcard: return "CREDITCARD"
      case .loan: return "LOAN"
      case .loanPersonal: return "LOAN_PERSONAL"
      case .loanHome: return "LOAN_HOME"
      case .loanBusiness: return "LOAN_BUSINESS"
      case .kiwisaver: return "KIWISAVER"
      case .investment: return "INVESTMENT"
      case .termdeposit: return "TERMDEPOSIT"
      case .foreign: return "FOREIGN"
      case .telco: return "TELCO"
      case .isp: return "ISP"
      case .power: return "POWER"
      case .gas: return "GAS"
      case .powerGas: return "POWER_GAS"
      case .transport: return "TRANSPORT"
      case .entertainment: return "ENTERTAINMENT"
      case .tax: return "TAX"
      case .rewards: return "REWARDS"
      case .wallet: return "WALLET"
      case .unknown(let value): return value
      }
    }
    
    public static var allCases: [AkahuAccount.AccountType] = [
      .checking,
      .savings,
      .creditcard,
      .loan,
      .loanPersonal,
      .loanHome,
      .loanBusiness,
      .kiwisaver,
      .investment,
      .termdeposit,
      .foreign,
      .tax,
      .rewards,
      .wallet
    ]
    
    public init(rawValue: RawValue) {
      let value = Self.allCases.first { rawValue.caseInsensitiveCompare($0.rawValue) == .orderedSame }
      
      guard let value else {
        self = .unknown(rawValue)
        return
      }
      
      self = value
    }
  }
}
