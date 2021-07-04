import sinon from 'sinon';
import {expect} from 'chai';
import UrlModel from '../../models/url.js';
import redis from '../../configs/redis.js';
import urlService from '../../services/url.js';
import urlMock from '../../mocks/url.js';
import expiredUrlMock from '../../mocks/expiredUrl.js';
import URL from '../../constant/url.js';

describe('Url services', function () {
  before(function() {
    sinon.stub(redis, 'setAsync').resolves();
  });

  after(function() {
    redis.setAsync.restore();
  });

  it('createUrlService should return url document', async function () {
    sinon.stub(UrlModel, 'create').resolves(urlMock);

    const returnValue = await urlService.createUrl(
      urlMock.content,
      urlMock.expireAt,
    );
    UrlModel.create.restore();

    expect(returnValue.id).to.be.a('string');
    expect(returnValue.id).to.have.lengthOf(URL.ID_LENGTH);
    expect(returnValue.content).to.equal(urlMock.content);
    expect(returnValue.expireAt).to.equal(urlMock.expireAt);
  });

  it('getUnexpiredUrlById should return document with given id when redis has one and not expired', async function () {
    sinon.stub(redis, 'getAsync').resolves(JSON.stringify(urlMock));

    const returnValue = await urlService.getUnexpiredUrlById(urlMock.id);
    redis.getAsync.restore();

    expect(returnValue.id).to.equal(urlMock.id);
    expect(returnValue.content).to.equal(urlMock.content);
    expect(returnValue.expireAt).to.deep.equal(urlMock.expireAt);
  });

  it('getUnexpiredUrlById should return document with given id when redis does not have one but database has one and not expired', async function () {
    sinon.stub(redis, 'getAsync').resolves(null);
    sinon.stub(UrlModel, 'findByPk').resolves(urlMock);

    const returnValue = await urlService.getUnexpiredUrlById(urlMock.id);
    redis.getAsync.restore();
    UrlModel.findByPk.restore();

    expect(returnValue.id).to.equal(urlMock.id);
    expect(returnValue.content).to.equal(urlMock.content);
    expect(returnValue.expireAt).to.deep.equal(urlMock.expireAt);
  });

  it('getUnexpiredUrlById should return null when redis has one but expired', async function () {
    sinon.stub(redis, 'getAsync').resolves(JSON.stringify(expiredUrlMock));

    const returnValue = await urlService.getUnexpiredUrlById(urlMock.id);
    redis.getAsync.restore();

    expect(returnValue).to.equal(null);
  });

  it('getUnexpiredUrlById should return null when redis does not have one and database has one but expired', async function () {
    sinon.stub(redis, 'getAsync').resolves(null);
    sinon.stub(UrlModel, 'findByPk').resolves(expiredUrlMock);

    const returnValue = await urlService.getUnexpiredUrlById(urlMock.id);
    redis.getAsync.restore();
    UrlModel.findByPk.restore();

    expect(returnValue).to.equal(null);
  });

  it('getUnexpiredUrlById should return null when redis and database do not have document with given id', async function () {
    sinon.stub(redis, 'getAsync').resolves(null);
    sinon.stub(UrlModel, 'findByPk').resolves(null);

    const returnValue = await urlService.getUnexpiredUrlById(urlMock.id);
    redis.getAsync.restore();
    UrlModel.findByPk.restore();

    expect(returnValue).to.equal(null);
  });
});
