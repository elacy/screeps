import "reflect-metadata";
import { Logger, LogLevel } from "utils/Logger";
import { State } from "state/State";
import { BaseRequest } from "requests/BaseRequest";
import { BaseOrder } from "orders/BaseOrder";
import { HarvestRequest } from "./requests/HarvestRequest";
import { HarvestOrder } from "orders/HarvestOrder";

const logger = new Logger("Main");
// Replaced during build

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = State.wrapLoop(() => {
  logger.debug("Starting Orders");
  var r = false;
  for (var order of State.getAll(BaseOrder)) {
    logger.debug(`Running order ${order.Id}`);
    order.loop();
    r = true;
  }

  logger.debug("Ending Orders");

  logger.debug("Starting Requests");

  for (var request of State.getAll(BaseRequest)) {
    logger.debug(`Running request ${request.Id}`);
    request.loop();
    r = true;
  }

  if (Memory.state == 1) {
    logger.info("Added a request");
    State.save(new HarvestRequest("idf", 20));
    Memory.state = 3;
  }

  if (!Memory.state) {
    Memory.state = 1;
  }

  logger.debug("Ending Requests");
});
