//
//  Identity+Status.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

extension AkahuIdentity {
  ///For more details about one of identity statuses see: [Identity Status reference](https://developers.akahu.nz/docs/the-oneoff-identity-result-model#identity-status)
  public enum Status: String, Codable {
    ///  Identity request is in progress, continue to poll for a final state of `COMPLETE` or `ERROR`.
    case processing = "PROCESSING"
    ///  Final success status reached and identity data has been returned.
    case complete = "COMPLETE"
    /// Final error status reached due to a fatal error occurred during processing.
    case error = "ERROR"
  }
}
