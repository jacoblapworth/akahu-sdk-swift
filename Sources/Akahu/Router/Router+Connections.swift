//
//  File.swift
//  
//
//  Created by Jacob Lapworth on 16/03/23.
//

import Foundation
import URLRouting

extension AkahuRoute {
  public enum Connections: Equatable {
    /// Gets a list of all connected financial institutions that users can connect to your Akahu application.
    case all
    /// An individual financial institution connection.
    case connection(id: String, Connection = .get)
    
    internal static let router = OneOf {
      Route(.case(Connections.all))
      Route(.case(Connections.connection)) {
        Path { Parse(.string) }
        Connection.router
      }
    }
    
    public enum Connection: Equatable {
      case get
      
      internal static let router = OneOf {
        Route(.case(Connection.get))
      }
    }
  }
}

let connectionsRoute = Route(.case(AkahuRoute.connections)) {
  Path { "connections" }
  AkahuRoute.Connections.router
}



