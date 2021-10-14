# Oyster2 payload format

The following documents our current understanding of the payload format received when the Oyster2 Sensor sends data which is then forwarded to us via the OEM Sever HTTP connector. Note if the Oyster2 were configured to send data via an alternative connector the payloads may not align with what is assumed here.

## Example payload

Here is an example payload:

```json
{
  "SerNo": 273964,
  "IMEI": "359215107008600",
  "ICCID": "8944110068486062610",
  "ProdId": 77,
  "FW": "77.2.2.8",
  "Records": [
    {
      "SeqNo": 48,
      "Reason": 46,
      "DateUTC": "2021-09-22 08:20:00",
      "Fields": [
        {
          "GpsUTC": "2021-09-22 08:19:31",
          "Lat": 52.2247532,
          "Long": -0.2579426,
          "Alt": 20,
          "Spd": 0,
          "SpdAcc": 6,
          "Head": 147,
          "PDOP": 17,
          "PosAcc": 18,
          "GpsStat": 3,
          "FType": 0
        },
        {
          "DIn": 2,
          "DOut": 0,
          "DevStat": 2,
          "FType": 2
        },
        {
          "AnalogueData": {
            "1": 5190,
            "3": 2105,
            "4": 99,
            "5": 5135,
            "6": 9992
          },
          "FType": 6
        },
        {
          "Peak": 2817,
          "Avg": 2762,
          "Dur": 20,
          "FType": 24
        }
      ]
    },
    {
      "SeqNo": 49,
      "Reason": 46,
      "DateUTC": "2021-09-22 08:20:06",
      "Fields": [
        {
          "GpsUTC": "2021-09-22 08:19:31",
          "Lat": 52.2247532,
          "Long": -0.2579426,
          "Alt": 20,
          "Spd": 0,
          "SpdAcc": 6,
          "Head": 147,
          "PDOP": 17,
          "PosAcc": 18,
          "GpsStat": 3,
          "FType": 0
        },
        {
          "DIn": 2,
          "DOut": 0,
          "DevStat": 2,
          "FType": 2
        },
        {
          "AnalogueData": {
            "1": 5190,
            "3": 2104,
            "4": 99,
            "5": 5056,
            "6": 9992
          },
          "FType": 6
        },
        {
          "Peak": 9430,
          "Avg": 3984,
          "Dur": 140,
          "FType": 24
        }
      ]
    },
    {
      "SeqNo": 50,
      "Reason": 11,
      "DateUTC": "2021-09-22 08:20:26",
      "Fields": [
        {
          "GpsUTC": "2021-09-22 08:20:26",
          "Lat": 52.2247755,
          "Long": -0.2580365,
          "Alt": -2,
          "Spd": 0,
          "SpdAcc": 10,
          "Head": 70,
          "PDOP": 22,
          "PosAcc": 44,
          "GpsStat": 3,
          "FType": 0
        },
        {
          "DIn": 2,
          "DOut": 0,
          "DevStat": 2,
          "FType": 2
        },
        {
          "AnalogueData": {
            "1": 5190,
            "3": 2104,
            "4": 99,
            "5": 5056,
            "6": 9992
          },
          "FType": 6
        }
      ]
    }
  ]
}
```

The top level properties `SerNo`, `IMEI`, `ICCID`, `ProdId`, `FW` provide various bits of information about the Oyster2 that generated the records enclosed. These are mostly self explanatory and of little interest to the parser.

A collection of `Record`s are then enclosed in the `Record` property. These contain an auto-incrementing sequence number `SeqNo`, the date (UTC) the record was produced `DateUTC` and a value indicating the cause of the record `Reason`. `Reason` is essentially an undocumented enum and as of now the only one I can find documentation for is reason `46` which is a High-G impact event. These are of little consequence however as the primary data we are interested in is a GPS location and the impact data. Data of a `Record` of this kind are found under a `Fields` collection in the `Record`.

Each field has an `FType` value to indicate it's meaning. The only two of interest to us are `FType` `0` which is GPS data and `FType` `24` which is High-G accelerometer data. These are documented under [https://support.digitalmatter.com/support/solutions/articles/16000103121-common-configurations-high-g-events](https://support.digitalmatter.com/support/solutions/articles/16000103121-common-configurations-high-g-events)
