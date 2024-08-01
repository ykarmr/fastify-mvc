#!/bin/sh

# データベースのマイグレーションを実行
npx prisma migrate deploy
npx npm run build

# サーバを起動
node ./dist/server.js
