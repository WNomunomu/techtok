# TechTok 起動方法

## 1. devcontainer の起動

### 利点

プログラミング言語やフレームワークの install を devcontainer が自動でやってくれます

### 前提

1. vscode が install されてること
2. vscode 拡張機能、「Remote - Development」extension が install されてること

### 起動

```bash
$ git clone https://github.com/WNomunomu/techtok.git
$ cd techtok
$ code . # vscode で techtok directory を open

# ctrl + shift + p でコマンドパレットを開く
# reopen in devcontainer を実行
# TechTok-FullStack-Devcontainer が起動

```

## 2. 各 application の起動

### frontend

```bash
$ cd frontend
$ bun install
$ bun run dev

# もし command not found: bun になったら
# devcontainer 修正の余地あり
$ source ~/.bashrc
```

### backend

```bash
$ cd backend
$ ./gradlew bootRun
```
