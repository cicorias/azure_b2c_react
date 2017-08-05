import create from './actionCreator';

it('creates actions correctly', () => {
  expect(create('ACTION', {one: 1, two: 2})).toMatchObject({
    type: 'ACTION',
    payload: {one: 1, two: 2},
  });
});
