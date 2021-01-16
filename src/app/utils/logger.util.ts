import {environment} from '../../environments/environment';

const {
  logLevel,
} = environment;

export type LogLevels = 0 | 1 | 2;
export const LOG_LEVEL_DEBUG = 0;
export const LOG_LEVEL_INFO = 1;
export const LOG_LEVEL_ERROR = 2;

export class LoggerUtil {
  // context name
  private readonly _name: string;

  constructor(name: string) {
    this._name = name;
  }

  /**
   * log for debugging
   * @param context context
   * @param message message
   */
  static debug(context: string, message: string): void {
    if (logLevel >= LOG_LEVEL_DEBUG) {
      console.log(context, message);
    }
  }

  /**
   * log for error
   * @param context context
   * @param message message
   * @param error error
   */
  static error(context: string, message: string, error?: Error | any): void {
    if (logLevel >= LOG_LEVEL_ERROR) {
      console.log(context, message, error);
    }
  }

  /**
   * get logger from class
   * @param c class
   */
  static fromClass(c: any): LoggerUtil {
    return new LoggerUtil(c.constructor.name);
  }

  /**
   * log for debugging
   * @param context context
   * @param message message
   */
  debug(context: string, message: any): void {
    if (logLevel >= LOG_LEVEL_DEBUG) {
      console.log(`[${this._name}] ${context}`, message);
    }
  }

  /**
   * log for error
   * @param context context
   * @param message message
   * @param error error
   */
  error(context: string, message: any, error?: Error | any): void {
    if (logLevel >= LOG_LEVEL_ERROR) {
      console.log(`[${this._name}] ${context}`, message, error);
    }
  }
}
