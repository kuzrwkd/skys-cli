import dynamodbUseCase, { ICrawlerIndexTableUseCase } from '@kuzrwkd/skys-core/dynamodb';
import * as yargs from 'yargs';

const crawlerIndexTableUseCase = dynamodbUseCase.resolve<ICrawlerIndexTableUseCase>('CrawlerIndexTableUseCase');

export default class DynamoDBCrawlerIndexTableMigrationCommand implements yargs.CommandModule {
  command = 'migration:dynamodb:crawlerIndex';
  describe = 'use --up or --down option.';

  builder(args: yargs.Argv) {
    return args
      .option('up', {
        describe: 'Create a CrawlerIndex table in command',
      })
      .option('down', {
        describe: 'Remove CrawlerIndex table from command',
      })
      .conflicts('up', 'down');
  }

  async handler(args: yargs.Arguments) {
    try {
      if (args.up) {
        await crawlerIndexTableUseCase.createCrawlerIndexTable();
        return;
      }
      if (args.down) {
        await crawlerIndexTableUseCase.deleteCrawlerIndexTable();
        return;
      }
    } catch (err) {
      process.exit(1);
    }
  }
}
