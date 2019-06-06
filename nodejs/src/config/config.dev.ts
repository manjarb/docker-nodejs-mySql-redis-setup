export default {
    serve: {
        port: 8000
    },
    proxyServer: {
        host: '',
        port: 80
    },
    db: {
        dialect: "mysql",
        host: 'localhost',
        port: 3306,
        username: '',
        password: '',
        database: '',
        pool: {
            max: 100,
            min: 0,
            idle: 10000,
        },
        logging: true
    },
    redis: {
        host: ''
    }
}