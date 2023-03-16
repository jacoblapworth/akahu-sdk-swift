import Foundation
import AkahuFixtures

final public class Akahu {
  private init() {}
  public static let shared = Akahu()
  public static let router = akahuRouter
  public let api = akahuApi
  public typealias Route = AkahuRoute
  
  public typealias AccountsResponse = AkahuItemsResponse<Account>
  public typealias AccountResponse = AkahuItemResponse<Account>
  public typealias TransactionsResponse = AkahuItemsResponse<Transaction>
  public typealias TransactionsPendingResponse = AkahuItemsResponse<TransactionPending>
  public typealias IncomeResponse = AkahuItemsResponse<Income>
  public typealias RefreshResponse = AkahuSuccessResponse
  public typealias MeResponse = AkahuItemResponse<Me>
}

@available(*, deprecated, renamed: "Account")
public typealias AkahuAccount = Account
@available(*, deprecated, renamed: "Auth")
public typealias AkahuAuth = Auth
@available(*, deprecated, renamed: "Connection")
public typealias AkahuConnection = Connection
@available(*, deprecated, renamed: "Transaction")
public typealias AkahuTransaction = Transaction
@available(*, deprecated, renamed: "TransactionPending")
public typealias AkahuTransactionPending = TransactionPending
@available(*, deprecated, renamed: "Identity")
public typealias AkahuIdentity = Identity
@available(*, deprecated, renamed: "Income")
public typealias AkahuIncome = Income
@available(*, deprecated, renamed: "Me")
public typealias AkahuMe = Me
@available(*, deprecated, renamed: "Payment")
public typealias AkahuPayment = Payment
@available(*, deprecated, renamed: "Transfer")
public typealias AkahuTransfer = Transfer
@available(*, deprecated, renamed: "Webhook")
public typealias AkahuWebhook = Webhook
