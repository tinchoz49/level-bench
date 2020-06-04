const { Suite } = require('@dxos/benchmark-suite')
const level = require('level')
const levelmem = require('level-mem')

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
      await db.get(`key/${i}`)
    }
  })

  suite.test('level: createReadStream', async () => {
    let i = 0
    const stream = db.createReadStream()
    stream.on('data', () => i++)
    await new Promise(resolve => stream.on('end', resolve))
    if (i !== n) throw new Error('missing messages')
  })

  suite.test('level-mem: read by get', async () => {
    for (let i = 0; i < n; i++) {
      await dbmem.get(`key/${i}`)
    }
  })

  suite.test('level-mem: createReadStream', async () => {
    let i = 0
    const stream = dbmem.createReadStream()
    stream.on('data', () => i++)
    await new Promise(resolve => stream.on('end', resolve))
    if (i !== n) throw new Error('missing messages')
  })

  const result = await suite.run()

  suite.print(result)

  process.exit(0)
})()
