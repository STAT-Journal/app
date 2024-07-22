import React from 'react';
import renderer from 'react-test-renderer';
import ExportCSVButton from '../../Export/ExportCSV';

it('renders correctly', () => {
  const tree = renderer.create(<ExportCSVButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
