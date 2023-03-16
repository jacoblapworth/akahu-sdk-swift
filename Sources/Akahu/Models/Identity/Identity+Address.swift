//
//  Identity+Address.swift
//  
//
//  Created by Jacob Lapworth on 14/03/23.
//

import Foundation

extension Identity {
  public struct Address: Codable {
    public var type: AddressType
    /// The raw address value provided by the bank.
    public var value: String
    /// Optional parsed and formatted address string.
    public var formattedAddress: String?
    /// Google Places identifier from [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview ).
    public var placeId: String
    public var components: Components
    
    /// Type of address
    public enum AddressType: String, Codable {
      /// Where the user lives.
      case residential = "RESIDENTIAL"
      /// Where the user can be reached by mail such as a PO-BOX.
      case postal = "POSTAL"
      /// Akahu was unable to determine which of the two types of address this is.
      case unknown = "UNKNOWN"
    }
    
    /// Breakdown of the parts that make up this address.
    public struct Components: Codable {
      /// Street name from the address
      public var street: String
      /// Suburb name from the address
      public var suburb: String
      /// City name from the address
      public var city: String
      /// Region name from the address
      public var region: String
      /// Postal code from the address
//      public var postalCode: String //TODO: Number
      /// Country from the address
      public var country: String
    }
  }
  
  public typealias Addresses = [Address]
}

extension Identity.Address: Mockable {
  public static var mock: Self = .init(
    type: .residential,
    value: "27 Bag End, Bagshot Row, Hobbiton, 1011",
    formattedAddress: "27 Bag End, Bagshot Row, Hobbiton, Middle Earth, 1011",
    placeId: "xxxxxxxxxxxxxxxxxxxxxxxxx",
    components: .init(
      street: "27 Bag End",
      suburb: "Bagshot Row",
      city: "Hobbiton",
      region: "Hobbiton",
//      postalCode: "1011",
      country: "Middle Earth"
    )
  )
}
