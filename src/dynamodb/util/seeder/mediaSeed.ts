import { BatchWriteCommand, BatchWriteCommandInput } from '@aws-sdk/lib-dynamodb';
import { dynamodbDocument } from '@kuzrwkd/skys-core/dynamodb';
import logger from '@kuzrwkd/skys-core/logger';

export const mediaTableSeeder = async () => {
  try {
    const command: BatchWriteCommandInput = {
      RequestItems: {
        Media: [
          {
            PutRequest: {
              Item: {
                id: 1,
                name: '日本経済新聞',
              },
            },
          },
          {
            PutRequest: {
              Item: {
                id: 2,
                name: 'Reuters',
              },
            },
          },
          {
            PutRequest: {
              Item: {
                id: 3,
                name: 'Bloomberg',
              },
            },
          },
        ],
      },
    };

    logger.info('MediaTable レコード作成開始');
    await dynamodbDocument.send(new BatchWriteCommand(command));
    logger.info('MediaTable レコード作成完了');
  } catch (e) {
    logger.error(e);
  }
};
