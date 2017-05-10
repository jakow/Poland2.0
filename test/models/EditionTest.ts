import 'mocha';
import {Model, Schema} from 'mongoose';
import {expect} from 'chai';
import * as proxyquire from 'proxyquire';
const proxy = proxyquire.noCallThru();
import {Edition, EditionDocument} from '../../models/Edition';
import {List} from 'keystone';

interface StubList<T> extends List<T> {
  setDoc(doc: T): void;
}

type EditionStub = StubList<Edition> & EditionDocument;



function mockEdition(year: number, start: Date, end: Date): Edition {
  return {
  year,
  name: 'Poland 2.0 Summit 2017',
  current: true,
  description: '',
  venue: {
    name: 'Imperial College London',
    location: null,
  },
  date: {start, end, useProvisional: false, provisionalDate: ''},
  mainPhoto: null,
  photos: null,
  };
}

describe('Edition model test', () => {
  let Edition: EditionStub;
  before(() => {
    Edition = proxy('../../models/Edition', {
          keystone: require('keystonejs-stub'),
      });
  });

  it('should have a correct date formatting: same month', () => {
    const doc = mockEdition(2016, new Date('21 Oct 2017 UTC'), new Date('22 Oct 2017 UTC'));
    const model = Edition.setDoc(doc);
    expect(Edition.dateString).to.equal('21–22 October 2017');
    // console.log(dateString);

  });

  it('should have a correct date formatting: different month', () => {
    const doc = mockEdition(2016, new Date('21 Oct 2017 UTC'), new Date('1 Nov 2017 UTC'));
    const model = Edition.setDoc(doc);
    expect(Edition.dateString).to.equal('21 Oct–1 Nov 2017');
    // console.log(dateString);

  });

  it('should have a correct provisional date', () => {
    const doc = mockEdition(2016, new Date('21 Oct 2017 UTC'), null);
    doc.date.useProvisional = true;
    const model = Edition.setDoc(doc);
    expect(Edition.date.provisionalDate).to.equal('October 2017');
    // console.log(dateString);
  });
});
