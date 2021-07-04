import 'dotenv/config.js';
import sinon from 'sinon';
import {expect} from 'chai';
import urlController from '../../controllers/url.js';
import urlService from '../../services/url.js';
import URL from '../../constant/url.js';
import urlMock from '../../mocks/url.js';
import responseMock from '../../mocks/response.js';

const {HOST} = process.env;

describe('Url controllers', function () {
  it('createUrlController should return id and shortUrl', async function () {
    sinon.stub(urlService, 'createUrl').resolves(urlMock);
    const request = {
      body: {
        url: urlMock.content,
        expireAt: urlMock.expireAt.toISOString(),
      },
    };
    const response = await urlController.createUrl(request, new responseMock());
    urlService.createUrl.restore();

    expect(response.data.id).to.equal(urlMock.id);
    expect(response.data.shortUrl).to.equal(HOST + '/' + urlMock.id);
  });

  it('getUrlController with correct urlId should return status 301 and Location header', async function () {
    sinon.stub(urlService, 'getUnexpiredUrlById').resolves(urlMock);
    const request = {
      params: {
        urlId: urlMock.id,
      },
    };
    const response = await urlController.getUrl(request, new responseMock());
    urlService.getUnexpiredUrlById.restore();

    expect(response.header.Location).to.equal(urlMock.content);
    expect(response.statusCode).to.equal(301);
  });

  it('getUrlController with incorrect urlId should return status 404 and Cache-Control header', async function () {
    sinon.stub(urlService, 'getUnexpiredUrlById').resolves(null);
    const request = {
      params: {
        urlId: urlMock.id,
      },
    };
    const response = await urlController.getUrl(request, new responseMock());
    urlService.getUnexpiredUrlById.restore();

    expect(response.header['Cache-Control']).to.equal(
      `max-age=${URL.NON_EXIST_ID_CACHED_MAX_AGE_IN_SECOND}`,
    );
    expect(response.statusCode).to.equal(404);
  });
});
