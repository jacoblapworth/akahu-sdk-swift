import Foundation
import AkahuFixtures

final public class Akahu {
  private init() {}
  public static let shared = Akahu()
  public static let router = akahuRouter
  public let api = akahuApi
  public typealias Route = AkahuRoute
  
  public typealias Account = AkahuAccount
  public typealias Auth = AkahuAuth
  public typealias Connection = AkahuConnection
  public typealias Identity = AkahuIdentity
  public typealias Income = AkahuIncome
  public typealias Me = AkahuMe
  public typealias Payment = AkahuPayment
  public typealias Transaction = AkahuTransaction
  public typealias TransactionPending = AkahuTransactionPending
  public typealias Transfer = AkahuTransfer
  public typealias Webhook = AkahuWebhook
  
  public typealias AccountsResponse = AkahuItemsResponse<Akahu.Account>
  public typealias AccountResponse = AkahuItemResponse<Akahu.Account>
  public typealias TransactionsResponse = AkahuItemsResponse<Akahu.Transaction>
  public typealias TransactionsPendingResponse = AkahuItemsResponse<Akahu.TransactionPending>
  public typealias IncomeResponse = AkahuItemsResponse<Akahu.Income>
  public typealias RefreshResponse = AkahuSuccessResponse
  public typealias MeResponse = AkahuItemResponse<Akahu.Me>
}
