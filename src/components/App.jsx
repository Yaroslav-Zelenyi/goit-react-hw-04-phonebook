import { Component } from 'react';
import { FormContact } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { ContactFilter } from './ContactFilter/ContactFilter';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  submitHandler = contact => {
    const names = this.state.contacts.map(obj => obj.name);
    if (!names.includes(contact.name)) {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    } else {
      alert(`${contact.name} is already in contacts`);
    }
  };

  onChangeNames = newName => {
    this.setState({ filter: newName });
  };

  filterNames() {
    const { contacts, filter } = this.state;
    if (!filter) return contacts;
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  deleteContact = evt => {
    const id = evt.target.name;
    const contacts = this.state.contacts.filter(contact => contact.id !== id);
    this.setState({ contacts });
  };

  render() {
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
        <FormContact onSubmit={this.submitHandler} />
        <h2 style={{ marginTop: 60 }}>Contacts</h2>
        <h3 style={{ marginTop: 0 }}>Find contacts by name</h3>
        <ContactFilter onChange={this.onChangeNames} />
        <Contacts contacts={this.filterNames()} onClick={this.deleteContact} />
      </div>
    );
  }
}
