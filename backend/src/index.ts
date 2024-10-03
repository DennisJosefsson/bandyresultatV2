import { app, config, sequelize } from './utils/index.js'
const PORT = config['PORT']

async function start() {
  try {
    await sequelize.authenticate()

    console.log(`Connected to the ${process.env.NODE_ENV} database.`)
  } catch (error) {
    console.log(error)
    console.log(`Unable to connect to the ${process.env.NODE_ENV} database.`)
    return process.exit(1)
  }
  app.listen(PORT, () => {
    console.log('-------------------------------')
    console.log(`Server running on port ${PORT}`)
    console.log(new Date())
    console.log('-------------------------------')
  })
}

start()
  .then(() => {})
  .catch((err) => console.error(err))
