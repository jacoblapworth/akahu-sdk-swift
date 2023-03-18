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
    case all(query: DateRangeQuery = .init())
    /// Initiate a payment from the user's connected bank account to another New Zealand bank account.
    case create(payment: Create = .payment)
    /// An individual payment.
    case payment(id: String, payment: Payment = .get)
    
    internal static let router = OneOf {
      Route(.case(Payments.all(query:))) {
        AkahuRoute.DateRangeQuery.parser
      }
      Route(.case(Payments.create)) {
        Method.post
        Payments.Create.router
      }
      Route(.case(Payments.payment)) {
        Path { Parse(.string) }
        Payments.Payment.router
      }
    }
    
    public enum Payment: Equatable {
      /// Get an individual payment that your application has initiated on behalf of the user.
      case get
      /// This endpoint cancels a user's payment that is in the `PENDING_APPROVAL` state.
      case cancel
      
      internal static let router = OneOf {
        Route(.case(Payment.get))
        Route(.case(Payment.cancel)) {
          Method.put
          Path { "cancel" }
        }
      }
    }
    
    public enum Create: Equatable {
      case payment
      case ird
      
      internal static let router = OneOf {
        Route(.case(Create.payment))
        Route(.case(Create.ird)) {
          Path { "ird" }
        }
      }
    }
  }
}

internal let paymentsRoute = Route(.case(AkahuRoute.payments)) {
  Path { "payments" }
  AkahuRoute.Payments.router
}
