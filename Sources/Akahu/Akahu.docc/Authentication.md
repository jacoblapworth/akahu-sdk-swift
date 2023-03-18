# Authorizing With OAuth2

Learn how to gain permission to access a user's data

## Overview

> Note: This guide is not applicable to **Personal Apps** as they are authorized when they are created. See our [Getting Started Guide](/docs/getting-started) to set up your **Personal App**.

Akahu supports the OAuth2 [authorization code](https://www.loginradius.com/blog/engineering/authorization-code-flow-oauth/) flow. This allows your application to request authorization from users to access their data. After a user completes this flow, your app will be granted enduring access to the user's data via our APIs.

Need a hand? Join our [Slack Channel](http://slack.akahu.io/) for in-person help.

## Prerequisites

Before we begin, you will need:

- Your Akahu **App ID Token**.
- Your Akahu **App Secret**.
- Your Akahu app's **Redirect URIs** (you must supply at least one of these when you register an Akahu app).

The first two will be given to you when you register an app with Akahu.

> Warning: Make sure you keep your **App Secret** private! Never include it in any frontend or user-accessible source code. 
> We recommend you use [environment variables](https://en.wikipedia.org/wiki/Environment_variable) to store the secret.

## Authorization Flow Overview
The Akahu authorization flow consists of the following steps:

1. Your application directs the user to the Akahu authorization page.
2. The user authenticates with Akahu.
3. The user connects their financial accounts to Akahu if they haven't done so previously.
4. The user chooses which accounts your application will be able to access.
5. The user is redirected back to your application along with a short-lived authorization code included in the URL query parameters.
6. Your application server exchanges this authorization code with Akahu for a long-lived user access token. Your application can then use this token to make requests to the Akahu API based on the access that has been authorized by the user.

See our [Example Authorization Flow](/docs/authorization-flow-example) for a visual reference of this process.

## The Authorization Request

To begin the OAuth flow, the user must be directed to `https://oauth.akahu.io`, with several query parameters set.

``AkahuRoute/Auth/AuthorizationParams``

```swift
let options = AkahuRoute.Auth.AuthorizationParams(
  redirectUri: "http://localhost:3000",
  scope: [.enduringConsent,.akahu],
  clientId: <<appToken>>,
  state: uuid().uuidString
)

AkahuRoute.auth(.authorize(options)
```


| Parameter       | Example                          | Description                                                                                                                                                          |
| --------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `response_type` | _code_                           | The type of oauth response. Currently "code" is the only supported option.                                                                                           |
| `client_id`     | _<<appToken>>_                   | Your **App ID Token**.                                                                                                                                               |
| `email`         | _user@example.com _              | (Optional) The user's email.                                                                                                                                         |
| `connection`    | _conn_1234_                      | (Optional) Direct the user to a specific connection from your app                                                                                                    |
| `redirect_uri`  | _https://example.com/auth/akahu _| Where to redirect the user once they have accepted or rejected the access request. This **must** match one of your app's **Redirect URIs**.                          |
| `scope`         | _ENDURING_CONSENT_               | The type of oauth flow to perform. `ENDURING_CONSENT` is all you need to supply here.                                                                                |
| `state`         | _1234567890_                     | (Recommended) An arbitrary string that will be returned with the **Authorization Code**. Useful to keep track of request-specific state and to prevent CSRF attacks. |

Here is an example uri using the values above, with newlines included for readability:

```text
https://oauth.akahu.io?
response_type=code&
client_id=<<appToken>>&
email=user%40example.com&
redirect_uri=https%3A%2F%2Fexample.com%2Fauth%2Fakahu&
scope=ENDURING_CONSENT&
state=1234567890
```

> Tip: By default, you only need to supply Akahu with the scope for the type of OAuth request you wish to perform. 
> Akahu will automatically add all of the additional scopes that your app is allowed to access. 
> If you wish to only request a subset of your app's available scopes, simply set the `scope` parameter to a space-separated list of the scopes you desire.

## The Authorization Response

The authorization response is delivered to your app by redirecting the user to your supplied **Redirect URI**, with results included in the query parameters.

### A Successful Response

When the user accepts your app's request for authorization, they will be returned to your supplied **Redirect URI** with the following query parameters:

| Parameter | Example               | Description                                                                    |
| --------- | --------------------- | ------------------------------------------------------------------------------ |
| `code`    | _c5bae672...88a33f1f_ | An **Authorization Code**. Keep track of this for the next step.               |
| `state`   | _1234567890_          | The state you supplied when you made the request.                              |
| `source`  | _oauth_               | For OAuth requests, this will always be "oauth".                               |
| `event`   | _ACCEPT_              | The type of event the user has performed. One of `ACCEPT`, `REVOKE`, `UPDATE`. |

### An Error Response

Two types of errors can be returned:

- **An access denied error.** The user has declined to give your app access to the permissions it has requested.
- **A configuration error.** There was something wrong with your authorization request.

Details are supplied by the `error` and `error_description` (optional) query parameters.

The error codes given are standard for OAuth implementations, for more details see [this document](https://www.oauth.com/oauth2-servers/authorization/the-authorization-response/).

## Exchanging the Authorization Code

In order to get a **User Access Token** you must exchange your **Authorization Code** by making a `POST` request to the `/token` endpoint ([Reference](/reference/post_token)). This must be done within 60 seconds of receiving the **Authorization Code**.

The body may be a JSON string or url encoded form data, with the following keys:

| Key             | Example                          | Description                                                              |
| --------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `grant_type`    | _authorization_code_             | Grant type. Only "authorization_code" is currently supported.            |
| `code`          | _id_1234512345123451234512345_   | The **Authorization Code** you received earlier.                         |
| `redirect_uri`  | _https://example.com/auth/akahu_ | The **Redirect URI** you originally supplied, for verification purposes. |
| `client_id`     | _<<appToken>>_                   | Your **App ID Token**.                                                   |
| `client_secret` | _1a785560...c1ae44c4_            | Your **App Secret**                                                      |

### A Successful Response

If all parameters are correct you will receive a JSON response body with the following keys:

| Key            | Example                                       | Description                                                         |
| -------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| `success`      | _true_                                        | Indicates that the operation was successful.                        |
| `access_token` | _"<<apiKey>>"_                                | A **User Access Token**.                                               |
| `token_type`   | _"bearer"_                                    | Will always be "bearer".                                            |
| `scope`        | _"IDENTITY_EMAILS ACCOUNTS ENDURING_CONSENT"_ | The scopes granted by this **User Access Token**, separated by spaces. |

<!-- | `expires_in`   | _31535999_                                    | Time until the **User Access Token** expires.                          | -->

### An Error Response

If the response `success` key is `false`, details are supplied by the `error` and `error_description` (optional) keys.

For more information on the error codes returned, see for more details see [this document](https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/).

## Next Steps

Now that you have a **User Access Token**, you can access those endpoints allowed by the permissions you requested.

Simply set the `Authorization` header to `Bearer {User Access Token}` and the `X-Akahu-ID` header to `{App ID Token}` and make a request - a good starting point is the [`/me`](/reference/get_me) endpoint, which gives you basic details of the user who authorized you.

Well done! Now view our [Full API Documentation](/reference/) or our [Quick Start Guides](/docs/getting-started) and start building!

## Topics

### <!--@START_MENU_TOKEN@-->Group<!--@END_MENU_TOKEN@-->

- <!--@START_MENU_TOKEN@-->``Symbol``<!--@END_MENU_TOKEN@-->
