//
//  Mockable.swift
//  
//
//  Created by Jacob Lapworth on 28/02/23.
//

import Foundation

protocol Mockable {
  static var mock: Self { get }
}
