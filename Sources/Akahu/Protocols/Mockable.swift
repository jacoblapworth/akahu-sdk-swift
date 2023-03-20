//
//  Mockable.swift
//  
//
//  Created by Jacob Lapworth on 28/02/23.
//

import Foundation

public protocol Mockable {
  static var mock: Self { get }
}
