import 'mocha';
import {expect} from 'chai';
import * as proxyquire from 'proxyquire';

const proxy = proxyquire.noCallThru();

describe("Question model test", () => {
  let Question;
  before(() => {
    Question = proxy('../../models/Question', {
          keystone: require('keystonejs-stub'),
      });
  });
});
