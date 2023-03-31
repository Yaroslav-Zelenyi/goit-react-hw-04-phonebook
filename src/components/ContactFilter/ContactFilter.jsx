import PropTypes from 'prop-types';
import css from './ContactFilter.module.css';

export function ContactFilter({ onChange }) {
  const inputContact = evt => {
    const contactFilter = evt.target.value;
    onChange(contactFilter);
  };

  return (
    <input
      className={css.contactFilter__input}
      name="contactFilter"
      onChange={inputContact}
    />
  );
}

ContactFilter.propType = {
  onChange: PropTypes.func.isRequired,
};
