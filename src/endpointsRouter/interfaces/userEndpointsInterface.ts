import { paramsEndpointsI } from "./paramsEndpointsInterface";

export interface userEndpointsI extends paramsEndpointsI<string> {
  getImagesEndpoint: (lastId: string) => string;
  getPersonalArianoImagesEndpoint: (lastId: string) => string;
  getPersonalFatimaImagesEndpoint: (lastId: string) => string;
}
