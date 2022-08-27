import dynamodbUseCase, { INewsfeedIndexTableUseCase } from '@kuzrwkd/skys-core/dynamodb';
import * as yargs from 'yargs';

const newsfeedIndexTableUseCase = dynamodbUseCase.resolve<INewsfeedIndexTableUseCase>('NewsfeedIndexTableUseCase');

export default class DynamoDBNewsfeedIndexTableSeederCommand implements yargs.CommandModule {
  command = 'seeder:dynamodb:newsfeedIndex';
  describe = 'no option.';

  builder(args: yargs.Argv) {
    return args.default('value', 'true');
  }

  async handler() {
    await newsfeedIndexTableUseCase.newsfeedIndexTableSeeder();
  }
}
