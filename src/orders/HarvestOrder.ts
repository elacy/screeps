import { Logger, LogLevel } from "utils/Logger";
import { BaseOrder } from "./BaseOrder";
import { Register } from "state/Register";
import { REPOSITORY_KEY } from "state/Repository";

const logger = new Logger("HarvestOrder", LogLevel.DEBUG);

@Register
export class HarvestOrder extends BaseOrder {
  constructor(request: string) {
    super(request);
    var repoName = Reflect.getMetadata(REPOSITORY_KEY, this);
  }

  work(): boolean {
    logger.debug(`Running HarvestOrder ${this.Id}`);
    return true;
  }
}
