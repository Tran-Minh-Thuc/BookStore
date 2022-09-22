import React from "react";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
  YAxis,
} from "recharts";

const ChartWeek = (props) => {
  return (
    <div className="mt-5 w-full">
      <LineChart
        width={1450}
        height={450}
        data={props.lineSelectedData}
        margin={{ top: 5, bottom: 5, right: 50 }}
        className="bg-white"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#BD1874" />
        <YAxis />
        <Tooltip
          wrapperStyle={{
            boxShadow:
              "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 0px 4px rgba(0, 0, 0, 0.25)",
          }}
          itemStyle={{ padding: "10px" }}
          labelStyle={{
            textAlign: "center",
            paddingBottom: "10px",
            fontWeight: 600,
          }}
        />
        <Legend iconType="circle" fontSize={5} />

        {props.lineSelectedLabel.map((item, index) => {
          return (
            <>
              <Line
                key={index}
                dataKey={item}
                type="monotone"
                stroke={`${
                  item === "Đơn hàng"
                    ? "rgb(255, 107, 69)"
                    : item === "Doanh số"
                    ? "rgb(38, 115, 221)"
                    : item === "Lượt truy cập"
                    ? "rgb(88, 183, 241)"
                    : ""
                }`}
                strokeWidth={2}
              />
            </>
          );
        })}
      </LineChart>
    </div>
  );
};

export default ChartWeek;
