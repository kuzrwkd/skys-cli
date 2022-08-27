#!/usr/bin/env node

import yargs from 'yargs';

import DynamoDBCrawlerIndexTableMigrationCommand from '@/command/DynamoDBCrawlerIndexTableMigrationCommand';
import DynamoDBCrawlerIndexTableSeederCommand from '@/command/DynamoDBCrawlerIndexTableSeederCommand';
import DynamoDBMediaTableMigrationCommand from '@/command/DynamoDBMediaTableMigrationCommand';
import DynamoDBMediaTableSeederCommand from '@/command/DynamoDBMediaTableSeederCommand';
import DynamoDBNewsfeedTableMigrationCommand from '@/command/DynamoDBNewsfeedTableMigrationCommand';

yargs
  .locale('en')
  .usage('Usage: $0 <command> [options]')
  .command(new DynamoDBMediaTableMigrationCommand())
  .command(new DynamoDBNewsfeedTableMigrationCommand())
  .command(new DynamoDBCrawlerIndexTableMigrationCommand())
  .command(new DynamoDBMediaTableSeederCommand())
  .command(new DynamoDBCrawlerIndexTableSeederCommand())
  .recommendCommands()
  .demandCommand(1)
  .strict()
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help').argv;
