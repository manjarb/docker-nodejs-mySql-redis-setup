let configObj = 
    (process.env.NODE_ENV === 'local' && require('./config.local')).default ||
    (process.env.NODE_ENV === 'development' && require('./config.dev')).default ||
    require('./config.prod').default

if (process.env.NODE_ENV === 'development') {
    configObj.proxyServer.username = process.env.MY_USERNAME
    configObj.proxyServer.password = process.env.MY_PASSWORD
}

export default configObj