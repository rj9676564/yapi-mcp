/**
 * 日志级别枚举
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

/**
 * 获取日志级别
 * @param level 日志级别字符串
 * @returns LogLevel 枚举值
 */
function getLogLevel(level: any): LogLevel {
  if (!level || typeof level !== 'string') return LogLevel.INFO;
  switch (level.toLowerCase()) {
    case 'debug':
      return LogLevel.DEBUG;
    case 'info':
      return LogLevel.INFO;
    case 'warn':
      return LogLevel.WARN;
    case 'error':
      return LogLevel.ERROR;
    case 'none':
      return LogLevel.NONE;
    default:
      return LogLevel.INFO;
  }
}

/**
 * 日志工具类
 */
export class Logger {
  private readonly prefix: string;
  private readonly logLevel: LogLevel;
  private readonly isStdioMode: boolean;
  
  constructor(prefix: string, logLevel: LogLevel | string = LogLevel.INFO) {
    this.prefix = prefix;
    this.logLevel = typeof logLevel === 'string' ? getLogLevel(logLevel) : logLevel;
    // 检测是否为stdio模式
    this.isStdioMode = process.env.NODE_ENV === "cli" || process.argv.includes("--stdio");
  }
  
  /**
   * 输出调试日志
   * @param message 日志消息
   * @param args 额外参数
   */
  debug(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      // 始终使用 console.warn (stderr) 避免干扰 stdio 协议
      console.warn(`[DEBUG][${this.prefix}] ${message}`, ...args);
    }
  }
  
  /**
   * 输出信息日志
   * @param message 日志消息
   * @param args 额外参数
   */
  info(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.INFO) {
      // 始终使用 console.warn (stderr) 避免干扰 stdio 协议
      console.warn(`[INFO][${this.prefix}] ${message}`, ...args);
    }
  }
  
  /**
   * 输出警告日志
   * @param message 日志消息
   * @param args 额外参数
   */
  warn(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.WARN) {
      console.warn(`[WARN][${this.prefix}] ${message}`, ...args);
    }
  }
  
  /**
   * 输出错误日志
   * @param message 日志消息
   * @param args 额外参数
   */
  error(message: string, ...args: any[]): void {
    if (this.logLevel <= LogLevel.ERROR) {
      console.error(`[ERROR][${this.prefix}] ${message}`, ...args);
    }
  }
} 