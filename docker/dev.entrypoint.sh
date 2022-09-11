#!/bin/bash

# シェルの動作設定
#   -e: コマンドがエラーになった時点でエラー終了
#   -u: 未定義変数を参照した場合にエラー終了
#   -x: 実行されるコマンドの引数を展開した上で表示

set -eux

cd /var/www

npm cache clean -f
npm install
npm run build
npm link
chmod +x /usr/local/lib/node_modules/@kuzrwkd/skys-cli

/usr/local/bin/wait-for-it.sh "$DATABASE_HOST":"$DATABASE_PORT" --timeout=30 --strict -- echo "=== dynamodb connected! ==="

skys migration:dynamodb:media --up && skys migration:dynamodb:newsfeed --up && skys migration:dynamodb:newsfeedIndex --up
skys seeder:dynamodb:media && skys seeder:dynamodb:newsfeedIndex

while true; do sleep 86400; done
