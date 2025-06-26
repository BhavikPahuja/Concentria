
import { redis_host, redis_port } from '../config';
import Redis from 'ioredis';

const redisClient = new Redis({
  host: redis_host, // Redis server's host
  port: redis_port // Convert port to a number
});

export default redisClient;
