import React from 'react';
import {create} from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
    test('Status from props should be in the state', () => {
        const component = create(<ProfileStatus status='New state'/>)
        const instance = component.getInstance();
        expect(instance.state.status).toBe('New state');
    });

    test('After creation <span> should be dispayed', () => {
        const component = create(<ProfileStatus status='New state'/>)
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    // test('After creation <input> shouldn`t be dispayed', () => {
    //     const component = create(<ProfileStatus status='New state'/>)
    //     const root = component.root;
    //     expect(() => {
    //         let input = root.findByType('input');
    //     }).toThrow();
    // });

    test('After creation <span> should be contains correct status', () => {
        const component = create(<ProfileStatus status='New state'/>)
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0]).toBe('New state');
    });

    test('Input should be displayed in editMode instade of <span>', () => {
        const component = create(<ProfileStatus status='New state'/>)
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('New state');
    });

    test('Callbuck should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus updateProfileStatus={mockCallback}/>)
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});

