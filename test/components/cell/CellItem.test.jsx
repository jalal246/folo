import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { CellItem } from '../../../src/components/cell';

describe('CellItem', () => {
  it('render', () => {
    const wrapper = shallow(<CellItem>A</CellItem>);

    expect(wrapper.html()).to.equal('<option>A</option>');
  });
});
