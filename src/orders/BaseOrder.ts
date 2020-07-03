import { BaseStateObject } from "state/BaseStateObject";
import { Repository } from "state/Repository";

@Repository("Orders")
export abstract class BaseOrder extends BaseStateObject {
  constructor(request: string) {
    super();
    this.request = request;
  }

  loop(): boolean {
    return this.work();
  }

  abstract work(): boolean;

  private request: string;
}
