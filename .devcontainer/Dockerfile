# カスタムDockerfile
FROM mcr.microsoft.com/devcontainers/java:1-21-bullseye

# Bunをインストール
RUN curl -fsSL https://bun.sh/install | bash

# PATHにBunを追加
ENV PATH="/root/.bun/bin:$PATH"

# Node.jsもインストール（既存のfeaturesと競合しないように）
RUN apt-get update && apt-get install -y \
  curl \
  && rm -rf /var/lib/apt/lists/*

# vsCodeユーザーでもBunを使用可能にする
USER vscode
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/home/vscode/.bun/bin:$PATH"

USER root
