import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import BaseChart from './BaseChart';
import ChartContainer from './ChartContainer';

const BarChartComponent = ({
  data,
  yKey, // expecting the key used for the categorical axis (e.g. "region")
  bars, // expecting an array of objects, e.g. { key: 'sales', name: 'Sales' }
  strokeWidth = 2,
  containerProps,
  chartProps,
  darkMode = false // boolean flag to determine dark or light mode
}) => {
  // Define default color palettes for dark and light mode.
  const defaultDarkColors = ['#a29bfe', '#55efc4', '#ffeaa7', '#fab1a0'];
  const defaultLightColors = ['#ffc658', '#8884d8', '#ff7300', '#82ca9d'];
  const colors = darkMode ? defaultDarkColors : defaultLightColors;

  return (
    <ChartContainer {...containerProps}>
      <BaseChart>
        {({ theme, margin, ...rest }) => (
          <ReBarChart
            data={data}
            layout="vertical" // This makes the bars horizontal
            margin={margin}
            {...rest}
            {...chartProps}
          >
            <CartesianGrid
              horizontal={true}
              vertical={false}
              stroke={theme.gridColor}
              strokeDasharray="3 3"
              fill="transparent"
            />
            {/* In vertical layout, the XAxis is numeric */}
            <XAxis type="number" stroke={theme.textColor} tick={{ fill: theme.textColor }} />
            {/* The YAxis becomes the categorical axis */}
            <YAxis dataKey={yKey} type="category" stroke={theme.textColor} tick={{ fill: theme.textColor }} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.tooltip.background,
                borderColor: theme.tooltip.border,
                borderRadius: '6px'
              }}
            />
            <Legend />
            {bars.map((bar, index) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                name={bar.name}
                fill={colors[index % colors.length]}
                stroke={colors[index % colors.length]}
                strokeWidth={strokeWidth}
              />
            ))}
          </ReBarChart>
        )}
      </BaseChart>
    </ChartContainer>
  );
};

export default BarChartComponent;
