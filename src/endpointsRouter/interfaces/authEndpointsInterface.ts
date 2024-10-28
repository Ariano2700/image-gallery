export interface authEndpointI {
  authSignInEndpoint: () => string;
  logOutEndpoint: () => string;
}
