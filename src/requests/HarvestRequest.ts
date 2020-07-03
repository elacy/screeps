import { BaseRequest } from "requests/BaseRequest";
import { BaseOrder } from "orders/BaseOrder";
import { HarvestOrder } from "orders/HarvestOrder";
import { State } from "state/State";
import { Register } from "state/Register";
import { Logger, LogLevel } from "utils/Logger";

var logger = new Logger("HarvestRequest", LogLevel.DEBUG);

@Register
export class HarvestRequest extends BaseRequest {
  constructor(target: string, value: number) {
    super();
    this.target = target;
    this.orders = [];
    this.value = value;
  }

  loop() {
    if (this.orders.length == 0) {
      var order = new HarvestOrder(this.Id);
      State.save(order);
      this.orders.push(order.Id);
      //logger.debug(`Created an order ${order.Id}`);
    }
    logger.debug(`Running Request ${this.Id}`);
    return false;
  }

  notify(order: BaseOrder, value: number): void {
    this.orders = this.orders.filter((id) => id !== order.Id);
    this.value -= value;
  }

  private readonly target: string;
  private orders: string[];
  private value: number;
}
