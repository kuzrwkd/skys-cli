import dynamodbUseCase, { INewsfeedTableUseCase } from '@kuzrwkd/skys-core/dynamodb';
import * as yargs from 'yargs';

const newsfeedTableUseCase: INewsfeedTableUseCase =
  dynamodbUseCase.resolve<INewsfeedTableUseCase>('NewsfeedTableUseCase');

export default class DynamoDBNewsfeedTableMigrationCommand implements yargs.CommandModule {
  command = 'migration:dynamodb:newsfeed';
  describe = 'use --up or --down option.';

  builder(args: yargs.Argv) {
    return args
      .option('up', {
        describe: 'Create a Newsfeed table in dynamodb',
      })
      .option('down', {
        describe: 'Remove Newsfeed table from dynamodb',
      })
      .conflicts('up', 'down');
  }

  async handler(args: yargs.Arguments) {
    try {
      if (args.up) {
        await newsfeedTableUseCase.createNewsfeedTable();
        return;
      }
      if (args.down) {
        await newsfeedTableUseCase.deleteNewsfeedTable();
        return;
      }
    } catch (err) {
      process.exit(1);
    }
  }
}
