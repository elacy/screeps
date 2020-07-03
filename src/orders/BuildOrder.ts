import { BaseOrder } from "./BaseOrder";

export class BuildOrder extends BaseOrder {
  work(): boolean {
    return false;
  }
}
