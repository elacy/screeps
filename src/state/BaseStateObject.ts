import { REPOSITORY_KEY } from "./Repository";
import { REGISTRATION_NAME } from "./Register";
import { State } from "./State";
export abstract class BaseStateObject {
  public readonly Id: string;
  public static counter: number = 0;
  public readonly Type: string;
  public readonly Repository: string;

  constructor() {
    this.Id = `${Game.time}-${BaseStateObject.counter++}-${Math.random()}`;
    this.Type = Reflect.getMetadata(REGISTRATION_NAME, this);
    this.Repository = Reflect.getMetadata(REPOSITORY_KEY, this);

    if (!this.Type) {
      throw Error("State Objects Require Type");
    }

    if (!this.Repository) {
      throw Error("State Objects Require Repository");
    }
  }

  public save(): void {
    State.save(this);
  }

  public abstract loop(): boolean;
}
