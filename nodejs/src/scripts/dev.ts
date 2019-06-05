import app from './app'
import config from '../config'

const start = () => {
    let port = config.serve.port
    console.log('----------------------')

    app.listen(port, () => {
        console.log('server start')
    })
}

start ()