const { Suite } = require('@dxos/benchmark-suite')
const level = require('level')
const levelmem = require('level-mem')
const queueMicrotask = require('queue-microtask')

if (process.env.MICROTASK && typeof window !== 'undefined') {
  process.nextTick = (...args) => {
    if (args.length === 1) {
      return queueMicrotask(args[0])
    }

    queueMicrotask(() => args[0](...args.slice(1, args.length)))
  }
}

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

  test(db, suite, 'level', n)
  test(db, suite, 'level-mem', n)

  const result = await suite.run()

  suite.print(result)

  process.exit(0)
})()

function test (db, suite, title, max) {
  suite.test(`${title}: read by get`, async () => {
    for (let i = 0; i < max; i++) {
      if (await db.get(`key/${i}`) !== `value/${i}`) {
        throw new Error('wrong get')
      }
    }
  })

  suite.test(`${title}: createReadStream`, async () => {
    let i = 0
    const stream = db.createReadStream()
    stream.on('data', () => i++)
    await new Promise(resolve => stream.on('end', resolve))
    if (i !== max) throw new Error('missing messages')
  })
}
