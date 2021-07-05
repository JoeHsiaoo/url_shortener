# Content
* [Environment](#environment)
* [Quick Start](#quick-start)
* [Test](#test)
* [About](#about)

# Environment
* Node version: 14.16.1
* PostgreSQL version: 12.4
* Redis version: 6.0.8
	
# Quick Start

## 1. Clone the repository
```
$ git clone https://github.com/JoeHsiaoo/url_shortener.git
```

## 2. Edit .env file
* HOST: express server host
* PORT: express server port
* DB_HOST: PostgreSQL host
* DB_PORT: PostgreSQL port
* DB_USER: PostgreSQL user
* DB_PASSWORD: PostgreSQL password
* DB_NAME: PostgreSQL database name
* REDIS_HOST: Redis host
* REDIS_PORT: Redis port
* REDIS_PASSWORD: Redis password

## 3. Start the server
```
$ npm install
$ npm start
```	

# Test
```
$ npm test
```	
# About

## Tech stack
* 考量到短網址服務可能會有會員、金流等功能，所以採用關聯式資料庫PostgreSQL
* 因為可能有短時間內高併發的狀況，考量負載與效能，需要記憶體資料庫，所以採用Redis

## Third party packages
* express: 網頁伺服器框架
* debug & morgan: logger
* sequelize: ORM
* pg & pg-store: PostgreSQL相關套件
* ioredis: Redis 相關套件
* dotenv: .env 設定檔套件
* express-validator: 檢查 request 參數與消毒的 middleware
* express-rate-limit: rate limit套件
* crypto-random-string: 產生隨機字串作為短網址 id
* mocha & chai & sinon: 測試相關套件
* eslint: linter