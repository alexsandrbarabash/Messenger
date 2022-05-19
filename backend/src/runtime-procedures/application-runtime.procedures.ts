import { BaseChildProcessProcedure } from './base-child-process.procedures';
import { ShellCommandsEnum } from './enums';

export class ApplicationRuntimeProcedures extends BaseChildProcessProcedure {
  public async startPrisma(): Promise<void> {
    this.logger.info('Prisma Schema Generate Started!');

    await this.execShellCommand(ShellCommandsEnum.PRISMA_START);

    this.logger.info('Prisma Schema Generate Finished!');
  }

  public async startSeed(): Promise<void> {
    this.logger.info('Seed Start!');

    await this.execShellCommand(ShellCommandsEnum.SEED);

    this.logger.info('Seed Finished!');
  }
}
