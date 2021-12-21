import { type } from 'os';
import React from 'react';

interface Props {
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
}

const TestButton: React.FC<Props> = ({ children, type }) => {

    return (
        <button type={type}>
            {children}
            {children}
        </button>
    );
};

TestButton.defaultProps = {
    type: 'button'
};


export default TestButton;