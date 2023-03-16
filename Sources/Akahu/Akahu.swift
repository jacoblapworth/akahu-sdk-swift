import Foundation
import AkahuFixtures

final public class Akahu {
  private init() {}
  public static let shared = Akahu()
  public static let router = akahuRouter
  public let api = akahuApi
  public typealias Route = AkahuRoute
  
  public typealias Connection = AkahuConnection
  public typealias Identity = AkahuIdentity
  public typealias Income = AkahuIncome
  public typealias Me = AkahuMe
  public typealias Payment = AkahuPayment
  public typealias Transfer = AkahuTransfer
  public typealias Webhook = AkahuWebhook
  
  public typealias AccountsResponse = AkahuItemsResponse<Account>
  public typealias AccountResponse = AkahuItemResponse<Account>
  public typealias TransactionsResponse = AkahuItemsResponse<Transaction>
  public typealias TransactionsPendingResponse = AkahuItemsResponse<TransactionPending>
  public typealias IncomeResponse = AkahuItemsResponse<Akahu.Income>
  public typealias RefreshResponse = AkahuSuccessResponse
  public typealias MeResponse = AkahuItemResponse<Akahu.Me>
}

@available(*, deprecated, renamed: "Account")
public typealias AkahuAccount = Account
@available(*, deprecated, renamed: "Auth")
public typealias AkahuAuth = Auth
@available(*, deprecated, renamed: "Transaction")
public typealias AkahuTransaction = Transaction
@available(*, deprecated, renamed: "TransactionPending")
public typealias AkahuTransactionPending = TransactionPending
