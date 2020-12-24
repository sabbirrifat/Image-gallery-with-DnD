import FilterInput from './FilterInput';
import { shallow } from 'enzyme';
import React from 'react';
import blurIcon from '../../assets/blur.svg';


const handleChange = (event) => {
}
const [name, value] = ["blur", "20"];

const mockFilterInput = <input
    name="blur"
    type="range"
    min="0"
    max="100"
    data-testid="blur"
    value="20"
    onChange={handleChange}
/>

describe('Filter Input', () => {
    it('should match the mock output', () => {
        const wrapper = shallow(<FilterInput name={name} value={value} icon={blurIcon} handleChange={handleChange} />);
        expect(wrapper.contains(mockFilterInput)).toBeTruthy();
    });

    it('should match the image src', () => {
        const wrapper = shallow(<FilterInput name={name} value={value} icon={blurIcon} handleChange={handleChange} />);
        expect(wrapper.find('img').at(0).prop('src')).toEqual('blur.svg');
    })

})