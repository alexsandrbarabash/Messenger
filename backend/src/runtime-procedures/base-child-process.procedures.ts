import * as childProcess from 'child_process';
import pinoLogger from 'pino';

export class BaseChildProcessProcedure {
  constructor() {
    this.logger = pinoLogger({ prettyPrint: true });
  }

  protected readonly logger: pinoLogger.Logger;

  private streamCallbackForLogs(
    internalLogger: pinoLogger.Logger,
  ): (chunk: any) => void {
    return (chunk: any): void => {
      internalLogger.info(chunk);
    };
  }

  protected async execShellCommand(schellCommand: string): Promise<void> {
    await new Promise((resolve, reject) => {
      const execCommand = childProcess.exec(
        schellCommand,
        { env: process.env },
        (err) => {
          if (err) {
            this.logger.error('Error when execute shell command!', { err });

            return reject(err);
          }

          resolve(true);
        },
      );

      execCommand.stdout.on('data', this.streamCallbackForLogs(this.logger));
      execCommand.stderr.on('data', this.streamCallbackForLogs(this.logger));
    });
  }
}
