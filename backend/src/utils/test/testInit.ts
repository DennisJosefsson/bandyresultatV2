import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql'
const directoryToCopy = {
  source: '/home/dennisjosefsson/projekt/database/bandyresultat/init/testinit/',
  target: '/docker-entrypoint-initdb.d/',
}

let startedContainer: StartedPostgreSqlContainer

export const setup = async () => {
  const container = new PostgreSqlContainer('postgres:16-alpine')
    .withLogConsumer((stream) => {
      stream.on('err', (line) => console.error(line))
    })
    .withCopyDirectoriesToContainer([directoryToCopy])
    .withUsername('testdatabase')
    .withPassword('testdatabase')
    .withDatabase('testbandyresultat')

  startedContainer = await container.start()

  const testDbUrl = startedContainer.getConnectionUri()

  process.env.TESTDBURL = testDbUrl
}

export const teardown = async () => {
  await startedContainer.stop()
}
