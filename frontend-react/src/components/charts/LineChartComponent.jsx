import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import BaseChart from './BaseChart';
import ChartContainer from './ChartContainer';

const LineChartComponent = ({
  data,
  xKey,
  lines, // expecting an array of objects, e.g. { key: 'totalTickets', name: 'Total Tickets' }
  strokeWidth = 2,
  containerProps,
  chartProps,
  darkMode = false // boolean flag to determine dark or light mode
}) => {
  // Define default color palettes for light and dark mode.
  const defaultDarkColors = ['#a29bfe', '#55efc4', '#ffeaa7', '#fab1a0'];
  const defaultLightColors = ['#ffc658', '#8884d8', '#ff7300', '#82ca9d'];

  // Choose color palette based on darkMode
  const colors = darkMode ? defaultDarkColors : defaultLightColors;
  return (
    <ChartContainer {...containerProps}>
      <BaseChart>
        {({ theme, margin, ...rest }) => (
          <ReLineChart data={data} margin={margin} {...rest} {...chartProps}>
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
            {lines.map((line, index) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                name={line.name}
                stroke={colors[index % colors.length]}
                strokeWidth={strokeWidth}
                activeDot={{ r: 6 }}
              />
            ))}
          </ReLineChart>
        )}
      </BaseChart>
    </ChartContainer>
  );
};

export default LineChartComponent;
