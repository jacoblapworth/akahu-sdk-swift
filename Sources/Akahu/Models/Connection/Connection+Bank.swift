//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 15/03/23.
//

import Foundation

extension Connection {
  public enum BankConnection: String {
    /// ANZ
    case anz = "conn_cjgaawozb000001nyd111xixr"
    /// ASB
    case asb = "conn_cjgaaqcna000001ldwof8tvj0"
    /// BNZ
    case bnz = "conn_cjgaatd57000001pe1t1z0iy9"
    /// Heartland
    case heartland = "conn_ck5rhsdbv0000ftx1bmdu9zas"
    /// Kiwibank
    case kiwibank = "conn_cjgaac5at000001qi2yw8ftil"
    /// Rabobank
    case rabobank = "conn_ckydkmy3r000009mde2sx2i4d"
    /// The Cooperative Bank
    case theCooperativeBank = "conn_cjgab1c8e000001pmyxrkhova"
    /// TSB
    case tsb = "conn_cjgab6fis000001qsytf1semy"
    /// Westpac
    case westpac = "conn_cjgaaozdo000001mrnqmkl1m0"
    
    public var displayName: String {
      switch self {
      case .anz: return "ANZ"
      case .asb: return "ASB"
      case .bnz: return "BNZ"
      case .heartland: return "Heartland"
      case .kiwibank: return "Kiwibank"
      case .rabobank: return "Rabobank"
      case .theCooperativeBank: return "The Cooperative Bank"
      case .tsb: return "TSB"
      case .westpac: return "Westpac"
      }
    }
  }
}
