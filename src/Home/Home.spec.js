import React from 'react';
import Home from './Home';
import { shallow } from 'enzyme';

import MockApi from '../MockApi/MockApi';

describe('Home', () => {
  describe('On submission', () => {
    it('sets the state to loading', () => {
      const wrapper = shallow(<Home />);

      const submit = 'Button[content="Submit"]';
      wrapper.find(submit).simulate('click');
      expect(wrapper.state('loading')).toBeTruthy();
    });

    it('submits the destination and origin state as the payload to MockApi.submitData', () => {
      const wrapper = shallow(<Home />);
      const payload = {
        origin: wrapper.state('origin'),
        destination: wrapper.state('destination'),
      };

      MockApi.submitData = jest.fn().mockReturnValue(Promise.resolve());
      MockApi.getRoute = jest.fn();

      const submit = 'Button[content="Submit"]';
      wrapper.find(submit).simulate('click');
      expect(MockApi.submitData).toBeCalledWith(payload);
    });

    // further tests to determine if paths state is properly set after api call

  });
});
