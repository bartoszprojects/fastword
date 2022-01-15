import { NumberToSecondsPipe } from './number-to-seconds.pipe';

describe('NumberToSecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberToSecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
