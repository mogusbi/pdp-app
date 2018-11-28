const isDevelopment = process.env.NODE_ENV === 'development';
const isLambda = process.env.STAGE === 'production';
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

let config = {
  entities: [
    '.build/src/**/*.entity.js',
    'src/**/*.entity.ts'
  ],
  host: 'localhost',
  password: 'password',
  port: 3306,
  synchronize: true,
  type: 'mysql',
  username: 'sage'
};

if (isDevelopment) {
  config.database = 'app';
  config.logging = true;
} else if (isTest) {
  config.database = 'app_testing';
  config.logging = false;
  config.name = 'test';
}

if (isLambda) {
  config.entities = [
    '.build/src/**/*.entity.js'
  ];
} else {
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

module.exports = isProduction ? {} : config;
