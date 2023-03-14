//
//  Router.swift
//  Cash
//
//  Created by Jacob Lapworth on 6/02/23.
//

import Foundation
import URLRouting

public enum AkahuRoute: Equatable {
  case accounts(Accounts = .all)
  case transactions(Transactions = .all())
  case income(Income = .all)
  case me(Me = .get)
  case refresh(Refresh = .all)
  case token(Token = .authorize)
  
  public enum Accounts: Equatable {
    case all
    case account(id: String, Account = .get)
    
    public enum Account: Equatable {
      case get
      case transactions(Self.Transactions = .all())
      
      public enum Transactions: Equatable {
        case all(options: PaginatedDateRangeOptions = .init())
        case pending
      }
    }
  }
  
  public enum Transactions: Equatable {
    case all(options: PaginatedDateRangeOptions = .init())
    case transaction(id: String, Self.Transaction = .get)
    case pending
    
    public enum Transaction: Equatable {
      case get
    }
  }
  
  public enum Income: Equatable {
    case all
    case income(id: String)
  }
  
  public enum Me: Equatable {
    case get
  }
  
  public enum Refresh: Equatable {
    case all
    case account(id: String)
    case connection(id: String)
  }
  
  public enum Token: Equatable {
    case authorize
    case revoke
  }
}

public struct PaginatedDateRangeOptions: Equatable {
  var start: Date? = nil
  var end: Date? = nil
  var cursor: String? = nil
  
  public init(start: Date? = nil, end: Date? = nil, cursor: String? = nil) {
    self.start = start
    self.end = end
    self.cursor = cursor
  }
}

private let paginatedDateRangeParser = Parse(.memberwise(PaginatedDateRangeOptions.init(start:end:cursor:))) {
  Query {
    Optionally {
      Field("start") { Parse { Formatted(.iso8601 ) } }
    }
    Optionally {
      Field("end") { Parse { Formatted(.iso8601 ) } }
    }
    Optionally {
      Field("cursor") { Parse(.string) }
    }
  }
}

public let accountTransactionsRouter = OneOf {
  Route(.case(AkahuRoute.Accounts.Account.Transactions.all)) {
    paginatedDateRangeParser
  }
  Route(.case(AkahuRoute.Accounts.Account.Transactions.pending)) {
    Path { "pending" }
  }
}

public let accountRouter = OneOf {
  Route(.case(AkahuRoute.Accounts.Account.get))
  Route(.case(AkahuRoute.Accounts.Account.transactions)) {
    Path { "transactions" }
    accountTransactionsRouter
  }
}


private let accountsRouter = OneOf {
  Route(.case(AkahuRoute.Accounts.all))
  Route(.case(AkahuRoute.Accounts.account)) {
    Path { Parse(.string) }
    accountRouter
  }
}

private let transactionRouter = OneOf {
  Route(.case(AkahuRoute.Transactions.Transaction.get))
}

private let transactionsRouter = OneOf {
  Route(.case(AkahuRoute.Transactions.all)) {
    paginatedDateRangeParser
  }
  
  Route(.case(AkahuRoute.Transactions.transaction)) {
    Path { Parse(.string) }
    transactionRouter
  }
  
  Route(.case(AkahuRoute.Transactions.pending)) {
    Path { "pending" }
  }
}

private let incomeRouter = OneOf {
  Route(.case(AkahuRoute.Income.all))
  Route(.case(AkahuRoute.Income.income)) {
    Path { Parse(.string) }
  }
}

private let refreshRouter = OneOf {
  Route(.case(AkahuRoute.Refresh.all))
  Route(.case(AkahuRoute.Refresh.account)) {
    Path { Parse(.string) }
  }
}

private let meRouter = OneOf {
  Route(.case(AkahuRoute.Me.get))
}

private let tokenRouter = OneOf {
  Route(.case(AkahuRoute.Token.authorize)) {
    Method.post
  }
  
  Route(.case(AkahuRoute.Token.revoke)) {
    Method.delete
  }
}

public let baseRouter = OneOf {
  Route(.case(AkahuRoute.accounts)) {
    Path { "accounts" }
    accountsRouter
  }
  
  Route(.case(AkahuRoute.transactions)) {
    Path { "transactions" }
    transactionsRouter
  }
  
  Route(.case(AkahuRoute.income)) {
    Path { "income" }
    incomeRouter
  }
  
  Route(.case(AkahuRoute.me)) {
    Path { "me" }
    meRouter
  }
  
  Route(.case(AkahuRoute.refresh)) {
    Method.post
    Path { "refresh" }
    refreshRouter
  }
  
  Route(.case(AkahuRoute.token)) {
    Path { "token" }
    tokenRouter
  }
}

let akahuRouter = baseRouter
  .baseURL("https://api.akahu.io/v1")

let akahuApi = URLRoutingClient.live(
  router: akahuRouter,
  decoder: newJSONDecoder()
)
