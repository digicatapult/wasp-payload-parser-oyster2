const { buildService } = require('@digicatapult/wasp-payload-processor')
const moment = require('moment')
const { WASP_SENSOR_TYPE } = require('./env')

const parseUTCTimestamp = (ts) => {
  return moment.utc(ts).toISOString()
}

const payloadProcessor =
  ({ logger }) =>
  ({ thingId, payload }) => {
    const events = [],
      readings = []

    const records = payload.Records
    for (const record of records) {
      const recordTimestamp = parseUTCTimestamp(record.DateUTC)
      for (const field of record.Fields) {
        switch (field.FType) {
          case 0: {
            const gpsTime = parseUTCTimestamp(field.GpsUTC)
            readings.push({
              dataset: {
                thingId,
                type: 'latitude',
                label: 'gps',
                unit: '°',
              },
              timestamp: gpsTime,
              value: field.Lat,
            })
            readings.push({
              dataset: {
                thingId,
                type: 'longitude',
                label: 'gps',
                unit: '°',
              },
              timestamp: gpsTime,
              value: field.Long,
            })
            readings.push({
              dataset: {
                thingId,
                type: 'altitude',
                label: 'gps',
                unit: 'm',
              },
              timestamp: gpsTime,
              value: field.Alt,
            })
            events.push({
              thingId,
              timestamp: gpsTime,
              type: 'location',
              details: {
                latitude: field.Lat,
                latitudeUnit: '°',
                longitude: field.Long,
                longitudeUnit: '°',
                altitude: field.Alt,
                altitudeUnit: 'm',
              },
            })
            break
          }
          case 24: {
            events.push({
              thingId,
              timestamp: recordTimestamp,
              type: 'impact',
              details: {
                peakForce: field.Peak,
                peakForceUnit: 'mg',
                averageForce: field.Avg,
                averageForceUnit: 'mg',
                duration: field.Dur,
                durationUnit: 'ms',
              },
            })
            break
          }
          default:
            logger.debug(`Skipping unknown field with FType ${field.FType}`)
            logger.trace(`Skipping unknown field %j`, field)
        }
      }
    }

    return { events, readings }
  }

const { startServer, createHttpServer } = buildService({
  sensorType: WASP_SENSOR_TYPE,
  payloadProcessor,
})

module.exports = { startServer, createHttpServer }
