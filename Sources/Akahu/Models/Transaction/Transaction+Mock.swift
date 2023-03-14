//
//  Transaction+Mock.swift
//  
//
//  Created by Jacob Lapworth on 11/12/22.
//

import Foundation

extension AkahuTransaction: Mockable {
  public static var mock = AkahuTransaction(
    id: "trans_cl8kw9h4o00uh09ju1vbtgsq0",
    account: "acc_ckld8mf7f000008jm6gul0cu2",
    user: "user_cjs5crt0z000301rrh31pfosb",
    connection: "conn_cjgaaozdo000001mrnqmkl1m0",
    createdAt: Date.init(timeIntervalSinceNow: TimeInterval(-60*6)),
    updatedAt:  Date.init(timeIntervalSinceNow: TimeInterval(-60*6)),
    date: Date.init(timeIntervalSinceNow: TimeInterval(-60*6)),
    hash: "acc_ckgq8c3df000008mg9m7b8t6k-akxmk000qkdt",
    description: "Cotton On 9930 Queen S Auckland NZL 992709",
    amount: -32.18,
    type: .creditCard,
    meta: Meta(particulars: "akxmk000qkdt",
                          code: "one time pmt",
                          reference: "12:05-24772",
                          logo: "https://static.akahu.io/outlets/merchant_cji9yur38000ganojm42oicsz_logo.png"),
    merchant: Merchant(id: "123", name: "Cotton On Test"),
    category: Category(
      id: "nzfcc_ckouvvy84001608ml5p6z4d8j",
      name: "Supermarkets and grocery stores",
      groups: .init(personalFinance: .food)
    )
  )
}
