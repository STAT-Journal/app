import React from 'react';
import renderer from 'react-test-renderer'; // Import the 'renderer' object from the 'react-test-renderer' package

import StreakTracking from '../StreakTracking';

describe('<App />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<StreakTracking streak={32}/>).toJSON();
        if (tree === null) {
            expect(tree).not.toBeNull();
            return;
        }
        
        if (Array.isArray(tree)) {
            expect(tree[0].children?.length).toBe(1); // Added null check using optional chaining operator
        } else {
            expect(tree.children?.length).toBe(1); // Added null check using optional chaining operator
        }
    });
});
