import { useLocalStorage } from '../LocalStorage';
import PropTypes from 'prop-types';
import css from './Form.module.css';
import { nanoid } from 'nanoid';

export function FormContact({ onSubmit }) {
  const [name, setName] = useLocalStorage('name', ' ');
  const [number, setNumber] = useLocalStorage('number', ' ');

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const id = nanoid();
    onSubmit({ name, number, id });
    form.reset();
    setName('');
    setNumber('');
  };

  const inputChange = e => {
    const { name, value } = e.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.form__label}>Name</label>
      <input
        className={css.form__input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={inputChange}
      />
      <label className={css.form__label}>Number</label>
      <input
        className={css.form__input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={inputChange}
      />
      <button type="submit" className={css.form__btn}>
        Add contact
      </button>
    </form>
  );
}

FormContact.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
