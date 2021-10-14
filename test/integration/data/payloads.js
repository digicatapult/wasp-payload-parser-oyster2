const TEST_PAYLOAD_1 = (messageTimestamp) => ({
  message: {
    key: '00000000-0000-0000-0000-000000000000',
    value: JSON.stringify({
      thingId: '00000000-0000-0000-0000-000000000000',
      type: 'oyster2',
      ingest: 'dm-oem-server',
      ingestId: '359215107008600',
      timestamp: messageTimestamp,
      payload: {
        SerNo: 273964,
        IMEI: '359215107008600',
        ICCID: '8944110068486062610',
        ProdId: 77,
        FW: '77.2.2.8',
        Records: [
          {
            SeqNo: 48,
            Reason: 46,
            DateUTC: '2021-09-22 08:20:00',
            Fields: [
              {
                GpsUTC: '2021-09-22 08:19:31',
                Lat: 52.2247532,
                Long: -0.2579426,
                Alt: 20,
                Spd: 0,
                SpdAcc: 6,
                Head: 147,
                PDOP: 17,
                PosAcc: 18,
                GpsStat: 3,
                FType: 0,
              },
              {
                DIn: 2,
                DOut: 0,
                DevStat: 2,
                FType: 2,
              },
              {
                AnalogueData: {
                  1: 5190,
                  3: 2105,
                  4: 99,
                  5: 5135,
                  6: 9992,
                },
                FType: 6,
              },
              {
                Peak: 2817,
                Avg: 2762,
                Dur: 20,
                FType: 24,
              },
            ],
          },
          {
            SeqNo: 50,
            Reason: 11,
            DateUTC: '2021-09-22 08:20:26',
            Fields: [
              {
                GpsUTC: '2021-09-22 08:20:26',
                Lat: 52.2247755,
                Long: -0.2580365,
                Alt: -2,
                Spd: 0,
                SpdAcc: 10,
                Head: 70,
                PDOP: 22,
                PosAcc: 44,
                GpsStat: 3,
                FType: 0,
              },
              {
                DIn: 2,
                DOut: 0,
                DevStat: 2,
                FType: 2,
              },
              {
                AnalogueData: {
                  1: 5190,
                  3: 2104,
                  4: 99,
                  5: 5056,
                  6: 9992,
                },
                FType: 6,
              },
            ],
          },
        ],
      },
      metadata: {},
    }),
  },
  expectedReadings: [
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'latitude',
        unit: '°',
        label: 'gps',
      },
      timestamp: '2021-09-22T08:19:31.000Z',
      value: 52.2247532,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'longitude',
        unit: '°',
        label: 'gps',
      },
      timestamp: '2021-09-22T08:19:31.000Z',
      value: -0.2579426,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'altitude',
        unit: 'm',
        label: 'gps',
      },
      timestamp: '2021-09-22T08:19:31.000Z',
      value: 20,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'latitude',
        unit: '°',
        label: 'gps',
      },
      timestamp: '2021-09-22T08:20:26.000Z',
      value: 52.2247755,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'longitude',
        unit: '°',
        label: 'gps',
      },
      timestamp: '2021-09-22T08:20:26.000Z',
      value: -0.2580365,
    },
    {
      dataset: {
        thingId: '00000000-0000-0000-0000-000000000000',
        type: 'altitude',
        unit: 'm',
        label: 'gps',
      },
      timestamp: '2021-09-22T08:20:26.000Z',
      value: -2,
    },
  ],
  expectedEvents: [
    {
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: '2021-09-22T08:19:31.000Z',
      type: 'location',
      details: {
        latitude: 52.2247532,
        latitudeUnit: '°',
        longitude: -0.2579426,
        longitudeUnit: '°',
        altitude: 20,
        altitudeUnit: 'm',
      },
    },
    {
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: '2021-09-22T08:20:00.000Z',
      type: 'impact',
      details: {
        peakForce: 2817,
        peakForceUnit: 'mg',
        averageForce: 2762,
        averageForceUnit: 'mg',
        duration: 20,
        durationUnit: 'ms',
      },
    },
    {
      thingId: '00000000-0000-0000-0000-000000000000',
      timestamp: '2021-09-22T08:20:26.000Z',
      type: 'location',
      details: {
        latitude: 52.2247755,
        latitudeUnit: '°',
        longitude: -0.2580365,
        longitudeUnit: '°',
        altitude: -2,
        altitudeUnit: 'm',
      },
    },
  ],
})

module.exports = {
  TEST_PAYLOAD_1,
}
