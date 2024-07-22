import React from 'react';
import renderer from 'react-test-renderer';
import ExportPDFButton from '../../Export/ExportPDF';

it('renders correctly', () => {
  const tree = renderer.create(<ExportPDFButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
