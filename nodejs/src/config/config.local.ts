export default {
    serve: {
        port: 8080
    },
    proxyServer: {
        host: '',
        port: 80
    },
    db: {
        dialect: "mysql",
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'RAP2_DELOS_APP_LOCAL',
        pool: {
            max: 100,
            min: 0,
            idle: 10000,
        },
        logging: true
    },
    redis: {}
}