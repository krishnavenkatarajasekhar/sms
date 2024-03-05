import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        description:''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8105/contacts/save', formData);
            console.log(response.data);
            alert('Registered successfully');
            // Reset form after successful submission if needed
            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                description:''  
            });
        } catch (error) {
            console.error('Error submitting Register:', error);
            alert('An error occurred while submitting the Register');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form" id='contact-form-contact'>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber" 
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ContactForm;
