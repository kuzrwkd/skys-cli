#!/bin/bash

# シェルの動作設定
#   -e: コマンドがエラーになった時点でエラー終了
#   -u: 未定義変数を参照した場合にエラー終了
#   -x: 実行されるコマンドの引数を展開した上で表示

set -eux

cd /var/www

npm cache clean -f
npm install @kuzrwkd/skys-cli

node_modules/.bin/skys migration:dynamodb:media --up && node_modules/.bin/skys migration:dynamodb:newsfeed --up && node_modules/.bin/skys migration:dynamodb:newsfeedIndex --up
node_modules/.bin/skys seeder:dynamodb:media && node_modules/.bin/skys seeder:dynamodb:newsfeedIndex

while true; do sleep 86400; done
