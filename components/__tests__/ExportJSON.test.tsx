import React from 'react';
import renderer from 'react-test-renderer'; // Import the 'renderer' object from the 'react-test-renderer' package

import ExportJSONButton from '../Export/ExportJSON';

describe('<App />', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<ExportJSONButton/>).toJSON();
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
