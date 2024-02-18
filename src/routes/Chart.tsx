import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChat from "react-apexcharts";

interface IHistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChat
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close),
            },
          ]}
          options={{
            // theme: {
            //   mode: "dark",
            // },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 5,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
