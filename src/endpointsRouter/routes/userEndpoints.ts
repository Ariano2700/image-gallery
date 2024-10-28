import { userEndpointsI } from "../interfaces/userEndpointsInterface";

const userEndpoints: userEndpointsI = {
  getImagesEndpoint: (lastId) => `/api/users/get/all?lastId=${lastId}&limit=2`,
  getPersonalArianoImagesEndpoint: (lastId) =>
    `/api/users/get/personal?lastId=${lastId}&limit=2&uid=YiWOGI7vVrPzfFIwHaCAS52u1112`,
  getPersonalFatimaImagesEndpoint: (lastId) =>
    `/api/users/get/personal?lastId=${lastId}&limit=2&uid=ax5MY4ZKQoTz1pqpmP4bXOkYw1B3`,
};
export default userEndpoints;
