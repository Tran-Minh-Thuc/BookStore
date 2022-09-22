import React, { useState, useEffect } from "react";
import ChartToday from "./ChartToday";
import {
  widgetsData,
  dataTodayFiltered,
  chartWeekData,
  dataMonthFiltered,
} from "../../constants/datachart";
import ChartWeek from "./ChartWeek";
import ChartMonth from "./ChartMonth";
import OrderService from "../../../service/OrderService";

const currentSelected = [];
const listCategoryFilter = ["Theo Ngày", "Theo Tuần", "Theo Tháng"];
function Widget(title, bgColor) {
  const [isClick, setIsClick] = useState(false);

  const handleClickWidget = () => {
    setIsClick(!isClick);

    if (!currentSelected.includes(title)) {
      currentSelected.push(title);
    } else {
      currentSelected.splice(currentSelected.indexOf(title), 1);
    }
  };

  return (
    <div
      onClick={handleClickWidget}
      className=" ml-10 h-[132px] w-60 rounded-lg border border-solid border-[#CCCCCC] hover:cursor-pointer"
    >
      <div
        style={{ backgroundColor: `${isClick ? bgColor : "#fff"}` }}
        className={`h-2 w-full rounded-t-lg`}
      ></div>
      <div className="h-[124px] w-full">
        <div className="ml-4 mt-2 w-full">
          <span className="font-medium">{title}</span>
          <p className="mt-4 text-24 text-[#666666]">{}</p>
        </div>
      </div>
    </div>
  );
}
const SalesAnalysis = () => {
  const [typeOfChart, setTypeOfChart] = useState(listCategoryFilter[0]);
  const orderService = new OrderService();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService.getAll().then((res) => {
      console.log(res);
      setOrders(res);
    }).catch((err) => {
      console.log(err);
    });
  }, []);


  return (
    <div className="w-full h-full bg-white">
      <div className="w-full pt-4 pl-5">
        <select
          value={typeOfChart}
          onChange={(e) => setTypeOfChart(e.target.value)}
          className="p-2 rounded-lg drop-shadow-lg bg-gray-100 outline-none border-none w-[200px]"
        >
          {listCategoryFilter.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full h-40 flex flex-row items-center">
        {widgetsData.map((item, index) => {
          return <div key={index}>{Widget(item.title, item.bgColor)}</div>;
        })}
      </div>

      {typeOfChart === "Theo Ngày" ? (
        <div className="w-full">
          <ChartToday
            lineSelectedData={dataTodayFiltered}
            lineSelectedLabel={currentSelected}
          />
        </div>
      ) : typeOfChart === "Theo Tuần" ? (
        <div className="w-full">
          <ChartWeek
            lineSelectedData={chartWeekData}
            lineSelectedLabel={currentSelected}
          />
        </div>
      ) : typeOfChart === "Theo Tháng" ? (
        <div className="w-full">
          <ChartMonth
            lineSelectedData={dataMonthFiltered}
            lineSelectedLabel={currentSelected}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SalesAnalysis;
