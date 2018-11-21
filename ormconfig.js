let config = {
  entities: [
    'src/**/*.entity.ts'
  ],
  host: 'localhost',
  migrations: [
    'migrations/**/*.ts'
  ],
  migrationsRun: true,
  password: 'password',
  port: 3306,
  synchronize: true,
  type: 'mysql',
  username: 'sage'
};

switch (process.env.NODE_ENV) {
case 'test':
  config.database = 'app_testing';
  break;
default:
  config.database = 'app';
  config.logging = true;
}

module.exports = config;
