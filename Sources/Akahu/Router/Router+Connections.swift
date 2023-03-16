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
    
    public enum Connection: Equatable {
      case get
    }
  }
}

let connectionsRoute = Route(.case(AkahuRoute.connections)) {
  Path { "connections" }
  connectionsRouter
}

internal let connectionsRouter = OneOf {
  Route(.case(AkahuRoute.Connections.all))
  Route(.case(AkahuRoute.Connections.connection)) {
    Path { Parse(.string) }
    connectionRouter
  }
}

internal let connectionRouter = OneOf {
  Route(.case(AkahuRoute.Connections.Connection.get))
}
