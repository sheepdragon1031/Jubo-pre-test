# Jubo

### 1. Frontend: Next.js application

This application is the primary user-facing application. Once it’s up and running (see Development section), it’s available on http://localhost:3000/.

### 2. Backend: Strapi application

Design APIs fast, manage content easily.Strapi is the leading open-source headless CMS. It’s 100% JavaScript, fully customizable and developer-first.

其他說明: 
後端使用的資料庫是SQLite，原因是在開發上更加方便，
strapi本身還官方支援MySQL、PostgreSQL但是BD本身還是有另外安裝，
這部分和內容要求不太相同，而也沒有處理CORS或找者資料庫權限問題等。

## Installation

### 1. Clone the applicatio

### 2. Install 

1. frontend
```sh
cd jubo-pre-test && yarn install
```
2. backend

```sh
cd jubo-cms && yarn install
```


### 3. Create a .env file and copy the contents from .env.example

Frontend directory Create and copy the Google client credentials to env
 
Backend set HOST to .env and config/middleware.js origin 

### 4. Start the frontend and strapiurl application

1. frontend
```sh
cd jubo-pre-test && yarn dev
```
2. backend

```sh
cd jubo-cms && yarn develop
```

# page

## index 主介面
![https://i.imgur.com/Zisf874.png](https://i.imgur.com/Zisf874.png)
* Patients 預設五個資料來自DB


### 點擊 Patients List 後
![(https://i.imgur.com/W8elUjZ.png](https://i.imgur.com/W8elUjZ.png)

* Dialog 右上增加可新增 Order 按鈕
* 右下 Edit Icon 點擊後會出現輸入框
* Send Icon 資料Put更新功能
* 右下 Delete icon 點擊後會刪除單筆

![https://i.imgur.com/VmZND9G.png](https://i.imgur.com/VmZND9G.png)
