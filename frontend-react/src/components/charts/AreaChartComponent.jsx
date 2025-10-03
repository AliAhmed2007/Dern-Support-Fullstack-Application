import { AreaChart as ReAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import BaseChart from './BaseChart';
import ChartContainer from './ChartContainer';

const AreaChartComponent = ({
  data,
  xKey,
  areas, // expecting an array of objects, e.g. { key: 'revenue', name: 'Revenue' }
  strokeWidth = 2,
  containerProps,
  chartProps,
  darkMode = false // boolean flag to determine dark or light mode
}) => {
  // Define default color palettes for dark and light mode.
  const defaultDarkColors = ['#a29bfe', '#ffeaa7', '#55efc4', '#fab1a0'];
  const defaultLightColors = ['#ffc658', '#82ca9d', '#ff7300', '#82ca9d'];

  // Choose color palette based on darkMode
  const colors = darkMode ? defaultDarkColors : defaultLightColors;

  return (
    <ChartContainer {...containerProps}>
      <BaseChart>
        {({ theme, margin, ...rest }) => (
          <ReAreaChart data={data} margin={margin} {...rest} {...chartProps}>
            {/* Custom CartesianGrid with only horizontal lines */}
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke={theme.gridColor}
              strokeDasharray="3 3"
              fill="transparent"
            />
            <XAxis
              dataKey={xKey}
              stroke={theme.textColor}
              tick={{ fill: theme.textColor }}
            />
            <YAxis
              stroke={theme.textColor}
              tick={{ fill: theme.textColor }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.tooltip.background,
                borderColor: theme.tooltip.border,
                borderRadius: '6px'
              }}
            />
            {areas.map((area, index) => (
              <Area
                key={area.key}
                type="monotone"
                dataKey={area.key}
                name={area.name}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                strokeWidth={strokeWidth}
                activeDot={{ r: 6 }}
              />
            ))}
          </ReAreaChart>
        )}
      </BaseChart>
    </ChartContainer>
  );
};

export default AreaChartComponent;
