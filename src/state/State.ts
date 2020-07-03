import { Logger, LogLevel } from "utils/Logger";
import { REGISTRATION_NAME } from "./Register";
import { BaseStateObject } from "./BaseStateObject";
import { plainToClass, classToPlain } from "class-transformer";
import { REPOSITORY_KEY } from "./Repository";
import { ClassType } from "class-transformer/ClassTransformer";
import { HarvestOrder } from "orders/HarvestOrder";
import { HarvestRequest } from "requests/HarvestRequest";

const logger = new Logger("State");

export declare type Constructor<T> = Function & { prototype: T };

export class State {
  private static typeDict: { [id: string]: ClassType<any> } = {};

  private static released: { [id: string]: BaseStateObject } = {};

  public static Register<T>(c: ClassType<T>): void {
    var name = Reflect.getMetadata(REGISTRATION_NAME, c.prototype);
    logger.debug(`registered ${name} as ${c.name}`);
    State.typeDict[name] = c;
  }

  public static save<T extends BaseStateObject>(obj: T): void {
    var repo = State.getRepoByObj(obj);
    repo[obj.Id] = classToPlain(obj);
  }

  private static cast<T extends BaseStateObject>(obj: any): T {
    var type = State.typeDict[obj["Type"]];
    var cls = plainToClass(type, obj);

    if (!State.released[obj["Id"]]) {
      State.released[obj["Id"]] = cls;
    }

    return State.released[obj["Id"]] as T;
  }

  public static get<T extends BaseStateObject>(c: ClassType<T>, id: string) {
    if (State.released[id]) {
      return State.released[id] as T;
    }

    var repo = State.getRepoByType(c);
    return State.cast<T>(repo[id]);
  }

  public static *getAll<T extends BaseStateObject>(c: Constructor<T>) {
    var repo = State.getRepoByType(c);
    logger.debug(`Pulling repo for ${c.name} which contains ${Object.keys(repo).length} items`);

    for (var id in repo) {
      var obj = State.cast<T>(repo[id]);
      logger.debug(`Returning item ${obj.Id} which has type ${typeof obj}`);

      if (obj instanceof c) {
        logger.debug(`Yielding item ${obj.Id}`);
        yield obj;
      }
    }
  }

  private static getRepoByObj<T extends BaseStateObject>(obj: T) {
    return State.getRepo(obj.Repository);
  }

  private static getRepoByType<T extends BaseStateObject>(c: Constructor<T>) {
    var repoName = Reflect.getMetadata(REPOSITORY_KEY, c.prototype);

    if (!repoName) {
      throw new Error(`Repository name is not defined for ${c}`);
    }

    return State.getRepo(repoName);
  }

  private static getRepo(name: string) {
    if (!Memory.repositories) {
      Memory.repositories = {};
    }

    if (!Memory.repositories[name]) {
      Memory.repositories[name] = {};
    }

    return Memory.repositories[name];
  }

  private static clear(): void {
    RawMemory.set("{}");
    State.released = {};
  }

  private static init(): void {
    logger.info(`--------Tick ${Game.time} with version ${Memory.version}`);

    State.Register(HarvestOrder);
    State.Register(HarvestRequest);

    State.ensureMemoryVersion();
  }

  private static cleanupCreepMemory() {
    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
      if (!(name in Game.creeps)) {
        delete Memory.creeps[name];
      }
    }
  }

  private static saveAll(): void {
    for (var key in State.released) {
      State.save(State.released[key]);
    }

    logger.debug(`Saved ${Object.keys(State.released).length} items`);
  }

  private static ensureMemoryVersion() {
    if (Memory.version) {
      if (Memory.version != State.CODE_VERSION) {
        logger.info(`====CODE UPDATE DETECTED====<br/>${Memory.version} => ${State.CODE_VERSION}`);
        State.clear();
        Memory.version = State.CODE_VERSION;
      }
    } else {
      Memory.version = State.CODE_VERSION;
    }
  }

  public static wrapLoop(loop: () => void): () => void {
    return () => {
      try {
        try {
          State.init();
          loop();
        } finally {
          State.saveAll();
          State.cleanupCreepMemory();
        }
      } catch (e) {
        if (e instanceof Error) {
          logger.exception(e);
        } else {
          logger.fatal(`Unable to handle error ${e}`);
          throw e;
        }
      }
    };
  }

  private static CODE_VERSION = "__BUILDID__";
}
