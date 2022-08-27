import dynamodbUseCase, { INewsfeedIndexTableUseCase } from '@kuzrwkd/skys-core/dynamodb';
import * as yargs from 'yargs';

const newsfeedIndexTableUseCase = dynamodbUseCase.resolve<INewsfeedIndexTableUseCase>('NewsfeedIndexTableUseCase');

export default class DynamoDBNewsfeedIndexTableMigrationCommand implements yargs.CommandModule {
  command = 'migration:dynamodb:newsfeedIndex';
  describe = 'use --up or --down option.';

  builder(args: yargs.Argv) {
    return args
      .option('up', {
        describe: 'Create a NewsfeedIndex table in command',
      })
      .option('down', {
        describe: 'Remove NewsfeedIndex table from command',
      })
      .conflicts('up', 'down');
  }

  async handler(args: yargs.Arguments) {
    try {
      if (args.up) {
        await newsfeedIndexTableUseCase.createNewsfeedIndexTable();
        return;
      }
      if (args.down) {
        await newsfeedIndexTableUseCase.deleteNewsfeedIndexTable();
        return;
      }
    } catch (err) {
      process.exit(1);
    }
  }
}
