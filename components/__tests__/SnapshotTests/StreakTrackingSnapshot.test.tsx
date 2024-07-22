import React from 'react';
import renderer from 'react-test-renderer'; // Import the 'renderer' object from the 'react-test-renderer' package

import StreakTracking from '../../StreakTracking';

describe('<StreakTracking />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<StreakTracking streak={32}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});