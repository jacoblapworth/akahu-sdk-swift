//
//  Deprecations.swift
//  
//
//  Created by Jacob Lapworth on 26/04/23.
//


extension Akahu {
  
  @available(*, deprecated, renamed: "Akahu.Credentials.validateUserToken")
  public static func validateUserToken(_ token: String) -> Bool {
    token.starts(with: "user_token_")
  }
  
  @available(*, deprecated, renamed: "Akahu.Credentials.validateAppToken")
  public static func validateAppToken(_ token: String) -> Bool {
    token.starts(with: "app_token_")
  }
}
