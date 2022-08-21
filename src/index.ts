#!/usr/bin/env node

import yargs from 'yargs';

import DynamoDBCrawlerIndexTableMigrationCommand from '@/dynamodb/DynamoDBCrawlerIndexTableMigrationCommand';
import DynamoDBCrawlerIndexTableSeederCommand from '@/dynamodb/DynamoDBCrawlerIndexTableSeederCommand';
import DynamoDBMediaTableMigrationCommand from '@/dynamodb/DynamoDBMediaTableMigrationCommand';
import DynamoDBMediaTableSeederCommand from '@/dynamodb/DynamoDBMediaTableSeederCommand';
import DynamoDBNewsfeedTableMigrationCommand from '@/dynamodb/DynamoDBNewsfeedTableMigrationCommand';

yargs
  .locale('en')
  .usage('Usage: $0 <command> [options]')
  .command(new DynamoDBMediaTableMigrationCommand())
  .command(new DynamoDBNewsfeedTableMigrationCommand())
  .command(new DynamoDBMediaTableSeederCommand())
  .command(new DynamoDBCrawlerIndexTableMigrationCommand())
  .command(new DynamoDBCrawlerIndexTableSeederCommand())
  .recommendCommands()
  .demandCommand(1)
  .strict()
  .alias('v', 'version')
  .help('h')
  .alias('h', 'help').argv;
