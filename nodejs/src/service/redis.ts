import * as redis from 'redis'
import * as ioredis from 'ioredis'

import config from '../config'
import { resolve, reject } from 'bluebird';

export enum CACHE_KEY {
    REPOSITORY_GET = 'REPOSITORY_GET'
}

export default class RedisService {
    private static client: redis.RedisClient = redis.createClient(config.redis)

    private static getCacheKey(key: CACHE_KEY, entityId?: number): string {
        return `${key}:${entityId || ""}`
    }

    public static getCache(key: CACHE_KEY, entityId?: number): Promise<string | null> {
        const cacheKey = this.getCacheKey(key, entityId);
        return new Promise((resolve, reject) => {
            RedisService.client.get(cacheKey, (error: Error, value: string | null) => {
                if (error) {
                    return reject(error)
                }

                resolve(value)
            })
        })
    }

    public static setCache(key: CACHE_KEY, val: string, entityId?: number, expireTime?: number): Promise<boolean> {
        const cacheKey = this.getCacheKey(key, entityId);
        return new Promise((resolve, reject) => {
            RedisService.client.set(cacheKey, val, 'EX', expireTime || 1 * 24 * 60 * 60, (err: Error) => {
                if (err) {
                    return reject(false)
                }

                resolve(true)
            })
        })
    }

    public static delCache(key: CACHE_KEY, entityId?: number): Promise<boolean> {
        let cacheKey = this.getCacheKey(key, entityId)
        return new Promise((resolve, reject) => {
            RedisService.client.del(cacheKey, (error) => {
                if (error) {
                    reject(error)
                }

                resolve(true)
            })
        })
    }
}