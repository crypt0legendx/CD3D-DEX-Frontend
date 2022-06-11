import React from "react";
import Grid from "@mui/material/Grid";
import styles from "../../../../styles/bidChart.module.css";
import Typography from "@mui/material/Typography";
import Demo from "./Chart";
import Image from "next/image";
import useResizeObserver from "@react-hook/resize-observer";
import { SecondCounter } from "../../../Countdown/Counter";
import useCD3D from "../../../../hooks/useCD3D";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const useSize = (target) => {
  const [size, setSize] = React.useState();

  // React.useLayoutEffect(() => {
  //   setSize(target.current.getBoundingClientRect());
  // }, [target]);

  // useResizeObserver(target, (entry) => setSize(entry.contentRect));
  // return size;
};
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const BidChart = (props) => {
  const target = React.useRef(null);
  const size = useSize(target);
  const { data, loading } = useCD3D();
  return (
    <div className={styles.bidChartOuter}>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "45%",
          }}
        >
          <Loader type="Puff" color="#ff0144" height={100} width={100} />
        </div>
      ) : (
        <>
          {/* <div className={styles.bidChartInnerLeft}>
            <Typography variant="h5" gutterBottom component="h5">
              Bids Placed
            </Typography>
            <Typography variant="h6" gutterBottom component="h6">
              {numberWithCommas(data?.bids || 0)}
            </Typography>
          </div> */}
          <div className={styles.bidChartInnerRight}>
            <Typography variant="h5" gutterBottom component="h5">
              Sale Ends in
            </Typography>
            <Typography variant="h6" gutterBottom component="h6">
              <SecondCounter />
            </Typography>
          </div>
          <div className={styles.leftCurtain}>
            <Image
              src={"/assets/homepage/curtain1_1.png"}
              width={100}
              height={300}
            />
          </div>
          <div className={styles.rightCurtain}>
            <Image
              src={"/assets/homepage/curtain2_1.png"}
              width={100}
              height={300}
            />
          </div>
          <div className={styles.bidChartSecVideo}>
            <ReactPlayer
              url="https://youtu.be/Yu8C1dJT-iU"
              playIcon={<PlayCircleOutlineIcon />}
              width="100%"
              height="100%"
            />
          </div>
          {/* <div ref={target} className={styles.areaChart}> */}

          {/* <ResponsiveContainer
              width={680 || size?.width}
              height={300 || size.height}
            >
              <AreaChart
                data={data?.cd3d || []}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="#ffafc4"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="#4CDC8F"
                />
              </AreaChart>
            </ResponsiveContainer> */}
          {/* </div> */}
        </>
      )}
    </div>
  );
};

export default BidChart;
