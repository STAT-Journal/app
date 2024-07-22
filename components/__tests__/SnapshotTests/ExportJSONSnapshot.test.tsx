import React from 'react';
import renderer from 'react-test-renderer';
import ExportJSONButton from '../../Export/ExportJSON';

it('renders correctly', () => {
  const tree = renderer.create(<ExportJSONButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
