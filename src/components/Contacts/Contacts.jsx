import PropTypes from 'prop-types';
import css from './Contacts.module.css';
export function Contacts({ contacts, onClick }) {
  return (
    <ul className={css.contacts__list}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.contacts__item} key={id}>
          {name}: {number}{' '}
          <button className={css.contacts__btn} onClick={onClick} name={id}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
};
