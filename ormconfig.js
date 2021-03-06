const isLambda = process.env.NODE_ENV === 'lambda';
const isTest = process.env.NODE_ENV === 'test';

let config = {
  host: 'localhost',
  password: 'password',
  port: 3306,
  synchronize: true,
  type: 'mysql',
  username: 'sage'
};

if (!isLambda) {
  config.cli = {
    migrationsDir: 'src/migrations'
  };
  config.entities = [
    'src/**/*.entity.ts'
  ];

  config.migrations = [
    'src/migrations/**/*.ts'
  ];
  config.migrationsRun = true;
}

if (isTest) {
  config.database = 'app_testing';
  config.logging = false;
  config.name = 'test';
} else  {
  config.database = 'app';
  config.logging = true;
}

module.exports = config;
