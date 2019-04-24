const server = require('./server')

server.listen(80 || process.env.PORT)
