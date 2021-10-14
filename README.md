# wasp-payload-parser-oyster2

Payload parsing service for the [Digital Matter Oyster2 Sensor](https://www.digitalmatter.com/devices/oyster2/) when forwarded by the OEM Server HTTP connector.

## Getting started

`wasp-payload-parser-oyster2` can be run in a similar way to most nodejs applications. First install required dependencies using `npm`:

```sh
npm install
```

### Testing

For integration testing, `wasp-payload-parser-oyster2` depends on Kafka and Zookeeper. These can be brought locally up using docker:

```sh
docker-compose up -d
```

You can then run tests with:

```sh
npm test
```

## Environment Variables

`wasp-payload-parser-oyster2` is configured primarily using environment variables as follows:

| variable         | required |  default  | description                                        |
| :--------------- | :------: | :-------: | :------------------------------------------------- |
| WASP_SENSOR_TYPE |    N     | `oyster2` | Type of this sensor/thing for `wasp-thing-service` |

The following environment variables configure the use of [`wasp-payload-processor`](https://github.com/digicatapult/wasp-payload-processor):

| variable                     | required |     default      | description                                                                             |
| :--------------------------- | :------: | :--------------: | :-------------------------------------------------------------------------------------- |
| PORT                         |    N     |      `3000`      | Port on which the service will listen                                                   |
| LOG_LEVEL                    |    N     |      `info`      | Logging level. Valid values are [`trace`, `debug`, `info`, `warn`, `error`, `fatal`]    |
| KAFKA_LOG_LEVEL              |    N     |    `nothing`     | Logging level for Kafka. Valid values are [`debug`, `info`, `warn`, `error`, `nothing`] |
| KAFKA_BROKERS                |    N     | `localhost:9092` | List of addresses for the Kafka brokers                                                 |
| KAFKA_READINGS_TOPIC         |    N     |    `readings`    | Outgoing Kafka topic for readings                                                       |
| KAFKA_EVENTS_TOPIC           |    N     |     `events`     | Outgoing Kafka topic for events                                                         |
| KAFKA_PAYLOAD_ROUTING_PREFIX |    N     |    `payloads`    | Prefix for incoming Kafka topics for payloads                                           |

## Payload Format

Note that the format of the payload forwarded by the HTTP connector is not very well documented. For the sake of developing this payload parser however, the parts that cover GPS location data and High-G impact data are. Our analysis of this can be found under [./docs/payload-format.md](./docs/payload-format.md)
