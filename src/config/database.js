module.exports = {
  dialect: 'mariadb',
  host: '35.171.122.245',
  username: 'root',
  password: '190790edu',
  database: 'promptmode',
  port: '3306',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    undercoredAll: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
