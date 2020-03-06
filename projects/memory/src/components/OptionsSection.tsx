import React from 'react';
import { Button } from '@optisantis/outil-global/components';

interface OptionsSectionProps {
    title: string;
    options: string[];
    theme: 'dark' | 'light';
    onClick?: (event) => void;
}

// darkenprimary
// white

const OptionsSection: React.FC<OptionsSectionProps> = ({ title, options, theme, onClick }) => {
    const themeConfig = {
        text: theme === 'light' ? 'primary' : 'white',
        bg: theme === 'light' ? 'white' : 'darkenprimary',
    };

    const buttons = options.map((option, idx) => {
        return (
            <Button
                key={idx}
                onClick={() => {
                    onClick;
                }}
                activeClass={`_text-${themeConfig.text} _border-${themeConfig.text}`}
                // activeClass={images === label ? '_bg-white _text-primary' : '_text-white _border-white'}
                // onClick={() => {
                //     setImages(label);
                //     changetheme(Object.keys(themes)[value]);
                //     reset();
                // }}
            >
                {option}
            </Button>
        );
    });

    return (
        <div className={`_bg-${themeConfig.bg} _rounded-small _mt-sm`}>
            <h2 className={`_text-center _text-${themeConfig.text} _m-none _pt-sm`}>{title}</h2>
            <div className="_flex _justify-center _px-md _py-sm _rounded-small _flex-wrap">{buttons}</div>
        </div>
    );
};

export default OptionsSection;
