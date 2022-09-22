
const data = {
    user: {
        name: 'Dang Kiet',
        img: "https://www.w3schools.com/howto/img_avatar.png"
    },
    summary: [
        {
            title: 'Sales',
            subtitle: 'Total sales today',
            value: '$1.000',
            percent: 70
        },
        {
            title: 'Orders',
            subtitle: 'Total orders today',
            value: '3000',
            percent: 49
        },
        {
            title: 'Revenue',
            subtitle: 'Total revenue today',
            value: '$678',
            percent: 38
        },
        {
            title: 'Visits',
            subtitle: 'Total visits today',
            value: '2345',
            percent: 55
        }
    ],
    revenueSummary: {
        title: 'Revenue',
        value: '$678',
        chartData: {
            labels: ['May', 'Jun', 'July', 'Aug', 'May', 'Jun', 'July', 'Aug'],
            data: [300, 300, 280, 380, 200, 300, 280, 350]
        }
    },
    overall: [
        {
            value: '300K',
            title: 'Orders'
        },
        {
            value: '9.876K',
            title: 'Customers'
        },
        {
            value: '1.234K',
            title: 'Products'
        },
        {
            value: '$5678',
            title: 'Revenue'
        }
    ],
    revenueByChannel: [
        {
            title: 'Direct',
            value: 70
        },
        {
            title: 'External search',
            value: 40
        },
        {
            title: 'Referal',
            value: 60
        },
        {
            title: 'Social',
            value: 30
        }
    ],
    revenueByMonths: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350]
    }
}

export const productsColumn = [
    { field: "id", headerName: "Id", width: 70, height: 100, align: 'center',  headerAlign: 'center', },
    { field: "name", headerName: "Name", width: 250,  headerAlign: 'center', },
    {
        field: "image", headerName: "Images", width: 150,
        headerAlign: 'center',
        renderCell: (params) => {
            return (
                <div className="object-cover bg-no-repeat">
                    <img src={params.row.image} alt="img" />
                </div>
            )
        }
    },
    { field: "author", headerName: "Author", width: 200, align: 'center',  headerAlign: 'center',},
    { field: "descripton", headerName: "Description", width: 200,  headerAlign: 'center',},
];

// export const productsRow = [
//     {
//         id: 1,
//         name: "Nón bảo hiểm 1",
//         image: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         description: "Nón bảo hiểm chất lượng cao",
//         quantity: 10
//     },
//     {
//         id: 2,
//         name: "Nón bảo hiểm 2",
//         image: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         description: "Nón bảo hiểm chất lượng cao",
//         quantity: 10
//     },
//     {
//         id: 3,
//         name: "Nón bảo hiểm 3",
//         image: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         description: "Nón bảo hiểm chất lượng cao",
//         quantity: 10
//     },
//     {
//         id: 4,
//         name: "Nón bảo hiểm 4",
//         image: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//         description: "Nón bảo hiểm chất lượng cao",
//         quantity: 10
//     },
// ];

export const accountsColumn = [
    { field: "id", headerName: "Id", width: 70, align: 'center',  headerAlign: 'center'},
    { field: "created_date", headerName: "Created Date", width: 250, align: 'center',  headerAlign: 'center'},
    { field: "email", headerName: "Email", width: 250, align: 'center',  headerAlign: 'center'},
    { field: "fullname", headerName: "Fullname", width: 250, align: 'center',  headerAlign: 'center'},
    { field: "password", headerName: "Password", width: 250, align: 'center',  headerAlign: 'center'},
    { field: "status", headerName: "Status", width: 250, align: 'center',  headerAlign: 'center'},
    { field: "username", headerName: "User Name", width: 250, align: 'center',  headerAlign: 'center'},
];

export const accountsRow = [
    {
        id: 1,
        created_date: "10-10-2019",
        email: "dangvankiet.11c5@gmail.com",
        fullname: "Dang Van Kiet",
        password: "123456",
        status: "Active",
        username: "dangvankiet"
    },
    {
        id: 2,
        created_date: "10-10-2019",
        email: "dangvankiet.11c5@gmail.com",
        fullname: "Tran Huu Thang",
        password: "123456",
        status: "Active",
        username: "dangvankiet"
    },
    {
        id: 3,
        created_date: "10-10-2019",
        email: "dangvankiet.11c5@gmail.com",
        fullname: "Tran Thuc Khang ",
        password: "123456",
        status: "Active",
        username: "dangvankiet"
    },
]


export default data;