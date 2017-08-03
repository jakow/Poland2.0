/* tslint:disable:no-unused-expression */
import 'mocha';
import * as sinonChai from 'sinon-chai';
import {use, expect} from 'chai';
import {spy} from 'sinon';

use(sinonChai);

interface T {
  name: string;
  value: number;
}
import ApiHooks from '../../routes/api/apiHooks';

describe('API Hooks', () => {
  let hooks: ApiHooks<T>;
  beforeEach(() => {
    hooks = new ApiHooks();
  });

  it('Should not be null when created', () => {
    expect(hooks).not.to.be.null;
  });

  it('Should register a hook correctly', () => {
    const hook = spy();
    hooks.on('update', hook);
    expect((hooks as any).update).not.to.be.null;
    expect((hooks as any).update.size).to.equal(1);
    expect((hooks as any).update.has(hook)).to.be.true;
  });

  it('Should call a callback when triggered', () => {
    const hook = spy();
    hooks.on('update', hook);
    const params = [{name: 'a', value: 1}, {name: 'b', value: 2}];
    hooks.call('update', params[0], params[1]);
    expect(hook).to.have.been.calledOnce;
    expect(hook).to.have.been.calledWith(...params);
  });
});
