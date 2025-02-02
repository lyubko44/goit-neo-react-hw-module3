import { useState, useEffect } from 'react';
import ContactList from './components/ContactList/ContactList.jsx';
import SearchBox from './components/SearchBox/SearchBox';
import ContactForm from './components/ContactForm/ContactForm';
import styles from './App.module.css';

const App = () => {
    const [contacts, setContacts] = useState([
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]);

    const [filter, setFilter] = useState('');

    // Load contacts from local storage when the app loads
    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem('contacts'));
        if (storedContacts) {
            setContacts(storedContacts);
        }
    }, []);

    // Save contacts to local storage whenever the contacts array changes
    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    // Filter contacts
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    // Add new contact
    const addContact = (newContact) => {
        setContacts(prevContacts => [newContact, ...prevContacts]);
    };

    // Delete contact
    const deleteContact = (contactId) => {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    };

    return (
        <div className={styles.app}>
            <h1 className={styles.title}>Phonebook</h1>
            <ContactForm onSubmit={addContact} />
            <SearchBox value={filter} onChange={setFilter} />
            <ContactList contacts={filteredContacts} onDeleteContact={deleteContact} />
        </div>
    );
};

export default App;