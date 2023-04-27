import Foundation
import URLRouting
import CasePaths
import AkahuFixtures

final public class Akahu {
  private init() {}
  public static let shared = Akahu()
  
  public typealias Route = AkahuRoute
  public static let router = akahuRouter
  

  
  public func authenticateUserRouter(
    appToken: String,
    userToken: String
  ) throws -> any ParserPrinter<URLRequestData, Route> {
    let credentials = try Credentials(appToken: appToken, userToken: userToken)
    
    return akahuRouter.baseRequestData(
      .init(headers: [
        "X-Akahu-Id": [credentials.appToken],
        "Authorization": ["Bearer \(credentials.userToken)"]
      ])
    )
  }
  
  public func authenticateAppRouter(
    appToken: String,
    appSecret: String
  ) throws -> any ParserPrinter<URLRequestData, Route> {
    let credentials = "\(appToken):\(appSecret)".data(using: .utf8)!.base64EncodedString()
      
    return akahuRouter.baseRequestData(
      .init(headers: [
        "Authorization": ["Basic \(credentials)"]
      ])
    )
  }
  
  /// Constructs an AkahuAPIClient
  public func createClient<R: ParserPrinter>(
    router: R = router,
    session: URLSession = .shared,
    decoder: JSONDecoder? = nil
  ) -> URLRoutingClient<Route> where R.Input == URLRequestData, R.Output == Route {
    .live(
      router: router,
      session: session,
      decoder: decoder ?? AkahuJSONDecoder()
    )
  }
  
  /// An AkahuAPIClient that immediately throws an error when a request is made.
  ///
  /// This client is useful when testing a feature that uses only a small subset of the available routes in the API client.
  /// You can creating a failing API client, and then `override(_:with:)` certain routes that return mocked data.
  public static let failingClient = URLRoutingClient<AkahuRoute>.failing
  
  /// Constructs an AkahuAPIClient authenticated for a specific user.
  public func createUserAuthenticatedClient(
    credentials: Akahu.Credentials
  ) throws -> URLRoutingClient<Route> {
    let router = try authenticateUserRouter(appToken: credentials.appToken, userToken: credentials.userToken)
    return createClient(router: router)
  }
}

extension Akahu {
  public typealias Account = AkahuAccount
  public typealias Auth = AkahuAuth
  public typealias Category = AkahuTransaction.Category
  public typealias Connection = AkahuConnection
  public typealias Identity = AkahuIdentity
  public typealias Income = AkahuIncome
  public typealias Payment = AkahuPayment
  public typealias Transaction = AkahuTransaction
  public typealias TransactionPending = AkahuTransactionPending
  public typealias Transfer = AkahuTransfer
  public typealias User = AkahuUser
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
    public typealias Payment = AkahuItemResponse<Akahu.Payment>
    public typealias Payments = AkahuItemsResponse<Akahu.Payment>
    public typealias Refresh = AkahuSuccessResponse
    public typealias Support = AkahuSuccessResponse
    public typealias Transaction = AkahuItemResponse<Akahu.Transaction>
    public typealias Transactions = AkahuItemsResponse<Akahu.Transaction>
    public typealias TransactionsPending = AkahuItemsResponse<Akahu.TransactionPending>
    public typealias Transfer = AkahuItemResponse<Akahu.Transfer>
    public typealias Transfers = AkahuItemsResponse<Akahu.Transfer>
    public typealias User = AkahuItemResponse<Akahu.User>
    public typealias Webhook = AkahuItemResponse<Akahu.Webhook>
    public typealias Webhooks = AkahuItemsResponse<Akahu.Webhook>
  }
}
