import { ResponsiveContainer } from 'recharts';
import useTheme from '../../hooks/useTheme';
import { getChartTheme } from '../../utils/themeUtils';

const BaseChart = ({
    children,
    width = '100%',
    height = 300,
    margin = { top: 20, right: 30, left: 20, bottom: 10 },
    isAnimationActive = true,
    ...props
}) => {
    const { darkMode } = useTheme();
    const theme = getChartTheme(darkMode);

    return (
        <ResponsiveContainer width={width} height={height}>
            {children({
                margin,
                theme,
                colors: theme.chartColors,
                isAnimationActive,
                darkMode,
                ...props
            })}
        </ResponsiveContainer>
    );
};

export default BaseChart;