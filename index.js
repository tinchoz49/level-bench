const { Suite } = require('@dxos/benchmark-suite')
const level = require('level-mem')

;(async () => {
  const suite = new Suite()
  const db = level()
  const n = 1000

  suite.beforeAll(async () => {
    const op = [...Array(n).keys()].map(i => ({
      type: 'put',
      key: `key/${i}`,
      value: `value/${i}`
    }))

    await db.batch(op)
  })

  suite.test('read by get', async () => {
    for (let i = 0; i < n; i++) {
      await db.get(`key/${i}`)
    }
  })

  suite.test('createReadStream', async () => {
    let i = 0
    const stream = db.createReadStream()
    stream.on('data', () => i++)
    await new Promise(resolve => stream.on('end', resolve))
    if (i !== n) throw new Error('missing messages')
  })

  const result = await suite.run()

  suite.print(result)

  process.exit(0)
})()
