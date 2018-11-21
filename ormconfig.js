module.exports = [
  {
    cli: {
      migrationsDir: 'migrations'
    },
    database: 'app',
    entities: [
      'src/**/*.entity.ts'
    ],
    host: 'localhost',
    logging: true,
    migrations: [
      'migrations/**/*.ts'
    ],
    migrationsRun: true,
    password: 'password',
    port: 3306,
    synchronize: true,
    type: 'mysql',
    username: 'sage'
  },
  {
    database: 'app_testing',
    entities: [
      'src/**/*.entity.ts'
    ],
    host: 'localhost',
    migrations: [
      'migrations/**/*.ts'
    ],
    migrationsRun: true,
    name: 'test',
    password: 'password',
    port: 3306,
    synchronize: true,
    type: 'mysql',
    username: 'sage'
  }
];
