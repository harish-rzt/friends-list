import Pagination from './Pagination';

const pagination = { currentPage: 1, totalPages: 2 };

describe('<Pagination />', () => {
  it('Render check with shallow', () => {
    const wrapper = shallow(<Pagination
      pagination={pagination}
      incrementPagination={f => f}
      decrementPagination={f => f}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('Render check with render', () => {
    const wrapper = render(<Pagination
      pagination={pagination}
      incrementPagination={f => f}
      decrementPagination={f => f}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('DOM structure test', () => {
    const wrapper = mount(<Pagination
      pagination={pagination}
      incrementPagination={f => f}
      decrementPagination={f => f}
    />);

    // Testing the DOM structure with two buttons(next & previous)
    const buttonsCount = wrapper.find("button").length;
    expect(buttonsCount).toEqual(2);

    // Testing the rendered pagination text with passed prop
    const paginationInfoText = wrapper.find("span").text();
    expect(paginationInfoText).toEqual("1 / 2 pages");
  });

  it('Simulating click events', () => {
    const incrementSpy = sinon.spy();
    const decrementSpy = sinon.spy();
    const wrapper = shallow(<Pagination
      pagination={pagination}
      decrementPagination={decrementSpy}
      incrementPagination={incrementSpy}
    />);

    // simulate click on left arrow click(decrement pagination),
    wrapper.find("button").first().simulate("click");
    expect(decrementSpy.calledOnce).toBe(true);

    // simulate click on right arrow click(increment pagination)
    wrapper.find("button").at(1).simulate("click");
    expect(incrementSpy.calledOnce).toBe(true);
  });
});