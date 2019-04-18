import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './AddFriendForm.css';

const dropDownOptions = [
  { id: 1, value: 'Male' },
  { id: 2, value: 'Female' },
];

class AddFriendForm extends Component {
  render() {
    return (
      <div className={styles.addFriendWrapper}>
        <div className="dropdown">
          <button
            className={classnames('btn btn-default dropdown-toggle', styles.addFriendDropdown)}
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={this.toggleDropdown.bind(this)}
          >
            {this.state.selectedGender.value}
            <span className="caret" />
          </button>
          {this.state.showDropdownList && <ul
            className={classnames('dropdown-menu show', styles.addFriendDropdownList)}
            aria-labelledby="dropdownMenu1">
            {dropDownOptions && dropDownOptions.map(option =>
              <li key={option.id}>
                <a
                  href='#'
                  className="dropdown-link"
                  onClick={() => {this.handleDropdownChange(option.id);}}
                >
                  {option.value}
                </a>
              </li>,
            )}
          </ul>}
        </div>
        <input
          type="text"
          autoFocus="true"
          className={classnames('form-control', styles.AddFriendForm)}
          placeholder="Type the name of a friend"
          value={this.state.name}
          onChange={this.handleInputChange.bind(this)}
          onKeyDown={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
      showDropdownList: false,
      selectedGender: dropDownOptions[0],
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    const name = e.target.value.trim();
    if (e.keyCode === 13 && name.length) {
      const gender = this.state.selectedGender.value;
      this.props.addFriend({ name, gender });
      this.setState({ name: '', selectedGender: dropDownOptions[0] });
    }
  }

  toggleDropdown() {
    this.setState({ showDropdownList: !this.state.showDropdownList });
  }

  handleDropdownChange(id) {
    this.setState({
      selectedGender: dropDownOptions.find(option => option.id === id),
      showDropdownList: false,
    });
  }

}

AddFriendForm.propTypes = {
  addFriend: PropTypes.func.isRequired,
};

export default AddFriendForm;
