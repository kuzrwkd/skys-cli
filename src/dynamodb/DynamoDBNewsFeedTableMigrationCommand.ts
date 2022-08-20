import * as yargs from 'yargs';

import { createNewsFeedTable, deleteNewsFeedTable } from '@/dynamodb/util/migration/newsFeedTable';

export default class DynamoDBNewsFeedTableMigrationCommand implements yargs.CommandModule {
  command = 'migration:dynamodb:newsfeed';
  describe = 'use --up or --down option.';

  builder(args: yargs.Argv) {
    return args
      .option('up', {
        describe: 'Create a NewsFeed table in dynamodb',
      })
      .option('down', {
        describe: 'Remove NewsFeed table from dynamodb',
      })
      .conflicts('up', 'down');
  }

  async handler(args: yargs.Arguments) {
    try {
      if (args.up) {
        await createNewsFeedTable();
        return;
      }
      if (args.down) {
        await deleteNewsFeedTable();
        return;
      }
    } catch (err) {
      process.exit(1);
    }
  }
}
