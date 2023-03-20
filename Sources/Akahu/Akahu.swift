import Foundation
import URLRouting
import CasePaths
import AkahuFixtures

final public class Akahu {
  private init() {}
  public static let shared = Akahu()
  
  public typealias Route = AkahuRoute
  public static let router = akahuRouter
  
  enum Errors: Error, Equatable, LocalizedError {
    case invalidAppToken(String)
    
    var localizedDescription: String {
      switch self {
      case let .invalidAppToken(token):
        return """
               Invalid appToken value: \(token).
               appToken must be a string beginning with app_token_
               """
      }
    }
  }
  
  public func createClient<R: ParserPrinter>(
    router: R = router,
    session: URLSession = .shared,
    decoder: JSONDecoder? = nil
  ) -> URLRoutingClient<Route> where R.Input == URLRequestData, R.Output == Route {
    .live(
      router: router,
      session: session,
      decoder: decoder ?? newJSONDecoder()
    )
  }
  
  public func authenticateRouter(appToken: String) throws -> any ParserPrinter<URLRequestData, Route> {
    guard Self.validateAppToken(appToken) else {
      throw Errors.invalidAppToken(appToken)
    }
    
    return akahuRouter.baseRequestData(
      .init(headers: [
        "X-Akahu-Id": [appToken]
      ])
    )
  }
  
  public static let failingClient = URLRoutingClient<AkahuRoute>.failing
  
  static func validateAppToken(_ token: String) -> Bool {
    token.starts(with: "app_token_")
  }
  
  static func validateUserToken(_ token: String) -> Bool {
    token.starts(with: "user_token_")
  }
}

extension Akahu {
  public typealias Account = AkahuAccount
  public typealias Auth = AkahuAuth
  public typealias Category = AkahuTransaction.Category
  public typealias Connection = AkahuConnection
  public typealias Identity = AkahuIdentity
  public typealias Income = AkahuIncome
  public typealias Me = AkahuMe
  public typealias Payment = AkahuPayment
  public typealias Transaction = AkahuTransaction
  public typealias TransactionPending = AkahuTransactionPending
  public typealias Transfer = AkahuTransfer
  public typealias Webhook = AkahuWebhook
}

extension Akahu {
  public struct Responses {
    public typealias Account = AkahuItemResponse<Akahu.Account>
    public typealias Accounts = AkahuItemsResponse<Akahu.Account>
    public typealias Categories = AkahuItemsResponse<Akahu.Category>
    public typealias Category = AkahuItemResponse<Akahu.Category>
    public typealias Connection = AkahuItemResponse<Akahu.Connection>
    public typealias Connections = AkahuItemsResponse<Akahu.Connection>
    public typealias Identities = AkahuItemsResponse<Akahu.Identity>
    public typealias Income = AkahuItemsResponse<Akahu.Income>
    public typealias Me = AkahuItemResponse<Akahu.Me>
    public typealias Payment = AkahuItemResponse<Akahu.Payment>
    public typealias Payments = AkahuItemsResponse<Akahu.Payment>
    public typealias Transaction = AkahuItemResponse<Akahu.Transaction>
    public typealias Transactions = AkahuItemsResponse<Akahu.Transaction>
    public typealias TransactionsPending = AkahuItemsResponse<Akahu.TransactionPending>
    public typealias Transfer = AkahuItemResponse<Akahu.Transfer>
    public typealias Transfers = AkahuItemsResponse<Akahu.Transfer>
    public typealias Webhook = AkahuItemResponse<Akahu.Webhook>
    public typealias Webhooks = AkahuItemsResponse<Akahu.Webhook>
    public typealias Refresh = AkahuSuccessResponse
    public typealias Support = AkahuSuccessResponse
  }
}
