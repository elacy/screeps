export const REGISTRATION_NAME = Symbol("registrationName");

export const Register = (target: any) => {
  Reflect.defineMetadata(REGISTRATION_NAME, target.name, target.prototype);
  return target;
};
