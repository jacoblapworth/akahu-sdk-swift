//
//  Identity+Mock.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

extension Identity {
  public static var mock: Self = .init(
    id: "conn_1111111111111111111111111",
    status: .processing,
    source: .mock,
    accounts: [.mock],
    identities: [.mock],
    addresses: [.mock]
  )
}
