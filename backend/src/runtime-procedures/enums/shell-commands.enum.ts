export enum ShellCommandsEnum {
  PRISMA_START = 'npm run generate-schema && prisma db push --skip-generate',
  SEED = 'cd seeds && tsc && npm run seed && cd ..',
}
