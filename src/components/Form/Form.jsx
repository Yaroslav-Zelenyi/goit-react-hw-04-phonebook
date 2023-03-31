import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Form.module.css';
import { nanoid } from 'nanoid';

export class FormContact extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const name = this.state.name;
    const number = this.state.number;
    const id = nanoid();
    this.props.onSubmit({ name, number, id });
    form.reset();
  };

  inputChange = evt => {
    const data = evt.target.name;
    const value = evt.target.value;
    this.setState({ [data]: value });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.form__label}>Name</label>
        <input
          className={css.form__input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.inputChange}
        />
        <label className={css.form__label}>Number</label>
        <input
          className={css.form__input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.inputChange}
        />
        <button type="submit" className={css.form__btn}>
          Add contact
        </button>
      </form>
    );
  }
}
FormContact.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
