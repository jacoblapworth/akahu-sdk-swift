//
//  JSON.swift
//  
//
//  Created by Jacob Lapworth on 2/10/22.
//

import Foundation

// MARK: - Helper functions for creating encoders and decoders

func newJSONDecoder() -> JSONDecoder {
  let formatter = ISO8601DateFormatter()
  formatter.formatOptions = [
    .withInternetDateTime,
    .withFractionalSeconds
  ]
  
  let decoder = JSONDecoder()
  decoder.dateDecodingStrategy = .custom({ decoder in
    let container = try decoder.singleValueContainer()
    let dateString = try container.decode(String.self)
    
    if let date = formatter.date(from: dateString) {
      return date
    }
    
    throw DecodingError.dataCorruptedError(in: container, debugDescription: "Cannot decode date string \(dateString)")
  })
  decoder.keyDecodingStrategy = .convertFromSnakeCase
  
  return decoder
}

func newJSONEncoder() -> JSONEncoder {
  let encoder = JSONEncoder()
  encoder.dateEncodingStrategy = .iso8601
  encoder.keyEncodingStrategy = .convertToSnakeCase
  encoder.outputFormatting = [.prettyPrinted]
  
  return encoder
}
