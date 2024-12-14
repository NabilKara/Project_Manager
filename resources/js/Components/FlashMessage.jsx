import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const FlashMessage = () => {
    const { flash } = usePage().props;  // Change this line to get flash from props
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (flash.success) {  // Change props.success to flash.success
            setMessage(flash.success);
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setMessage('');
            }, 2000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [flash.success]);  // Change dependency to flash.success

    if (!visible || !message) {
        return null;
    }

    return (
        <div className="mb-4 px-4 py-2 bg-emerald-500 text-white rounded-md transition-all duration-300 ease-in-out">
            {message}
        </div>
    );
};

export default FlashMessage;