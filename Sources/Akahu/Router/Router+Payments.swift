//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  
  public enum Payments: Equatable {
    /// Get a list of the payments that your application has initiated on behalf of the user within the start and end time range.
    case all(query: DateRangeOptions = .init())
    /// Initiate a payment from the user's connected bank account to another New Zealand bank account.
    case create(payment: Create = .payment)
    case payment(id: String, payment: Payment = .get)
    
    public enum Payment: Equatable {
      /// Get an individual payment that your application has initiated on behalf of the user.
      case get
      /// This endpoint cancels a user's payment that is in the `PENDING_APPROVAL` state.
      case cancel
    }
    
    public enum Create: Equatable {
      case payment
      case ird
    }
  }
}

internal let paymentsRoute = Route(.case(AkahuRoute.payments)) {
  Path { "payments" }
  paymentsParser
}

internal let paymentsParser = OneOf {
  Route(.case(AkahuRoute.Payments.all(query:))) {
    dateRangeParser
  }
  Route(.case(AkahuRoute.Payments.create)) {
    Method.post
    createPaymentParser
  }
  Route(.case(AkahuRoute.Payments.payment)) {
    Path { Parse(.string) }
    paymentParser
  }
}

internal let createPaymentParser = OneOf {
  Route(.case(AkahuRoute.Payments.Create.payment))
  Route(.case(AkahuRoute.Payments.Create.ird)) {
    Path { "ird" }
  }
}

internal let paymentParser = OneOf {
  Route(.case(AkahuRoute.Payments.Payment.get))
  Route(.case(AkahuRoute.Payments.Payment.cancel)) {
    Method.put
    Path { "cancel" }
  }
}
