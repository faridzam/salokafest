import React, { useState, useEffect } from 'react';
import {Fab, Zoom} from '@mui/material';
import {KeyboardDoubleArrowUp} from '@mui/icons-material';

const ToTopButton = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const fabStyle = {
        zIndex: '12000',
        position: 'fixed',
        bottom: 70,
        right: 16,
    };

    return (
        <div style={fabStyle}>
            <Zoom in={showTopBtn}>
                <Fab size="small" color='secondary' onClick={goToTop}>
                    <KeyboardDoubleArrowUp
                    sx={{
                        color: 'white.lightest',
                    }}/>
                </Fab>
            </Zoom>
        </div>
    );
};

export default ToTopButton;
