//
//  Router.swift
//
//
//  Created by Jacob Lapworth on 6/02/23.
//

import Foundation
import URLRouting

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
