const { describe, before, it } = require('mocha')
const { expect } = require('chai')
const { setupServer } = require('./helpers/server')
const { setupKafka } = require('./helpers/kafka')
const { WASP_SENSOR_TYPE } = require('../../app/env')

const { TEST_PAYLOAD_1 } = require('./data/payloads')

describe('message Processing', function () {
  const context = {}
  setupServer(context)
  setupKafka(context)

  const singlePayloadTest = ({ context, description, payloadTemplate, expectation }) => {
    describe(description, function () {
      let payload

      before(async function () {
        payload = payloadTemplate(new Date().toISOString())
        context.result = await context.kafka.publishAndWaitForResults(
          `payloads.${WASP_SENSOR_TYPE}`,
          payload.message,
          1
        )
      })

      it(expectation, function () {
        const readings = context.result.get('readings')
        expect(readings).to.deep.equal(payload.expectedReadings)
        const events = context.result.get('events')
        expect(events).to.deep.equal(payload.expectedEvents)
      })
    })
  }

  describe('happy path', function () {
    singlePayloadTest({
      context,
      description: 'test payload with readings and events',
      payloadTemplate: TEST_PAYLOAD_1,
      expectation: 'should forward the correct readings and events',
    })
  })
})
