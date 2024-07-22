import React from 'react';
import renderer from 'react-test-renderer';
import MentalHealthComponent from '../MentalHealth/MentalHealth';

describe('<MentalHealthComponent />', () => {
    it('renders six cards', () => {
        const tree = renderer.create(<MentalHealthComponent />).toJSON();
        if (tree === null) {
            expect(tree).not.toBeNull();
            return;
        }
        
        // Assuming each card is a direct child of the View component
        if (Array.isArray(tree)) {
            expect(tree[0].children?.length).toBe(6);
        } else {
            expect(tree.children?.length).toBe(6);
        }
    });
});