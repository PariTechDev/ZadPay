import React, { useEffect, useState } from "react";
import "../index.css"; // Make sure this has the styles

const Loader = ({ onFinish }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
            if (onFinish) onFinish();
        }, 2000);
    }, [onFinish]);

    return (
        visible && (
            <div className="page-loader">
                <div className="loader-container">
                    <img
                     src={`${process.env.PUBLIC_URL}/zad.png`}
                        alt="Logo"
                        className="center-logo"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML = 'Loading...';
                        }}
                    />
                    <p>Loading...</p> {/* Add fallback text */}
                </div>
            </div>
        )
    );
};

export default Loader;
