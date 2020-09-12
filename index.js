const express = require('express')

const server = express()
server.use(express.json())

//import router
const projectRouter = require('./routers/projectRouter.js')
const actionRouter = require('./routers/actionRouter.js')

//use router
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)


const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})