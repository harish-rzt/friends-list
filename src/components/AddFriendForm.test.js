import AddFriendForm from './AddFriendForm';

describe('<AddFriendForm />', () => {
  it('Render check with shallow', () => {
    const wrapper = shallow(<AddFriendForm
      addFriend={f => f}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('Render check with render', () => {
    const wrapper = render(<AddFriendForm
      addFriend={f => f}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('DOM structure test & default values', () => {
    const wrapper = mount(<AddFriendForm
      addFriend={f => f}
    />);

    // Testing the DOM structure with one input in UI
    const inputsCount = wrapper.find("input").length;
    expect(inputsCount).toEqual(1);

    // Testing the default selected value of input
    const inputValue = wrapper.find("input").text();
    expect(inputValue).toEqual("");

    // Testing the DOM structure with one dropdown in UI
    const dropdownCount = wrapper.find(".dropdown").length;
    expect(dropdownCount).toEqual(1);

    // Testing the default selected value of dropdown
    const defaultDropdownValue = wrapper.find(".dropdown-toggle").text();
    expect(defaultDropdownValue).toEqual("Male");
  });

  it('Simulating dropdown toggle', () => {
    const wrapper = shallow(<AddFriendForm
      addFriend={f => f}
    />);

    // Simulate dropdown toggle
    const dropdownToggle = wrapper.find(".dropdown-toggle");
    expect(wrapper.find('.dropdown-menu').length).toEqual(0);
    dropdownToggle.simulate("click");
    expect(wrapper.find('.dropdown-menu').length).toEqual(1);
  });

  it('Simulating dropdown value change', () => {
    const wrapper = shallow(<AddFriendForm
      addFriend={f => f}
    />);

    // Simulate dropdown toggle
    const dropdownToggle = wrapper.find(".dropdown-toggle");

    // before clicking on dropdown
    expect(wrapper.find('.dropdown-menu').length).toEqual(0);

    // clicking on dropdown
    dropdownToggle.simulate("click");

    // checking for dropdown options count
    const dropdownLinks = wrapper.find('.dropdown-link');
    expect(dropdownLinks.length).toEqual(2);

    // after clicking on dropdown the dropdown menu will append to DOM
    expect(wrapper.find('.dropdown-menu').length).toEqual(1);

    // checking for default dropdown selected value
    const defaultDropdownValue = wrapper.find(".dropdown-toggle").text();
    expect(defaultDropdownValue).toEqual("Male");
    expect(wrapper.state().selectedGender.value).toEqual("Male");

    // checking for default dropdown selected value
    dropdownLinks.at(1).simulate('click');

    // after selecting Female option in the dropdown
    const updatedDropdownValue = wrapper.find(".dropdown-toggle").text();
    expect(updatedDropdownValue).toEqual("Female");
    expect(wrapper.state().selectedGender.value).toEqual("Female");
  });

  it('Simulating input value change', () => {
    const wrapper = shallow(<AddFriendForm
      addFriend={f => f}
    />);
    expect(wrapper.state().name).toEqual("");
    wrapper.find("input").simulate('change', {target: {value: 'test'}});
    expect(wrapper.state().name).toEqual("test");
  });

  it('Simulating input on submit', () => {
    const spy = sinon.spy();
    const wrapper = mount(<AddFriendForm
      addFriend={spy}
    />);
    const input = wrapper.find('input');
    expect(spy.callCount).toBe(0);
    input.simulate('change', { target: { value: 'abcdefg'} });
    input.simulate('keydown', { keyCode: 13 });
    expect(spy.callCount).toBe(1);
  });
});