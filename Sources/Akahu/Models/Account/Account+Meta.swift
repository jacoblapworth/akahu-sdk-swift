//
//  Account+Meta.swift
//
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

extension AkahuAccount {
  /// Metadata regarding this account
  public struct Meta: Codable {
    /// The account holder name
    public var holder: String? = nil
    /// The account holder physical address
    public var address: String? = nil
    public var paymentDetails: PaymentDetails? = nil
    public var breakdown: Breakdown? = nil
    public var bill: Bill? = nil
    public var interestFreeDays: Double? = nil
    public var loanDetails: LoanDetails? = nil
    public var period: Double? = nil
    public var rates: Rates? = nil
    public var bonusInterest: BonusInterest? = nil
    public var portfolio: [Portfolio]? = nil
    public var profile: Profile? = nil
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    public var planName: String? = nil
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    public var usage: Usage? = nil
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    public var profileID: Int? = nil
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    public var fareType: String? = nil
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    public var fateTypeExpiresAt: String? = nil
    @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
    public var icp: String? = nil
  }
}



extension AkahuAccount.Meta: Mockable {
  public static var mock: Self = .init()
}

extension AkahuAccount.Meta {
  public struct Bill: Codable {
    public let billDate: String
    public let closingBalance: Double
    public let outstandingAmount: Double
    public let dueAmount: Double
    public let minimumAmount: Double
    public let startDate: String
    public let endDate: String
    public let nextStartDate: String
    public let nextEndDate: String
    public let nextBillDate: String
  }
  
  public struct BonusInterest: Codable {
    public let cutoff: String
    public let notifyAt: String
    public let targetBalance: Double
  }
  
  public struct PaymentDetails: Codable {
    public let accountHolder: String
    public let accountNumber: String
    public let code: String?
    public let particulars: String?
    public let reference: String?
    public let minimumAmount: Double?
  }
  
  public struct Portfolio: Codable {
    public let fundId: String
    public let name: String
    public let value: Double
    public let shares: Double
    public let returns: Double
    public let symbol: String?
    public let logo: String?
  }
  
  public struct Profile: Codable {
    public let pir: Double
  }
  
  public struct Rates: Codable {
    public let general: Double
  }
  
  public struct LoanDetails: Codable {
    /// The purpose of the loan (E.g. HOME), if we can't determine the purpose, this will be UNKNOWN
    public let purpose: Purpose
    /// The type of loan (E.g. TABLE), if we can't determine the type, this will be UNKNOWN
    public let type: LoanType
    /// Interest rate information for the loan.
    public let interest: Interest
    /// Is the loan currently in an interest only period?
    public let isInterestOnly: Bool
    /// When the interest only period expires, if available.
    public let interestOnlyExpiresAt: Date
    /// The duration/term of the loan for it to be paid to completion from the start date of the loan.
    public let term: Term
    /// When the loan matures, if available.
    public let maturesAt: Date
    /// The loan initial principal amount, this was the original amount borrowed.
    public let initialPrincipal: Int
    /// Loan repayment information if available.
    public let repayment: Repayment
    
    public enum Purpose: String, Codable {
      case home = "HOME"
      case personal = "PERSONAL"
      case business = "BUSINESS"
      case unknown = "UNKNOWN"
    }
    
    public enum LoanType: String, Codable {
      case table = "TABLE"
      case reducing = "REDUCING"
      case revolving = "REVOLVING"
      case unknown = "UNKNOWN"
    }
    
    public struct Interest: Codable {
      /// The rate of interest
      public let rate: Int
      /// The type of interest rate (E.g. FIXED)
      public let type: InterestType
      /// When this interest rate expires, if available.
      public let expires_at: Date?
      
      public enum InterestType: String, Codable {
        case fixed = "FIXED"
        case floating = "FLOATING"
      }
    }
    
    public struct Term: Codable {
      public var years: Int
      public var months: Int
    }
    
    public struct Repayment: Codable {
      /// The frequency of the loan repayment.
      public var frequency: Frequency?
      /// The next repayment date, if available.
      public var nextDate: Date?
      /// The next instalment amount.
      public var nextAmount: Int
      
      public enum Frequency: String, Codable {
        case weekly = "WEEKLY"
        case fortnightly = "FORTNIGHTLY"
        case monthly = "MONTHLY"
        case quarterly = "QUARTERLY"
        case biannually = "BIANNUALLY"
        case annually = "ANNUALLY"
      }
    }
  }
  
  @available(*, deprecated, message: "Akahu no longer supports 'Utility' integrations")
  public struct Usage: Codable {
    public let data: DataUsage
    
    public struct DataUsage: Codable {
      let used, limit: Double
    }
  }
  
  public enum Breakdown: Codable {
    case breakdownElementArray([BreakdownElement])
    case breakdownElement(SimpleBreakdown)
    
    public init(from decoder: Decoder) throws {
      let container = try decoder.singleValueContainer()
      if let x = try? container.decode([BreakdownElement].self) {
        self = .breakdownElementArray(x)
        return
      }
      if let x = try? container.decode(SimpleBreakdown.self) {
        self = .breakdownElement(x)
        return
      }
      throw DecodingError.typeMismatch(Breakdown.self, DecodingError.Context(codingPath: decoder.codingPath, debugDescription: "Wrong type for BreakdownUnion"))
    }
    
    public func encode(to encoder: Encoder) throws {
      var container = encoder.singleValueContainer()
      switch self {
      case .breakdownElementArray(let x):
        try container.encode(x)
      case .breakdownElement(let x):
        try container.encode(x)
      }
    }
  }
  
  public struct BreakdownElement: Codable {
    public let label: String
    public let value: Double
  }
  
  
  public struct SimpleBreakdown: Codable {
    public let returns: Double
  }
  
}
