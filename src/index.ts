#!/usr/bin/env node

import yargs from 'yargs';

import DynamoDBMediaTableMigrationCommand from '@/command/DynamoDBMediaTableMigrationCommand';
import DynamoDBMediaTableSeederCommand from '@/command/DynamoDBMediaTableSeederCommand';
import DynamoDBNewsfeedIndexTableMigrationCommand from '@/command/DynamoDBNewsfeedIndexTableMigrationCommand';
import DynamoDBNewsfeedIndexTableSeederCommand from '@/command/DynamoDBNewsfeedIndexTableSeederCommand';
import DynamoDBNewsfeedTableMigrationCommand from '@/command/DynamoDBNewsfeedTableMigrationCommand';

yargs
  .locale('en')
  .usage('Usage: $0 <command> [options]')
  .command(new DynamoDBMediaTableMigrationCommand())
  .command(new DynamoDBNewsfeedTableMigrationCommand())
  .command(new DynamoDBNewsfeedIndexTableMigrationCommand())
  .command(new DynamoDBMediaTableSeederCommand())
  .command(new DynamoDBNewsfeedIndexTableSeederCommand())
  .recommendCommands()
  .demandCommand(1)
  .strict()
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help').argv;
