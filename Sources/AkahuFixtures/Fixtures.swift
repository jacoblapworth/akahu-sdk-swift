//
//  Mocks.swift
//  
//
//  Created by Jacob Lapworth on 11/03/23.
//

import Foundation

public enum Responses {
  case account
  case accounts
  case error
  case id
  case identity
  case income
  case payments
  case transactions
  case transactionsPending
  case transfers
  
  public var resourceName: String {
    switch self {
    case .account: return "AccountResponse"
    case .accounts: return "AccountsResponse"
    case .error: return "ErrorResponse"
    case .id: return "IdResponse"
    case .identity: return "IdentityResponse"
    case .income: return "IncomeResponse"
    case .payments: return "PaymentsResponse"
    case .transactionsPending: return "TransactionsPendingResponse"
    case .transactions: return "TransactionsResponse"
    case .transfers: return "TransfersResponse"
    }
  }
  
  public var fileUrl: URL {
    Bundle.module.url(forResource: self.resourceName, withExtension: "json")!
  }
  
  public var data: Data {
    try! Data(contentsOf: self.fileUrl)
  }
}
