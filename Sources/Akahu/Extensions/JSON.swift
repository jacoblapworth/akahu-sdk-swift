//
//  JSON.swift
//  
//
//  Created by Jacob Lapworth on 2/10/22.
//

import Foundation

extension JSONDecoder.DateDecodingStrategy {
  static let akahu: Self = .custom({ decoder in
    let formatter = ISO8601DateFormatter()
    formatter.formatOptions = [
      .withInternetDateTime,
      .withFractionalSeconds
    ]
    
    let container = try decoder.singleValueContainer()
    let dateString = try container.decode(String.self)
    
    if let date = formatter.date(from: dateString) {
      return date
    }

    throw DecodingError.dataCorruptedError(in: container, debugDescription: "Cannot decode date string \(dateString)")
  })
}

func AkahuJSONDecoder() -> JSONDecoder {
  let decoder = JSONDecoder()
  decoder.keyDecodingStrategy = .convertFromSnakeCase
  decoder.dateDecodingStrategy = .akahu
  return decoder
}

func AkahuJSONEncoder() -> JSONEncoder {
  let encoder = JSONEncoder()
  encoder.dateEncodingStrategy = .iso8601
  encoder.keyEncodingStrategy = .convertToSnakeCase
  
#if DEBUG
  encoder.outputFormatting = [.prettyPrinted]
#endif
  
  return encoder
}
