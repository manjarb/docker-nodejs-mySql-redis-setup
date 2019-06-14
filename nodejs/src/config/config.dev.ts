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
        host: 'db',
        port: 3306,
        username: 'test',
        password: '11501112',
        database: 'hsbcnet_testing',
        pool: {
            max: 100,
            min: 0,
            idle: 10000,
        },
        logging: true
    },
    redis: {
        host: 'redis'
    }
}