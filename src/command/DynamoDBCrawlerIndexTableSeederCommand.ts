import dynamodbUseCase, { ICrawlerIndexTableUseCase } from '@kuzrwkd/skys-core/dynamodb';
import * as yargs from 'yargs';

const crawlerIndexTableUseCase = dynamodbUseCase.resolve<ICrawlerIndexTableUseCase>('CrawlerIndexTableUseCase');

export default class DynamoDBCrawlerIndexTableSeederCommand implements yargs.CommandModule {
  command = 'seeder:dynamodb:crawlerIndex';
  describe = 'no option.';

  builder(args: yargs.Argv) {
    return args.default('value', 'true');
  }

  async handler() {
    await crawlerIndexTableUseCase.crawlerIndexTableSeeder();
  }
}
