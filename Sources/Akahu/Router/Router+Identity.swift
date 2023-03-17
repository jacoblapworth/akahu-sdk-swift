//
//  Router+Identity.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public enum Identity: Equatable {
    /// Get a list of the registered parties at the institutions that the user has connected accounts with.
    ///
    /// This data is sourced from the profile information at each connected institution rather than any specific account held within.
    /// In general this identity data will relate to the person who has connected the account, however if the user connects an account that is registered under another party (e.g. another person, an LLC, a trust), the result may also contain data pertaining to these other parties. That is to say, Akahu is simply passing this information on from the connected institutions.
    case enduring
    
    /// Get the results of an Identity OAuth result using the authorization code provided upon redirection to your redirect_uri after the user's successful completion of the authorization flow.
    ///
    /// This can be used to verify a user's identity using the data that is held about them by their financial institution.
    /// - Parameter id: The authorization code received from the identity OAuth redirect.
    case oneOff(id: String)
  }
}

internal let identityRoute = Route(.case(AkahuRoute.identity)) {
  OneOf {
    Route(.case(AkahuRoute.Identity.enduring)) {
      Path { "parties" }
    }
    Route(.case(AkahuRoute.Identity.oneOff)) {
      Path { "identity" }
      Path { Parse(.string) }
    }
  }
}

