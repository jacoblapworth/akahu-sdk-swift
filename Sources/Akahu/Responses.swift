//
//  Responses.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation
import AkahuFixtures

public enum AkahuResult<T:Decodable & Identifiable>: Decodable {
  case success(AkahuResponseBody<T>)
  case error(AkahuErrorResponse)
  
  enum CodingKeys: CodingKey {
    case success
  }
  
  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: AkahuResult<T>.CodingKeys.self)
    let success = try container.decode(Bool.self, forKey: .success)
    
    if success {
      self = .success(try AkahuResponseBody(from: decoder))
    } else {
      self = .error(try AkahuErrorResponse(from: decoder))
    }
  }
  
  init(data: Data) throws {
    self = try newJSONDecoder().decode(AkahuResult.self, from: data)
  }
  
  init(fromURL url: URL) throws {
    try self.init(data: try Data(contentsOf: url))
  }
  
  var success: AkahuResponseBody<T>? {
    guard case let .success(response) = self else { return nil }
    return response
  }
  
  var error: String? {
    guard case let .error(response) = self else { return nil }
    return response.message
  }
  
  var itemId: String? { self.success?.itemId }
  var item: T? { self.success?.item }
  var items: [T]? { self.success?.items }
  var cursor: Cursor? { self.success?.cursor }
}

public enum AkahuResponseBody<T: Decodable & Identifiable>: Decodable {
  case itemId(String)
  case item(T)
  case items([T], Cursor?)
  
  enum CodingKeys: CodingKey {
    case itemId
    case item
    case items
    case cursor
  }
  
  public init(from decoder: Decoder) throws {
    let container = try decoder.container(keyedBy: CodingKeys.self)
    let itemId = try container.decodeIfPresent(String.self, forKey: .itemId)
    let item = try container.decodeIfPresent(T.self, forKey: .item)
    let items = try container.decodeIfPresent([T].self, forKey: .items)
    let cursor = try container.decodeIfPresent(Cursor.self, forKey: .cursor)
    
    if let itemId {
      self = .itemId(itemId)
    } else if let item {
      self = .item(item)
    } else if let items {
      self = .items(items, cursor)
    } else {
      throw DecodingError.typeMismatch(AkahuResponseBody<T>.self, DecodingError.Context(
        codingPath: container.codingPath,
        debugDescription: "No id, item, or items key found",
        underlyingError: nil)
      )
    }
  }
  
  var itemId: String? {
    guard case let .itemId(itemId) = self else { return nil }
    return itemId
  }
  
  var item: T? {
    guard case let .item(item) = self else { return nil }
    return item
  }
  
  var items: [T]? {
    guard case let .items(items, _) = self else { return nil }
    return items
  }
  
  var cursor: Cursor? {
    guard case let .items(_, cursor) = self else { return nil }
    return cursor
  }
}

protocol AkahuResponse: Decodable {
  var success: Bool { get }
}

public struct AkahuSuccessResponse: AkahuResponse {
  public var success: Bool = true
}

public struct AkahuIdResponse: AkahuResponse {
  public var success: Bool = true
  public var id: String
}

public struct AkahuItemResponse<T: Decodable>: AkahuResponse  {
  public var success: Bool = true
  public var item: T
}

public struct AkahuItemsResponse<T: Decodable & Identifiable>: AkahuResponse  {
  public var success: Bool = true
  public var items: [T]
  public var cursor: Cursor?
}

public struct AkahuErrorResponse: AkahuResponse  {
  public var success: Bool = false
  public var message: String
}

public struct Cursor: Decodable, Equatable {
  public let next: String?
}

extension AkahuItemResponse {
  init(data: Data) throws {
    self = try newJSONDecoder().decode(AkahuItemResponse.self, from: data)
  }
  
  init(fromURL url: URL) throws {
    try self.init(data: try Data(contentsOf: url))
  }
}

extension AkahuItemsResponse {
  init(data: Data) throws {
    self = try newJSONDecoder().decode(AkahuItemsResponse.self, from: data)
  }
  
  init(fromURL url: URL) throws {
    try self.init(data: try Data(contentsOf: url))
  }
}

//MARK: - Response types

public typealias AccountsResponse = AkahuItemsResponse<AkahuAccount>
public typealias AccountResponse = AkahuItemResponse<AkahuAccount>
public typealias ConnectionsResponse = AkahuItemsResponse<AkahuConnection>
public typealias IdentityResponse = AkahuItemResponse<AkahuIdentity>
public typealias IncomeResponse = AkahuItemsResponse<AkahuIncome>
public typealias PaymentsResponse = AkahuItemsResponse<AkahuPayment>
public typealias TransactionsResponse = AkahuItemsResponse<AkahuTransaction>
public typealias TransactionsPendingResponse = AkahuItemsResponse<AkahuTransactionPending>
public typealias TransfersResponse = AkahuItemsResponse<AkahuTransfer>
public typealias RefreshResponse = AkahuSuccessResponse
public typealias MeResponse = AkahuItemResponse<AkahuMe>

//MARK: - Mocks

extension AccountsResponse {
  public static var mock: Self = try! .init(data: AkahuFixtures.Responses.accounts.data)
}

extension TransactionsResponse {
  public static var mock: Self = try! .init(data: AkahuFixtures.Responses.transactions.data)
}

extension TransactionsPendingResponse {
  public static var mock: Self = try! .init(data: AkahuFixtures.Responses.transactionsPending.data)
}

extension IncomeResponse {
  public static var mock: Self = try! .init(data: AkahuFixtures.Responses.income.data)
}

extension MeResponse {
  public static var mock: Self = .init(item: .mock)
}

