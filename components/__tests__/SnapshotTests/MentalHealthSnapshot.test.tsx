import React from 'react';
import renderer from 'react-test-renderer';
import MentalHealth from '../../MentalHealth/MentalHealth';

it('renders correctly', () => {
  const tree = renderer.create(<MentalHealth />).toJSON();
  expect(tree).toMatchSnapshot();
});
