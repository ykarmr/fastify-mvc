# ベースイメージとして公式のNode.jsイメージを使用
FROM node:20
ENV NODE_ENV=development

# 作業ディレクトリを作成
WORKDIR /app

# プロジェクトファイルをコピー
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY src /app/src
COPY prisma /app/prisma
COPY entrypoint.sh /app/entrypoint.sh
COPY tsconfig.json /app/tsconfig.json

# 依存関係をインストール
RUN npm ci

# Prisma CLIをグローバルにインストール
RUN npm install -g prisma

# Prismaのマイグレーションを実行
RUN npx prisma generate

RUN chmod +x entrypoint.sh

# エントリポイントスクリプトを実行
ENTRYPOINT ["./entrypoint.sh"]
