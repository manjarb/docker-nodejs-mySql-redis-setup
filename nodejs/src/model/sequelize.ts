import { Sequelize } from 'sequelize-typescript'
import config from '../config'

const chalk = require('chalk')
const now = () => new Date().toISOString().replace(/T/, ' ').replace(/Z/, '')
const logging = process.env.NODE_ENV === 'development'
    ?
    (sql: string) => {
        sql = sql.replace('Execute (default): ', '')
        console.log(`${chalk.bold('SQL')} ${now()} ${chalk.gray(sql)}`)
    }
    : console.log('Sequelize non development')


const sequelize: Sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    // database: config.db.database,
    dialect: config.db.dialect,
    // username: config.db.username,
    // password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    pool: config.db.pool
})

export const dbConnect = () => {
    sequelize.addModels([__dirname + '/instances'])
    sequelize.authenticate()
        .then((res) => {
            console.log('-------------------------------------')
            console.log('DATABASE UP')
            console.log('HOST  %s', config.db.host)
            console.log('PORT  %s', config.db.port)
            console.log('DATABASE %s', config.db.database)
            console.log('-------------------------------------')
        })
        .catch(err => {
            console.log('Unable to connect to the database', err)
        })
}