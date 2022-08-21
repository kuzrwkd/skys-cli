import dynamodbUseCase, { IMediaTableUseCase } from '@kuzrwkd/skys-core/dynamodb';
import * as yargs from 'yargs';

const mediaTableUseCase = dynamodbUseCase.resolve<IMediaTableUseCase>('MediaTableUseCase');

export default class DynamoDBMediaTableMigrationCommand implements yargs.CommandModule {
  command = 'migration:dynamodb:media';
  describe = 'use --up or --down option.';

  builder(args: yargs.Argv) {
    return args
      .option('up', {
        describe: 'Create a Media table in dynamodb',
      })
      .option('down', {
        describe: 'Remove Media table from dynamodb',
      })
      .conflicts('up', 'down');
  }

  async handler(args: yargs.Arguments) {
    try {
      if (args.up) {
        await mediaTableUseCase.createMediaTable();
        return;
      }
      if (args.down) {
        await mediaTableUseCase.deleteMediaTable();
        return;
      }
    } catch (err) {
      process.exit(1);
    }
  }
}
