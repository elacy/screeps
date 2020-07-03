import { ErrorMapper } from "utils/ErrorMapper";
export enum LogLevel {
  DEBUG = 1,
  INFO,
  WARN,
  ERROR,
  FATAL
}

export class Logger {
  constructor(name: string, level: LogLevel = LogLevel.INFO) {
    this.name = name;
    this.level = level;
  }

  public setLevel(level: LogLevel) {
    this.level = level;
  }

  public debug(message: string): void {
    this.log(message, LogLevel.DEBUG);
  }

  public info(message: string): void {
    this.log(message, LogLevel.INFO);
  }

  public warn(message: string): void {
    this.log(message, LogLevel.WARN);
  }

  public error(message: string): void {
    this.log(message, LogLevel.ERROR);
  }

  public fatal(message: string): void {
    this.log(message, LogLevel.FATAL);
  }

  public exception(e: Error, level: LogLevel = LogLevel.ERROR) {
    if ("sim" in Game.rooms) {
      this.log(`${e.message}<br>${_.escape(e.stack)}`, level);
    } else {
      this.log(`${e.message}<br>${_.escape(ErrorMapper.sourceMappedStackTrace(e))}`, level);
    }
  }

  public log(message: string, level: LogLevel) {
    if (this.level <= level) {
      var log = `${this.name}->[${LogLevel[level]}] ${message}`;

      if (level >= LogLevel.ERROR) {
        log = `<span style='color:red'>${log}</span>`;
      }

      console.log(log);
    }
  }

  private level: LogLevel;
  private readonly name: string;
}
