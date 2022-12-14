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
                    <button className="address-btn">S???a</button>
                    <button className="address-btn" onClick={() => deleteAddress(item.id)}>X??a</button>
                </div>
            </div>
            <p>{item.detail}</p>
            <p>X?? {item.wards}, Huy???n {item.district}, {item.province}</p>
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
                <h5>Tr???ng th??i | <span>{item.status}</span></h5>
            </div>
            <div className="order-body-1 col-md-6">
                <p>M?? ????n h??ng: {item.id}</p>
                <p>M?? gi???m gi??: (Kh??ng)</p>
                <p>Th???i gian: {item.create_day}</p>
                <p>Chi ti???t ????n h??ng: <button>xem chi ti???t</button></p>
            </div>
            <div className="order-body-2 col-md-6">
                <p>Ng?????i nh???n: {item.address.name}</p>
                <p>S??? ??i???n tho???i: {item.address.phoneNumber}</p>
                <p>?????a ch???: {item.address.detail}
                    <br></br>
                    {item.address.wards}, {item.address.district}, {item.address.province}
                </p>
            </div>
            <div className="order-footer col-md-12">
                <p>T???ng:<span> {totalPrice(item.list_product)}??</span> </p>
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
                                        <Nav.Link eventKey="first">Th??ng tin t??i kho???n</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">????n h??ng</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="three">?????a ch???</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </div>

                        <div className="col-md-9 content-box-2">
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="container">
                                        <div>
                                            <h2>Th??ng tin t??i kho???n</h2>
                                            <p>Qu???n l?? th??ng tin t??i kho???n ????? b???o m???t</p>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <h4>Th??ng tin chi ti???t</h4>
                                                        <div className="col-md-2">
                                                            <p>T??n ????ng nh???p</p>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <p>{user.userName}</p>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <p>T??n</p>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <p>{user.full_name}</p>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <p>Ng??y sinh</p>
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
                                                    <Nav.Link eventKey="event-1" onClick={() => setStatusOrder("all")}>T???t c???</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-2" onClick={() => setStatusOrder("Ch??? x??c nh???n")}>Ch??? x??c nh???n</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-3" onClick={() => setStatusOrder("???? x??c nh???n")}>???? x??c nh???n</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-4" onClick={() => setStatusOrder("??ang giao")}>??ang giao</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-5" onClick={() => setStatusOrder("???? giao")}>???? giao</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="event-6" onClick={() => setStatusOrder("???? h???y")}>???? h???y</Nav.Link>
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
                                                <h2>?????a ch??? c???a t??i</h2>
                                                <p>Qu???n l?? th??ng ?????a ch??? nh???n h??ng</p>
                                            </div>
                                            <div className="address-header-2" >
                                                <button className="account-btn" onClick={() => setShowNewAddress(true)}>Th??m ?????a ch???</button>
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