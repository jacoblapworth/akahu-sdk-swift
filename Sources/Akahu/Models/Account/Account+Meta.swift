//
//  Account+Meta.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

extension Account {
  /// Metadata regarding this account
  public struct Meta: Codable {
    /// The account holder name
    public var holder: String? = nil
    /// The account holder physical address
    public var address: String? = nil
    public var paymentDetails: PaymentDetails? = nil
    public var planName: String? = nil
    public var usage: Usage? = nil
    public var breakdown: BreakdownUnion? = nil
    public var bill: Bill? = nil
    public var interestFreeDays: Double? = nil
    public var period: Double? = nil
    public var rates: Rates? = nil
    public var bonusInterest: BonusInterest? = nil
    public var profileID: Int? = nil
    public var fareType: String? = nil
    public var fateTypeExpiresAt: String? = nil
    public var portfolio: [Portfolio]? = nil
    public var profile: Profile? = nil
    public var icp: String? = nil
  }
}

extension Account.Meta: Mockable {
  public static var mock: Self = .init()
}

extension Account.Meta {
  public struct Bill: Codable {
    public let billDate: String
    public let closingBalance, outstandingAmount: Double
    public let dueAmount, minimumAmount: Double
    public let startDate, endDate, nextStartDate, nextEndDate: String
    public let nextBillDate: String
  }
  
  public struct BonusInterest: Codable {
    public let cutoff, notifyAt: String
    public let targetBalance: Double
  }
  
  public struct PaymentDetails: Codable {
    public let accountHolder, accountNumber: String
    public let particulars, reference, code: String?
    public let minimumAmount: Double?
  }

  public struct Portfolio: Codable {
    public let fundId, name: String
    public let returns, shares, value: Double
    public let symbol: String?
    public let logo: String?
  }

  public struct Profile: Codable {
    public let pir: String
  }

  public struct Rates: Codable {
    public let general: Double
  }

  public struct Usage: Codable {
    public let data: DataUsage
    
    public struct DataUsage: Codable {
      let used, limit: Double
    }
  }
  
  public enum BreakdownUnion: Codable {
    case breakdownElementArray([BreakdownElement])
    case purpleBreakdown(PurpleBreakdown)
    
    public init(from decoder: Decoder) throws {
      let container = try decoder.singleValueContainer()
      if let x = try? container.decode([BreakdownElement].self) {
        self = .breakdownElementArray(x)
        return
      }
      if let x = try? container.decode(PurpleBreakdown.self) {
        self = .purpleBreakdown(x)
        return
      }
      throw DecodingError.typeMismatch(BreakdownUnion.self, DecodingError.Context(codingPath: decoder.codingPath, debugDescription: "Wrong type for BreakdownUnion"))
    }
    
    public func encode(to encoder: Encoder) throws {
      var container = encoder.singleValueContainer()
      switch self {
      case .breakdownElementArray(let x):
        try container.encode(x)
      case .purpleBreakdown(let x):
        try container.encode(x)
      }
    }
  }

  public struct BreakdownElement: Codable {
    public let label: String
    public let value: Double
  }


  public struct PurpleBreakdown: Codable {
    public let returns: Double
  }

}
