import urlService from '../services/url.js';
import URL from '../constant/url.js';

const {HOST} = process.env;

const getUrl = async (req, res) => {
  try {
    const {urlId} = req.params;
    const urlDoc = await urlService.getUnexpiredUrlById(urlId);

    if (urlDoc != null) {
      res.append('Location', urlDoc.content);
      return res.status(301).send();
    }

    res.append(
      'Cache-Control',
      `max-age=${URL.NON_EXIST_ID_CACHED_MAX_AGE_IN_SECOND}`,
    );
    return res.status(404).send('Not found');
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
};
const createUrl = async (req, res) => {
  try {
    const {url, expireAt} = req.body;
    const urlDoc = await urlService.createUrl(url, new Date(expireAt));

    return res.send({id: urlDoc.id, shortUrl: `${HOST}/${urlDoc.id}`});
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
};

export default {getUrl, createUrl};
