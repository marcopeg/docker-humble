
import React from 'react';

const generateStyle = ({isReady, isRunning, size}) => {
    let css = {
        display: 'inline-block',
        width: size,
        height: size,
        overflow: 'hidden',
        borderRadius: size,
    };

    if (!isReady) {
        css.background = 'orange';
    } else {
        css.background = isRunning ? 'green' : 'red';
    }

    return css;
};

const Status = (props) => (
    <div style={generateStyle(props)}>
        {' '}
    </div>
);

Status.defaultProps = {
    isReady: null,
    isRunning: null,
    size: 20,
}

export default Status;
