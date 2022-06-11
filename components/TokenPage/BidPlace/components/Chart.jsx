import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { ArgumentScale, Animation } from "@devexpress/dx-react-chart";
import { withStyles } from "@material-ui/core/styles";
import { scalePoint } from "d3-scale";

const data = [
  { year: "2010", android: 67225, ios: 46598 },
  { year: "2011", android: 179873, ios: 90560 },
  { year: "2012", android: 310088, ios: 118848 },
  { year: "2015", android: 539318, ios: 189924 },
];

const chartRootStyles = {
  chart: {
    paddingRight: "20px",
  },
};
// const legendStyles = {
//   root: {
//     display: "flex",
//     margin: "auto",
//     flexDirection: "row",
//   },
// };
// const legendLabelStyles = (theme) => ({
//   label: {
//     paddingTop: theme.spacing(1),
//   },
// });
// const legendItemStyles = {
//   item: {
//     flexDirection: "column",
//   },
// };

const ChartRootBase = ({ classes, ...restProps }) => (
  <Chart.Root {...restProps} className={classes.chart} />
);
// const LegendRootBase = ({ classes, ...restProps }) => (
//   <Legend.Root {...restProps} className={classes.root} />
// );
// const LegendLabelBase = ({ classes, ...restProps }) => (
//   <Legend.Label {...restProps} className={classes.label} />
// );
// const LegendItemBase = ({ classes, ...restProps }) => (
//   <Legend.Item {...restProps} className={classes.item} />
// );
const ChartRoot = withStyles(chartRootStyles, { name: "ChartRoot" })(
  ChartRootBase
);
// const LegendRoot = withStyles(legendStyles, { name: "LegendRoot" })(
//   LegendRootBase
// );
// const LegendLabel = withStyles(legendLabelStyles, { name: "LegendLabel" })(
//   LegendLabelBase
// );
// const LegendItem = withStyles(legendItemStyles, { name: "LegendItem" })(
//   LegendItemBase
// );

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;
    return (
      <Paper>
        <Chart data={chartData} rootComponent={ChartRoot}>
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          <ValueAxis />

          <AreaSeries
            name="Android"
            valueField="android"
            argumentField="year"
            color="red"
          />
          <AreaSeries
            name="iOS"
            valueField="ios"
            argumentField="year"
            color="#4CDC8F"
          />
          <Animation />
          {/* <Legend
            position="bottom"
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={LegendLabel}
          /> */}
          {/* <Title text="Worldwide Sales to End Users by OS" /> */}
        </Chart>
      </Paper>
    );
  }
}
