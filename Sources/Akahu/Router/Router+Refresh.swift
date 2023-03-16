//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  /// Account data such as balance and transactions are periodically refreshed by Akahu and enriched **asynchronously**, providing clean and consistent data across financial institutions.
  /// However, there may be certain times that your app requires the most up-to-date account data possible, this endpoint allows you to request a refresh on-demand for these cases.
  /// For more details see: [Data Refreshes guide](https://developers.akahu.nz/docs/data-refreshes)
  public enum Refresh: Equatable {
    /// This endpoint requests a data refresh for all accounts that the user has connected to your application.
    case all
    /// Calling this endpoint with an Account ID will request that Akahu performs a data refresh for that specific connected account and any other connected accounts that are associated with the same login credentials.
    ///
    /// For example, if the user has shared three ASB accounts from a single set of login credentials and you request a refresh for one, the other two accounts will also be refreshed.
    case account(id: String)
    /// Calling this endpoint with a Connection ID will request that Akahu performs a data refresh for all of the user's connected accounts that are held at the financial institution corresponding to that Connection.
    case connection(id: String)
  }
}

internal let refreshRoute = Route(.case(AkahuRoute.refresh)) {
  Method.post
  Path { "refresh" }
  refreshRouter
}

internal let refreshRouter = OneOf {
  Route(.case(AkahuRoute.Refresh.all))
  Route(.case(AkahuRoute.Refresh.account)) {
    Path { Parse(.string) }
  }
}
