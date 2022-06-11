import { dataSource } from "data/data";
import React, { PureComponent } from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";
import styles from "../../styles/tokonomicsMB.module.css";

const COLORS = [
  "#CC0336",
  "#FFAFC4",
  "#FF799D",
  "#FF4575",
  "#FF0444",
  "#FFD7E2",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class TokonomicsChartMB extends PureComponent {
  render() {
    return (
      <div
        className={styles.tokenMBContainer}
        // style={{ width: "100%", height: 500 }}
      >
        <ResponsiveContainer height={500} width="100%">
          <PieChart>
            <Pie
              dataKey="value"
              data={dataSource}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {dataSource.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend layout="vertical" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
