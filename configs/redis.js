import {promisify} from 'util';
import Redis from 'ioredis';

const {REDIS_HOST, REDIS_PORT, REDIS_PASSWORD} = process.env;

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  lazyConnect: true,
});

redis.getAsync = promisify(redis.get).bind(redis);
redis.setAsync = promisify(redis.set).bind(redis);

export default redis;
