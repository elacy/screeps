export const REPOSITORY_KEY = Symbol("repository");

export const Repository = (value: string) => (target: any) => {
  Reflect.defineMetadata(REPOSITORY_KEY, value, target.prototype);
  return target;
};
