#!/usr/bin/env node

import yargs from 'yargs';

import DynamoDBMediaTableMigrationCommand from '@/dynamodb/DynamoDBMediaTableMigrationCommand';
import DynamoDBMediaTableSeederCommand from '@/dynamodb/DynamoDBMediaTableSeederCommand';
import DynamoDBNewsFeedTableMigrationCommand from '@/dynamodb/DynamoDBNewsFeedTableMigrationCommand';

yargs
  .locale('en')
  .usage('Usage: $0 <command> [options]')
  .command(new DynamoDBMediaTableMigrationCommand())
  .command(new DynamoDBNewsFeedTableMigrationCommand())
  .command(new DynamoDBMediaTableSeederCommand())
  .recommendCommands()
  .demandCommand(1)
  .strict()
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help').argv;