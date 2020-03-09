import { useContext, useEffect } from 'react';
import { snakeCase } from 'lodash';
import { RecordsContext } from '../contexts/RecordsContext';
import { GameContext } from '../contexts/GameContext';
import { TimerContext } from '@optisantis/outil-global/context/TimerContext';

const useRecords = () => {
    const { records, setRecords } = useContext(RecordsContext);
    const { isPlaying, level, theme, clicks } = useContext(GameContext);
    const { seconds } = useContext(TimerContext);

    const compareRecords = (current: number, newValue: number): number => {
        return current === 0 || (newValue < current && newValue !== 0)
            ? newValue
            : current;
    };

    useEffect((): void => {
        if (!isPlaying) {
            const themeParsed = snakeCase(theme);

            if (records[level]) {
                setRecords({
                    ...records,
                    [level]: {
                        [themeParsed]: {
                            clicks: compareRecords(
                                records[level][themeParsed].clicks,
                                clicks
                            ),
                            time: compareRecords(
                                records[level][themeParsed].time,
                                seconds
                            ),
                        },
                    },
                });
            } else {
                setRecords({
                    ...records,
                    [level]: { [themeParsed]: { clicks, time: seconds } },
                });
            }
        }
    }, [isPlaying]);

    return { records };
};

export default useRecords;
