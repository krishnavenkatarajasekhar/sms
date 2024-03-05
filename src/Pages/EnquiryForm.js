import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./EnquiryForm.css"

function EnquiryForm() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:8105/contacts/get');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8105/contacts/${id}`);
            // Remove the deleted contact from the state
            setContacts(contacts.filter(contact => contact.id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <>
        
        <div className="contact-table-container" id='enquiry-form'>
        <h1 className='enquiry-tbl'>Enquiry List</h1>
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phoneNumber}</td>
                            <td>
                                <button onClick={() => handleDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default EnquiryForm;
