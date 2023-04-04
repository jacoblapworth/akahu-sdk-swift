//
//  Mockable.swift
//  
//
//  Created by Jacob Lapworth on 28/02/23.
//

import Foundation

/// A type that can initialise itself with a mock value.
public protocol Mockable {
  static var mock: Self { get }
}
