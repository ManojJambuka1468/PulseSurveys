import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  // issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
  // issuer:'https://idsvr4.azurewebsites.net',
  // issuer:'https://localhost:7002',
  issuer:'https://app-auth-eastus-dev-001.azurewebsites.net',
  // URL of the SPA to redirect the user to after login
  // redirectUri: 'http://localhost:4200/pulse-surveys',
  redirectUri: 'http://localhost:4200',
  postLogoutRedirectUri: "http://localhost:4200",
  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'spa',
  clientId: 'WebClient',
  dummyClientSecret:'secret',
  // scope: 'openid profile email offline_access api',
  scope: 'openid profile email phone address WebApi',
  responseType: 'code',
  showDebugInformation: true,
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
}