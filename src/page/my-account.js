import { useEffect, useState } from "react"
import UserService from "../service/UserService";
import jwt_decode from "jwt-decode";
import AddressService from "../service/AddressService";
import OrderService from "../service/OrderService";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Header from "../component/Header";
import Footer from "../component/Footer";
import '../css/my-account.css';
import CreateAddress from "../page/address/address-create/CreateAddress";


export default function MyAccount() {

    const addressService = new AddressService()
    const userservice = new UserService()
    const orderService = new OrderService()

    var username = jwt_decode(userservice.getToken()).sub;
    var userID = parseInt(localStorage.getItem("userId"))


    const initUser = {
        admin: false,
        birthday: "",
        full_name: "",
        id: 0,
        passWord: "",
        userName: ""
    }

    const [user, setUser] = useState(initUser);
    const [listAddress, setListAddress] = useState([])
    const [listOrder, setListOrder] = useState([])
    const [showNewAddress, setShowNewAddress] = useState(false);
    const [statusOrder, setStatusOrder] = useState("all");


    useEffect(() => {
        userservice.getUserByUserName(username).then((data) => {
            setUser(data)
        })
        orderService.getOrderByUserId(userID).then((data) => {
            setListOrder(data)
            console.log(listOrder);
        })
        addressService.getAddressByUserId(userID).then((data) => {
            setListAddress(data)
        })
    }, [])

    function getAddressApi() {
        addressService.getAddressByUserId(userID).then((data) => {
            setListAddress(data)
        })
    }


    function deleteAddress(id) {
        addressService.deleteAddress(parseInt(id)).then((data) => {
            getAddressApi()
        })

    }

    function choseShowListOrder(status) {
        if (status === "all") {
            return listOrder;
        }
        let t = [];
        for (const item of listOrder) {
            if (item.status === status) {
                t.push(item);
            }
        }

        return t;
    }



    const showListAddress = listAddress.map((item, index) =>
        <div key={index} className="address-item">
            <div className="address-detail-header">
                <p><span>{item.name}</span> | {item.phoneNumber}</p>
                <div>
                    <button className="address-btn">Sửa</button>
                    <button className="address-btn" onClick={() => deleteAddress(item.id)}>Xóa</button>
                </div>
            </div>
            <p>{item.detail}</p>
            <p>Xã {item.wards}, Huyện {item.district}, {item.province}</p>
        </div>
    )

    function totalPrice(list) {
        let total = 0;
        for (const item of list) {
            total += item.qty * item.book.price;
        }
        return total + 30000;
    }



    const showListOrder  = choseShowListOrder(statusOrder).map((item) =>
        <div key={item.id} className=" box-order row">
            <div className="order-header col-md-12">
                <h5>Trạng thái | <span>{item.status}</span></h5>
            </div>
            <div className="order-body-1 col-md-6">
                <p>Mã đơn hàng: {item.id}</p>
                <p>Mã giảm giá: (Không)</p>
                <p>Thời gian: {item.create_day}</p>
                <p>Chi tiết đơn hàng: <button>xem chi tiết</button></p>
            </div>
            <div className="order-body-2 col-md-6">
                <p>Người nhận: {item.address.name}</p>
                <p>Số điện thoại: {item.address.phoneNumber}</p>
                <p>Địa chỉ: {item.address.detail}
                    <br></br>
                    {item.address.wards}, {item.address.district}, {item.address.province}
                </p>
            </div>
            <div className="order-footer col-md-12">
                <p>Tổng:<span> {totalPrice(item.list_product)}đ</span> </p>
            </div>

        </div>
    )

    return (
        <div>
            <Header />
            <div className="container account">
                <div className="row">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <div className="col-md-2 content-box-1">
                            <div className="nav-account-button">
                                <Nav variant="pills" >
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Thông tin tài khoản</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Đơn hàng</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="three">Địa chỉ</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </div>

                        <div className="col-md-9 content-box-2">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="container">
                                        <div>
                                            <h2>Thông tin tài khoản</h2>
                                            <p>Quản lý thông tin tài khoản để bảo mật</p>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <h4>Thông tin chi tiết</h4>
                                                        <div className="col-md-2">
                                                            <p>Tên đăng nhập</p>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <p>{user.userName}</p>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <p>Tên</p>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <p>{user.full_name}</p>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <p>Ngày sinh</p>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <p>{user.birthday}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div>
                                        <div className="nav-order">

                                            <Nav variant="pills" defaultActiveKey="event-1">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-1" onClick={() => setStatusOrder("all")}>Tất cả</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-2" onClick={() => setStatusOrder("Chờ xác nhận")}>Chờ xác nhận</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-3" onClick={() => setStatusOrder("Đã xác nhận")}>Đã xác nhận</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-4" onClick={() => setStatusOrder("Đang giao")}>Đang giao</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-5" onClick={() => setStatusOrder("Đã giao")}>Đã giao</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-6" onClick={() => setStatusOrder("Đã hủy")}>Đã hủy</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>
                                        <div>
                                            {showListOrder}
                                        </div>

                                    </div>
                                </Tab.Pane>

                                <Tab.Pane eventKey="three">
                                    <div className="container">
                                        <div className="m-address-header">
                                            <div className="address-header-1" >
                                                <h2>Địa chỉ của tôi</h2>
                                                <p>Quản lý thông địa chỉ nhận hàng</p>
                                            </div>
                                            <div className="address-header-2" >
                                                <button className="account-btn" onClick={() => setShowNewAddress(true)}>Thêm địa chỉ</button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="m-address-detail">
                                                {showListAddress}
                                            </div>
                                        </div>
                                        <CreateAddress getAddressApi = {getAddressApi} openCreateAddress={showNewAddress} handleCloseCreateAddress={() => setShowNewAddress(false)} />
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </div>
            </div>

            <Footer />
        </div >
    )
}