# ORM

## Drizzle

$ npm install drizzle-orm better-sqlite3
$ npm install -D drizzle-kit

## UPGRADE DIARY

[20240202] v10- change sync service without sync seq history table
[20240125]chage duplex stream to stream

entities: This property specifies the path to your entity classes. Entity classes define the structure and metadata of your database tables. TypeORM uses these classes to create, query, and manipulate the database schema. I

migrations: This property specifies the path to your migration scripts. Migration scripts are used to version and evolve the database schema over time. They define changes to the database, such as creating or modifying tables. 

subscribers: Subscribers are event listeners that can be used to execute code in response to specific database events, such as beforeInsert, afterUpdate, etc. In your configuration, TypeORM is looking for subscriber classes in the "src/subscriber/**/*.ts" directory.