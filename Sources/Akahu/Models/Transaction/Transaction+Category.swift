//
//  Transaction+Category.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

extension AkahuTransaction {
  public typealias FinanceCategory = AkahuTransaction.Category.Groups.PersonalFinance
  
  /// The category object categorises the transaction using NZFCC codes (New Zealand Financial Category Codes)
  public struct Category: Codable, Identifiable {
    /// The NZFCC Category ID
    public let id: String
    /// The NZFCC Category Name
    public let name: String
    public let groups: Groups
    
    @available(*, deprecated, renamed: "groups" )
    public let components: [Component] = []

    enum CodingKeys: String, CodingKey {
      case id = "_id"
      case name, groups
    }
    
    /// Higher level groupings that a category belongs to.
    public struct Groups: Codable {
      public let personalFinance: PersonalFinance?

      public enum PersonalFinance: String, Codable, CaseIterable, Identifiable {
        case appearance = "group_clasr0ysw0010hk4mf2dca4y8"
        case education = "group_clasr0ysw000zhk4m0cru14rw"
        case food = "group_clasr0ysw000xhk4mf7mg2j1z"
        case health = "group_clasr0ysw000yhk4mddaobwu7"
        case household = "group_clasr0ysw000uhk4m20nvc6m1"
        case housing = "group_clasr0ysw000thk4mefilhht7"
        case lifestyle = "group_clasr0ysw0011hk4m6hlk9fq0"
        case professionalFees = "group_clasr0ysw0012hk4mgru5dgy7"
        case transport = "group_clasr0ysw000whk4m577xhmf3"
        case utilities = "group_clasr0ysw000vhk4m46ce9nrt"
        
        public var id: RawValue { rawValue }

        public var name: String {
          switch self {
          case .appearance: return "Appearance"
          case .education: return "Education"
          case .food: return "Food"
          case .health: return "Health"
          case .household: return "Household"
          case .housing: return "Housing"
          case .lifestyle: return "Lifestyle"
          case .professionalFees: return "Professional Services"
          case .transport: return "Transport"
          case .utilities: return "Utilities"
          }
        }

        public init(from decoder: Decoder) throws {
          let container = try decoder.container(keyedBy: CodingKeys.self)
          let id = try container.decode(String.self, forKey: .id)
          self = PersonalFinance(rawValue: id)!
        }

        private enum CodingKeys: String, CodingKey {
          case id = "_id"
          case name
        }
      }
    }
    
    @available(*, deprecated, message: "Use groups instead" )
    public struct Component: Codable {
      public let name: String
      public let type: String
    }
  }
}
