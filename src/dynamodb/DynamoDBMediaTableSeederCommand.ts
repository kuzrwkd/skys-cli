import dynamodbUseCase, { IMediaTableUseCase } from '@kuzrwkd/skys-core/dynamodb';
import * as yargs from 'yargs';

const mediaTableUseCase = dynamodbUseCase.resolve<IMediaTableUseCase>('MediaTableUseCase');

export default class DynamoDBMediaTableSeederCommand implements yargs.CommandModule {
  command = 'seeder:dynamodb:media';
  describe = 'no option.';

  builder(args: yargs.Argv) {
    return args.default('value', 'true');
  }

  async handler() {
    await mediaTableUseCase.mediaTableSeeder();
  }
}
