//
//  Router.swift
//
//
//  Created by Jacob Lapworth on 6/02/23.
//

import Foundation
import URLRouting

public enum AkahuRoute: Equatable {
  case auth(Auth = .token)
  case accounts(Accounts = .all)
  case categories(Categories = .all)
  case connections(Connections = .all)
  case income(Income = .all)
  case me(Me = .get)
  case payments(Payments = .all())
  case refresh(Refresh = .all)
  case transactions(Transactions = .all())
  case transfers(Transfers = .all())
}

extension AkahuRoute {
  public func request() throws -> URLRequest {
    try akahuRouter.request(for: self)
  }
}

public let baseRouter = OneOf {
  accountsRoute
  authRoute
  categoriesRoute
  connectionsRoute
  incomeRoute
  meRoute
  paymentsRoute
  refreshRoute
  transactionsRoute
  transfersRoute 
}

let akahuRouter = baseRouter
  .baseURL("https://api.akahu.io/v1")

let akahuApi = URLRoutingClient.live(
  router: akahuRouter,
  decoder: newJSONDecoder()
)
