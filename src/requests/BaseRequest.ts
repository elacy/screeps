import { BaseStateObject } from "../state/BaseStateObject";
import { BaseOrder } from "orders/BaseOrder";
import { Repository } from "state/Repository";

@Repository("Requests")
export abstract class BaseRequest extends BaseStateObject {
  abstract notify(order: BaseOrder, value: number): void;
}
