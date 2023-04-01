//
//  Router.swift
//
//
//  Created by Jacob Lapworth on 6/02/23.
//

import Foundation
import URLRouting

protocol AkahuEndpoint: Equatable {
  static var auth: AkahuRoute.AuthLevel { get }
}

/// Represents an Akahu endpoint.
///
/// Some routes default the associated value
public enum AkahuRoute: Equatable {
  case accounts(Accounts = .all)
  case auth(Auth)
  case categories(Categories = .all)
  case connections(Connections = .all)
  case identity(Identity = .enduring)
  case income(Income = .all())
  case me(Me = .get)
  case payments(Payments = .all())
  case refresh(Refresh = .all)
  case support(Support)
  case transactions(Transactions = .all())
  case transfers(Transfers = .all())
  case webhooks(Webhooks)
}

extension AkahuRoute {
  /// Convert a route into a request
  public func request() throws -> URLRequest {
    try akahuRouter.request(for: self)
  }
  
  /// Attempts to print the route as a parseable URL request.
  public func print() throws -> URLRequestData {
    try akahuRouter.print(self)
  }

  /// How to authenticate with Akahu's API
  public enum AuthLevel {
    /// App-specific endpoint
    ///
    /// Some endpoints don't make sense to be user-specific.
    /// Akahu provides these resources at the app level, using your App ID Token and secret for authentication.
    case app
    /// User-specific endpoint
    ///
    /// This is the type of authentication required for most of our endpoints.
    /// A good rule of thumb is to ask yourself "Is this request related to a specific user?".
    case user
  }
  
  public var authLevel: AuthLevel {
    switch self {
    case .accounts, .connections, .income, .me, .payments, .refresh, .support, .transactions, .transfers: return .user
    case .auth: return .app
    case .categories: return .app
    case .webhooks: return .app
    case .identity(let route):
      switch route {
      case .enduring: return .user
      case .oneOff: return .app
      }
    }
  }
}

internal let enduringEndpoints = Parse {
  Path { "v1" }
  OneOf {
    accountsRoute
    authRoute
    categoriesRoute
    connectionsRoute
    identityRoute
    incomeRoute
    meRoute
    paymentsRoute
    refreshRoute
    supportRoute
    transactionsRoute
    transfersRoute
  }
}
  .baseURL("https://api.akahu.io")

internal let oauthEndpoints = OneOf {
  oauthRoute
}
  .baseURL("https://oauth.akahu.io")


internal let oneoffEndpoints = OneOf {
  Path { "v1" }
//TODO: Add routes
//  OneOf {
//    accountsRoute
//    partiesRoute
//    pdfsRoute
//    statusRoute
//    transactionsRoute
//  }
}
  .baseURL("https://api.oneoff.akahu.io")

internal let akahuRouter = OneOf {
  enduringEndpoints
  oauthEndpoints
}
