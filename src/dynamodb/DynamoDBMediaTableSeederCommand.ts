import * as yargs from 'yargs';

import { mediaTableSeeder } from '@/dynamodb/util/seeder/mediaSeed';

export default class DynamoDBMediaTableSeederCommand implements yargs.CommandModule {
  command = 'seeder:dynamodb:media';
  describe = 'no option.';

  builder(args: yargs.Argv) {
    return args.default('value', 'true');
  }

  async handler() {
    await mediaTableSeeder();
  }
}
