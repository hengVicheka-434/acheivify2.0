import React from 'react';
import '../styles/Loading.css';

const LoadingOverlay = ({ isLoading, children }) => {
    if (!isLoading) {
        return <>{children}</>;
    }

    return (
        // The overlay element
        <div className="loading-overlay">
                <div className="spinner"></div>
            {/* <div className="loader">
            </div> */}
        </div>
    );
};

export default LoadingOverlay;