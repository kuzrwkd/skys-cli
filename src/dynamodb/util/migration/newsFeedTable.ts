import {
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteTableCommand,
  DeleteTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import { dynamodbDocument } from '@kuzrwkd/skys-core/dynamodb';
import logger from '@kuzrwkd/skys-core/logger';

export const createNewsFeedTable = async () => {
  const command: CreateTableCommandInput = {
    TableName: process.env.NEWSFEED_TABLE_NAME,
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' },
      { AttributeName: 'article_created_at', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'article_created_at', AttributeType: 'S' },
      { AttributeName: 'url', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'UrlIndex',
        KeySchema: [{ AttributeName: 'url', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
  };
  logger.info('NewsFeedTable マイグレーション開始');
  const result = dynamodbDocument.send(new CreateTableCommand(command));
  logger.info('NewsFeedTable マイグレーション終了', result);
};

export const deleteNewsFeedTable = async () => {
  const command: DeleteTableCommandInput = {
    TableName: process.env.NEWSFEED_TABLE_NAME,
  };
  logger.info('NewsFeedTable テーブル削除開始');
  const result = await dynamodbDocument.send(new DeleteTableCommand(command));
  logger.info('NewsFeedTable テーブル削除終了', result);
};
