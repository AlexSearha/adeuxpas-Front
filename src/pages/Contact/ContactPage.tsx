import React from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';

// --------------------------------------------------------------------//
// ----------------------------Component-------------------------------//
// --------------------------------------------------------------------//

function ContactPage() {
  return (
    <div className="contact">
      <div className="contact__form">
        <h1 style={{ color: 'black' }}>Contactez-nous</h1>
        <ContactForm />
      </div>
    </div>
  );
}
export default ContactPage;
