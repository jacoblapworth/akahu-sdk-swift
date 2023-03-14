//
//  Connection+Mock.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

extension AkahuConnection: Mockable {
  public static var mock: Self = .init(
    id: "conn_1111111111111111111111111",
    name: "Westpac",
    logo: URL(string: "https://static.akahu.io/images/conn_cjgaaozdo000001mrnqmkl1m0_logo.png")!
  )
}
