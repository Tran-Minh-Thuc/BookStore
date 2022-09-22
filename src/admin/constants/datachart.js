export const widgetsData = [
    {
        title: "Đơn hàng",
        bgColor: "rgb(255, 107, 69)",
    },
    {
        title: "Doanh số",
        bgColor: "rgb(38, 115, 221)",
    },
    {
        title: "Lượt truy cập",
        bgColor: "rgb(88, 183, 241)",
    },
];

const chartTodayData = [
    {
        name: "00:00",
        "Đơn hàng": 500,
        "Doanh số": 700,
        "Lượt truy cập": 500,
    },
    {
        name: "01:00",
        "Đơn hàng": 500,
        "Doanh số": 700,
        "Lượt truy cập": 600,
    },
    {
        name: "02:00",
        "Đơn hàng": 500,
        "Doanh số": 700,
        "Lượt truy cập": 700,
    },
    {
        name: "03:00",
        "Đơn hàng": 700,
        "Doanh số": 700,
        "Lượt truy cập": 500,
    },
    {
        name: "04:00",
        "Đơn hàng": 300,
        "Doanh số": 700,
        "Lượt truy cập": 300,
    },
    {
        name: "05:00",
        "Đơn hàng": 200,
        "Doanh số": 700,
        "Lượt truy cập": 900,
    },
    {
        name: "06:00",
        "Đơn hàng": 1300,
        "Doanh số": 1300,
        "Lượt truy cập": 800,
    },
    {
        name: "07:00",
        "Đơn hàng": 400,
        "Doanh số": 700,
        "Lượt truy cập": 1100,
    },
    {
        name: "08:00",
        "Đơn hàng": 200,
        "Doanh số": 700,
        "Lượt truy cập": 900,
    },
    {
        name: "09:00",
        "Đơn hàng": 500,
        "Doanh số": 300,
        "Lượt truy cập": 1100,
    },
    {
        name: "10:00",
        "Đơn hàng": 500,
        "Doanh số": 600,
        "Lượt truy cập": 1100,
    },
    {
        name: "11:00",
        "Đơn hàng": 200,
        "Doanh số": 800,
        "Lượt truy cập": 1100,
    },
    {
        name: "12:00",
        "Đơn hàng": 1100,
        "Doanh số": 300,
        "Lượt truy cập": 1600,
    },
    {
        name: "13:00",
        "Đơn hàng": 500,
        "Doanh số": 300,
        "Lượt truy cập": 1100,
    },
    {
        name: "14:00",
        "Đơn hàng": 500,
        "Doanh số": 700,
        "Lượt truy cập": 200,
    },
    {
        name: "15:00",
        "Đơn hàng": 500,
        "Doanh số": 900,
        "Lượt truy cập": 300,
    },
    {
        name: "16:00",
        "Đơn hàng": 500,
        "Doanh số": 700,
        "Lượt truy cập": 800,
    },
    {
        name: "17:00",
        "Đơn hàng": 400,
        "Doanh số": 200,
        "Lượt truy cập": 800,
    },
    {
        name: "18:00",
        "Đơn hàng": 200,
        "Doanh số": 400,
        "Lượt truy cập": 300,
    },
    {
        name: "19:00",
        "Đơn hàng": 500,
        "Doanh số": 200,
        "Lượt truy cập": 700,
    },
    {
        name: "20:00",
        "Đơn hàng": 500,
        "Doanh số": 300,
        "Lượt truy cập": 400,
    },
    {
        name: "21:00",
        "Đơn hàng": 500,
        "Doanh số": 500,
        "Lượt truy cập": 800,
    },
    {
        name: "22:00",
        "Đơn hàng": 200,
        "Doanh số": 400,
        "Lượt truy cập": 700,
    },
    {
        name: "23:00",
        "Đơn hàng": 500,
        "Doanh số": 300,
        "Lượt truy cập": 500,
    },
    {
        name: "23:59",
        "Đơn hàng": 0,
        "Doanh số": 450,
        "Lượt truy cập": 500,
    },
];

const hour = new Date().getHours();
const month = new Date().getMonth() + 1;

export const dataTodayFiltered = chartTodayData.filter(item => { return parseInt(item.name.substring(0, 2)) <= hour });


export const chartWeekData = [
    {
        name: "06-07",
        "Đơn hàng": 500,
        "Doanh số": 500,
        "Lượt truy cập": 500,
    },
    {
        name: "07-07",
        "Đơn hàng": 500,
        "Doanh số": 700,
        "Lượt truy cập": 600,
    },
    {
        name: "08-07",
        "Đơn hàng": 500,
        "Doanh số": 600,
        "Lượt truy cập": 700,
    },
    {
        name: "09-07",
        "Đơn hàng": 700,
        "Doanh số": 700,
        "Lượt truy cập": 500,
    },
    {
        name: "10-07",
        "Đơn hàng": 300,
        "Doanh số": 900,
        "Lượt truy cập": 300,
    },
    {
        name: "11-07",
        "Đơn hàng": 200,
        "Doanh số": 800,
        "Lượt truy cập": 900,
    },
    {
        name: "12-07",
        "Đơn hàng": 1300,
        "Doanh số": 1300,
        "Lượt truy cập": 800,
    },
];

const chartMonthData = [
    {
        name: "Tháng 1",
        "Đơn hàng": 200,
        "Doanh số": 300,
        "Lượt truy cập": 500,
    },
    {
        name: "Tháng 2",
        "Đơn hàng": 500,
        "Doanh số": 300,
        "Lượt truy cập": 600,
    },
    {
        name: "Tháng 3",
        "Đơn hàng": 500,
        "Doanh số": 600,
        "Lượt truy cập": 700,
    },
    {
        name: "Tháng 4",
        "Đơn hàng": 800,
        "Doanh số": 900,
        "Lượt truy cập": 500,
    },
    {
        name: "Tháng 5",
        "Đơn hàng": 300,
        "Doanh số": 900,
        "Lượt truy cập": 300,
    },
    {
        name: "Tháng 6",
        "Đơn hàng": 300,
        "Doanh số": 800,
        "Lượt truy cập": 300,
    },
    {
        name: "Tháng 7",
        "Đơn hàng": 900,
        "Doanh số": 600,
        "Lượt truy cập": 800,
    },
    {
        name: "Tháng 8",
        "Đơn hàng": 500,
        "Doanh số": 600,
        "Lượt truy cập": 700,
    },
    {
        name: "Tháng 9",
        "Đơn hàng": 700,
        "Doanh số": 700,
        "Lượt truy cập": 500,
    },
    {
        name: "Tháng 10",
        "Đơn hàng": 300,
        "Doanh số": 900,
        "Lượt truy cập": 300,
    },
    {
        name: "Tháng 11",
        "Đơn hàng": 200,
        "Doanh số": 300,
        "Lượt truy cập": 400,
    },
    {
        name: "Tháng 12",
        "Đơn hàng": 1100,
        "Doanh số": 1200,
        "Lượt truy cập": 1800,
    },
];

export const dataMonthFiltered = chartMonthData.filter(item => { return parseInt(item.name.split(" ")[item.name.split(" ").length - 1]) <= month });


