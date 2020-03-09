import React from 'react';
import { ScoreClick } from '@optisantis/outil-global/components';
import '../styles/components/ScoreIndicator.scss'

interface ScoreIndicatorProps {
    title: string;
    icon: JSX.Element;
    record: string;
}

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ title, icon, record }) => {
    return (
        <div className="ScoreIndicator">
            <div className="_flex _items-center _mb-sm">
                {icon}
                <h3 className="_m-none _ml-xs">{title}</h3>
            </div>
            <div className="_flex _justify-start">
                <ScoreClick isIcon iconPosition="left" count={record} />
            </div>
        </div>
    );
};

export default ScoreIndicator;
