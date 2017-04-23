const expect = require('chai').expect;
const proxyquire = require('proxyquire').noCallThru();


function mockEdition (year, start, end) {
  this.year =2017,
  this.fullName = "Poland 2.0 Summit 2017";
  this.current = true;
  this.description = "";
  this.venue = {
    name: "Imperial College London",
    location: null
  };
  this.date =  {start, end}
};

describe("Edition model test", () => {
  let Edition;
  beforeEach(() => {
    Edition = proxyquire('../../models/Edition', {
          'keystone': require('keystonejs-stub')
      });
  });

  it("should have a correct date formatting: same month", () => {
    let doc = new mockEdition(2016, new Date("21 Oct 2017 UTC"), new Date("22 Oct 2017 UTC"));
    let model = Edition.setDoc(doc);
    expect(Edition.dateString).to.equal("21–22 October 2017");
    // console.log(dateString);

  })

  it("should have a correct date formatting: different month", () => {
    let doc = new mockEdition(2016, new Date("21 Oct 2017 UTC"), new Date("1 Nov 2017 UTC"));
    let model = Edition.setDoc(doc);
    expect(Edition.dateString).to.equal("21 Oct–1 Nov 2017");
    // console.log(dateString);

  })


    it("should have a correct date formatting: provisional date", () => {
      let doc = new mockEdition(2016, new Date("21 Oct 2017 UTC"), null);
      doc.date.provisional = true;
      let model = Edition.setDoc(doc);
      expect(Edition.dateString).to.equal("October 2017");
      // console.log(dateString);

    })


});
