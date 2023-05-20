// const pg = require("pg");
const Sequelize = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = require('./config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
});

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations is up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const rollbackMigrations = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
  console.log('Rollingback migration');
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Connected to database');
  } catch (error) {
    console.log('Failed to connect to database', error);
    return process.exit(1);
  }

  return null;
}

module.exports = {
  sequelize,
  connectToDatabase,
  runMigrations,
  rollbackMigrations,
};