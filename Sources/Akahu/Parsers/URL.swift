//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 6/04/23.
//

import Foundation
import Parsing

extension Conversion where Self == Conversions.StringToURL {
  @inlinable
  public static var url: Self { .init() }
}

extension Conversion where Output == String {
  /// Transforms this conversion to `String` into a conversion to `URL`.
  ///
  /// A fluent version of ``Conversion/url``.
  @inlinable
  public var url: Conversions.Map<Self, Conversions.StringToURL> { self.map(.url) }
}


extension Conversions {
  @usableFromInline
  internal struct ConvertingError: Error {
    @usableFromInline
    let message: String
    
    @usableFromInline
    init(_ message: String = "") {
      self.message = message
    }
  }


  /// A conversion from a string to a url.
  ///
  /// You will not typically need to interact with this type directly. Instead you will usually use
  /// the ``Conversion/url`` operation, which constructs this type.
  public struct StringToURL: Conversion {
    @usableFromInline
    init() {}
    
    @inlinable
    public func apply(_ input: String) throws -> URL {
      guard let output = URL(string: input) else {
        throw ConvertingError(
          """
          url: Failed to convert \(input.debugDescription) to \(Output.self).
          """
        )
      }
      return output
    }
    
    @inlinable
    public func unapply(_ output: URL) -> String {
      output.absoluteString
    }
  }
}
