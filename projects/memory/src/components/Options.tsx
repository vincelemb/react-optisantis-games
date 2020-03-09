import React, { useContext } from 'react';
import { snakeCase } from 'lodash';
import { GameContext, THEMES, LEVELS } from '../contexts/GameContext';
import useGame from '../logics/useGame';
import TimeFormat from '@optisantis/outil-global/utils/TimeFormat';

import { Button } from '@optisantis/outil-global/components';
import { ClickSvg, TimeSvg } from '@optisantis/outil-global/components/svg';
import OptionsSection from '../components/OptionsSection';
import ScoreIndicator from '../components/ScoreIndicator';

interface OptionsProps {
    hidden: boolean;
}

const Options: React.FC<OptionsProps> = ({ hidden }) => {
    const { level, setLevel, theme, setTheme } = useContext(GameContext);
    const { records } = useGame();

    const renderButton = (
        buttons: string[],
        active: string,
        theme: 'dark' | 'light',
        onClick: Function
    ): JSX.Element[] => {
        return buttons.map((button, idx) => {
            const activeClass = button === active;

            return (
                <Button
                    key={idx}
                    onClick={onClick.bind(null, button)}
                    isActive={activeClass}
                    theme={theme}>
                    {button}
                </Button>
            );
        });
    };

    return (
        <aside
            className={`_mr-md lg:_mr-none _my-xl _w-full ${
                hidden ? '_block' : 'lg:_hidden '
            }`}>
            <OptionsSection title="Thème" theme="dark">
                {renderButton(THEMES, theme, 'light', setTheme())}
            </OptionsSection>

            <OptionsSection title="Niveau de difficulté" theme="light">
                {renderButton(
                    LEVELS.map((level) => level.toString()),
                    level.toString(),
                    'dark',
                    setLevel()
                )}
            </OptionsSection>

            <OptionsSection
                title="Score"
                desc={`(${level} cartes)`}
                theme="dark">
                <ScoreIndicator
                    title="Temps"
                    icon={<TimeSvg svgWidth="25px" />}
                    record={
                        records[level] && records[level][snakeCase(theme)]
                            ? TimeFormat(records[level][snakeCase(theme)].time)
                            : '00:00'
                    }
                />

                <ScoreIndicator
                    title="Clics"
                    icon={<ClickSvg svgWidth="25px" />}
                    record={
                        records[level] && records[level][snakeCase(theme)]
                            ? records[level][snakeCase(theme)].clicks
                            : 0
                    }
                />
            </OptionsSection>
        </aside>
    );
};

export default Options;
