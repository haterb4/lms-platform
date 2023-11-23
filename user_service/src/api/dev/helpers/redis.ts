import { Redis } from 'ioredis';
import config from 'config'
import log from '../../../config/Logger';

const redisClient = () => {
    const redisUrl  = config.get<string>('redisUrl');
    if(redisUrl){
        log.info('Redis connected');
        return redisUrl;
    }
    throw new Error('Redis Connection failed');
}

export const redis = new Redis(redisClient());