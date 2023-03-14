//
//  Account+Name.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

extension AkahuAccount {
  /// The name of this account. If the connection allows customisation, the name will be the custom name (or nickname), eg. "Spending Account". Otherwise Akahu falls back to the product name, eg. "Super Saver".
  public typealias Name = String
}
