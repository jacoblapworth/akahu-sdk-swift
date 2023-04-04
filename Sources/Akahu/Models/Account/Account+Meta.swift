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
    public let pir: String
  }

  public struct Rates: Codable {
    public let general: Double
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
