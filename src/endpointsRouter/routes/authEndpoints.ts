import { authEndpointI } from "../interfaces/authEndpointsInterface";

const authEndpoints: authEndpointI = {
  authSignInEndpoint: () => "/api/auth/signIn/post",
  logOutEndpoint: () => "/api/auth/logout/post",
};
export default authEndpoints;
