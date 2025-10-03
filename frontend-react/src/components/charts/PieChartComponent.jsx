import { PieChart as RePieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import BaseChart from './BaseChart';
import ChartContainer from './ChartContainer';

const PieChartComponent = ({
  data,
  dataKey,
  nameKey,
  innerData,       // New prop for comparison data
  innerDataKey,    // New prop for inner ring data key
  innerNameKey,    // New prop for inner ring name key
  withLegend = true,
  withTooltip = true,
  chartProps,
  containerProps,
  outerRadius = '80%',
  innerRadius = '60%', // New prop for gap between rings
  innerRingRadius = '40%' // New prop for inner ring size
}) => (
  <ChartContainer {...containerProps}>
    <BaseChart>
      {({ theme, colors, margin, ...rest }) => (
        <RePieChart margin={margin} {...rest} {...chartProps}>
          {/* Outer Ring (Primary Data) */}
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            label
          >
            {data?.map((entry, index) => (
              <Cell
                key={`outer-cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          {/* Inner Ring (Comparison Data) */}
          {innerData && (
            <Pie
              data={innerData}
              dataKey={innerDataKey}
              nameKey={innerNameKey}
              cx="50%"
              cy="50%"
              outerRadius={innerRingRadius}
              labelLine={false}
            >
              {innerData?.map((entry, index) => (
                <Cell
                  key={`inner-cell-${index}`}
                  fill={colors[(index + 2) % colors.length]} // Offset color index
                />
              ))}
            </Pie>
          )}

          {withTooltip && (
            <Tooltip
              contentStyle={{
                backgroundColor: theme.tooltip.background,
                borderColor: theme.tooltip.border,
                borderRadius: '6px'
              }}
              formatter={(value, name, props) => [
                value,
                props.payload.payload[props.payload.nameKey] || name
              ]}
            />
          )}

          {withLegend && (
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value, entry) => (
                <span style={{ color: theme.textColor }}>
                  {entry.payload?.name || value}
                </span>
              )}
              payload={[
                ...(data?.map((entry, index) => ({
                  value: entry[nameKey],
                  type: 'square',
                  color: colors[index % colors.length],
                  id: entry[nameKey]
                })) || []),
                ...(innerData?.map((entry, index) => ({
                  value: entry[innerNameKey],
                  type: 'square',
                  color: colors[(index + 2) % colors.length],
                  id: entry[innerNameKey]
                })) || [])
              ]}
            />
          )}
        </RePieChart>
      )}
    </BaseChart>
  </ChartContainer>
);

export default PieChartComponent;