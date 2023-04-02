import { useState } from 'react';
import { useLocalStorage } from '../components/LocalStorage';
import { FormContact } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { ContactFilter } from './ContactFilter/ContactFilter';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const submitHandler = contact => {
    const names = contacts.map(obj => obj.name);
    if (!names.includes(contact.name)) {
      setContacts(prevState => [...prevState, contact]);
    } else {
      alert(`${contact.name} is already in contacts`);
    }
  };

  const onChangeHandle = word => {
    setFilter(word);
  };

  const filterNames = () => {
    const search = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return search;
  };

  const deleteContact = e => {
    const id = e.target.name;
    const leftContacts = contacts.filter(contact => contact.id !== id);
    setContacts(leftContacts);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        fontSize: 20,
        backgroundColor: '#eefaff',
        borderRadius: '3px',
        boxShadow: '0 1px 5px rgba(51,35,15,.25)',
        margin: '70px auto',
        width: '400px',
        color: '#162031',
      }}
    >
      <h1>Phonebook</h1>
      <FormContact onSubmit={submitHandler} />
      <h2 style={{ marginTop: 60 }}>Contacts</h2>
      <h3 style={{ marginTop: 0 }}>Find contacts by name</h3>
      <ContactFilter onChange={onChangeHandle} />
      <Contacts contacts={filterNames()} onClick={deleteContact} />
    </div>
  );
}
