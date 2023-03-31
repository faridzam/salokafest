import React, { useState, useEffect } from 'react';
import {Fab, Zoom} from '@mui/material';
import {WhatsApp} from '@mui/icons-material';

const WhatsAppButton = () => {

    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        setShowButton(true);
    }, []);

    const contactUs = () => {
        window.open('https://wa.me/+6285788890777')
        .then((response) => {
            window.close();
        }).catch((error) => {
            window.close();
        });
    }

    const fabStyle = {
        zIndex: '12000',
        position: 'fixed',
        bottom: 16,
        right: 16,
    };

    return (
        <div style={fabStyle}>
            <Zoom in={showButton}>
                <Fab size="medium" color='primary' onClick={contactUs}>
                    <WhatsApp/>
                </Fab>
            </Zoom>
        </div>
    );
}

export default WhatsAppButton;
