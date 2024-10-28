export interface paramsEndpointsI<T = void> {
  [key: string]: T extends void ? () => string : (...args: T[]) => string;
}
