import React from 'react';

const Footer = () => {
    return (
        <footer style={{ fontFamily: "EditorialNewP", textAlign: 'center', padding: '20px', marginTop: '50px' }}>
            &#169; Copyright Serif (2024)
            <div style={{ marginTop: 5 }}>Contact us at <a style={{ color: 'black', marginTop: 10 }} href="mailto:team@serif.app">team@serif.app</a> to partner with us.</div>
        </footer>
    );
};

export default Footer;
