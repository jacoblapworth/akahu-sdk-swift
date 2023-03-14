//
//  Transfer+Status.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

extension AkahuTransfer {
  public enum Status: String, Codable {
    /// Transfer is ready to be processed.
    case ready = "READY"
    /// Transfer requires user approval before processing see the guide for more details.
    case pendingApproval = "PENDING_APPROVAL"
    /// Transfer has been processed and has appeared in the transactions of the source account.
    case sent = "SENT"
    /// Funds have arrived in the destination account.
    case received = "RECEIVED"
    /// Transfer is not yet ready to be processed.
    case paused = "PAUSED"
    /// The transfer has been declined by the source bank.
    case declined = "DECLINED"
    /// The transfer was lodged with the source bank, but it has not been found in the transactions of the source account.
    case sentTimeout = "SENT_TIMEOUT"
    /// The transfer was lodged with the source bank, but the bank threw an error upon confirmation check.
    case sentError = "SENT_ERROR"
    /// Internal Akahu error occurred.
    case error = "ERROR"
  }
}
