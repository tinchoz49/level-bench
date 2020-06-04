const { Suite } = require('@dxos/benchmark-suite')
const level = require('level')
const levelmem = require('level-mem')
const ReadStream = require('./iterator-stream')

;(async () => {
  const suite = new Suite()
  const db = level('.bench')
  const dbmem = levelmem()
  const n = 1000

  suite.beforeAll(async () => {
    const op = [...Array(n).keys()].map(i => ({
      type: 'put',
      key: `key/${i}`,
      value: `value/${i}`
    }))

    await Promise.all([
      db.batch(op),
      dbmem.batch(op)
    ])
  })

  suite.test('level: read by get', async () => {
    for (let i = 0; i < n; i++) {
      if (await db.get(`key/${i}`) !== `value/${i}`) {
        throw new Error('wrong get')
      }
    }
  })

  suite.test('level: createReadStream', async () => {
    let i = 0
    const stream = db.createReadStream()
    stream.on('data', () => i++)
    await new Promise(resolve => stream.on('end', resolve))
    if (i !== n) throw new Error('missing messages')
  })

  suite.test('level: createReadStream (-maybeToRead nextTick)', async () => {
    let i = 0
    const stream = ReadStream(db.iterator())
    stream.on('data', () => i++)
    await new Promise(resolve => stream.on('end', resolve))
    if (i !== n) throw new Error('missing messages')
  })

  suite.test('level-mem: read by get', async () => {
    for (let i = 0; i < n; i++) {
      if (await dbmem.get(`key/${i}`) !== `value/${i}`) {
        throw new Error('wrong get')
      }
    }
  })

  suite.test('level-mem: createReadStream', async () => {
    let i = 0
    const stream = dbmem.createReadStream()
    stream.on('data', () => i++)
    await new Promise(resolve => stream.on('end', resolve))
    if (i !== n) throw new Error('missing messages')
  })

  suite.test('level-mem: createReadStream (-maybeToRead nextTick)', async () => {
    let i = 0
    const stream = ReadStream(dbmem.iterator())
    stream.on('data', () => i++)
    await new Promise(resolve => stream.on('end', resolve))
    if (i !== n) throw new Error('missing messages')
  })

  const result = await suite.run()

  suite.print(result)

  process.exit(0)
})()
