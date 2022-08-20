import {
  CreateTableCommand,
  CreateTableCommandInput,
  DeleteTableCommand,
  DeleteTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import { dynamodbDocument } from '@kuzrwkd/skys-core/dynamodb';
import logger from '@kuzrwkd/skys-core/logger';

export const createMediaTable = async () => {
  const command: CreateTableCommandInput = {
    TableName: process.env.MEDIA_TABLE_NAME,
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };
  logger.info('MediaTable マイグレーション開始');
  const result = await dynamodbDocument.send(new CreateTableCommand(command));
  logger.info('MediaTable マイグレーション終了', result);
};

export const deleteMediaTable = async () => {
  const command: DeleteTableCommandInput = {
    TableName: process.env.MEDIA_TABLE_NAME,
  };
  logger.info('MediaTable テーブル削除開始');
  const result = await dynamodbDocument.send(new DeleteTableCommand(command));
  logger.info('MediaTable テーブル削除終了', result);
};
