import React, {useState} from 'react';
import type {FC} from 'react';
import {useTranslations} from 'next-intl';

const Test: FC = () => {
    const t = useTranslations();
    const [count, setCount] = useState(0);

    const onClick = () => setCount((count) => count + 1);

    return (
        <div>
            <span>{t('hello')}</span> <span>{t('world')}</span>
            <div style={{marginTop: '1rem'}}>
                <button onClick={onClick}>{t('clicks', {count})}</button>
            </div>
        </div>
    );
};

export default Test;
