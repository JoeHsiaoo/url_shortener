import cryptoRandomString from 'crypto-random-string';
import redis from '../configs/redis.js';
import UrlModel from '../models/url.js';
import URL from '../constant/url.js';

const createUrl = (url, expireAt) => {
  return UrlModel.create({
    id: cryptoRandomString({length: URL.ID_LENGTH, type: 'alphanumeric'}),
    content: url,
    expireAt,
  });
};

const getUnexpiredUrlById = async id => {
  const urlDocFromRedis = await redis.getAsync(id);
  if (urlDocFromRedis != null) {
    const parsedUrlDoc = JSON.parse(urlDocFromRedis);
    parsedUrlDoc.expireAt = new Date(parsedUrlDoc.expireAt);
    return parsedUrlDoc.expireAt > Date.now() ? parsedUrlDoc : null;
  }

  const urlDocFromDatabase = await UrlModel.findByPk(id);
  if (urlDocFromDatabase != null && urlDocFromDatabase.expireAt > Date.now()) {
    await redis.setAsync(
      id,
      JSON.stringify(urlDocFromDatabase),
      'EX',
      URL.REDIS_TTL_IN_SECOND,
    );
    return urlDocFromDatabase;
  }

  return null;
};

export default {createUrl, getUnexpiredUrlById};
