
import '../css/home.css';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookService from '../service/BookService';
import BookCard from '../component/BookCard';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper";
import { Paginator } from 'primereact/paginator';
import Header from '../component/Header';
import Footer from '../component/Footer';

const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
        return (
            '<span style="color:#BD1874; font-weight: 600; font-size:18px; background-color: #fef4f4; padding-left: 35px" class="' +
            className +
            '">' +
            (index + 1) +
            "</span>"
        );
    },
};

export default function Home() {

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    const initFilter = {
        typeOfBook: [],
        author: [],
        page: 1,
        size: 8,
        name: ""
    }


    const [first, setFirst] = useState(0);
    const onBasicPageChange = (event) => {
        setFilter({ ...filter, page: event.page + 1 })
        setFirst(event.first);
    }
    const [filter, setFilter] = useState(initFilter)
    const [totalProduct, setTotalProduct] = useState(0);

    const [listBook, setListBook] = useState([]);
    const [listBookSwiper, setListBookSwiper] = useState([]);

    const bookService = new BookService();

    function getApi() {
        return bookService.getAll();
    }

    function Update() {
        return filter;
    }

    useEffect(() => {
        bookService.getByPagination(Update()).then((data) => {
            setListBook(data.list)
            setTotalProduct(data.numberOfItems)
        })
    }, [filter])

    useEffect(() => {
        getApi().then((data) => setListBookSwiper(data))
    }, [])


    return (
        <div className='home-area'>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='slider-area'>
                            <Slider {...settings}>
                                <div className='slider-banner slider-background-1'>
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-7">
                                                <div className="hero-caption text-center">
                                                    <span className="" >Science Fiction</span>
                                                    <h1 className="" >The Historys<br /> of Phipino</h1>
                                                    <Link to="/products" className="btn hero-btn" >Browse Store</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='slider-banner slider-background-2'>
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-7">
                                                <div className="hero-caption text-center">
                                                    <span className="" >Science Fiction</span>
                                                    <h1 className="" >The History<br /> of Phipino</h1>
                                                    <Link to="/products" className="btn hero-btn" >Browse Store</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='slider-banner slider-background-3'>
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="col-xxl-4 col-xl-4 col-lg-5 col-md-6 col-sm-7">
                                                <div className="hero-caption text-center">
                                                    <span className="" >Science Fiction</span>
                                                    <h1 className="" >The History<br /> of Phipino</h1>
                                                    <Link to="/products" className="btn hero-btn" >Browse Store</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
            <div className='best-selling'>
                <div className='container'>
                    <div className='w-full'>
                    <h2 className='text-3xl pb-10 font-semibolds  text-center'>Sản phẩm bán chạy</h2>
                        
                        <Swiper
                            slidesPerView={5}
                            freeMode={true}
                            autoplay = {{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={pagination}
                            modules={[FreeMode, Pagination, Autoplay]}
                            className="flex flex-row items-center mb-10"
                        >
                            {listBookSwiper.map((book) => {
                                return (
                                    <SwiperSlide  className="mb-10">
                                        <BookCard book={book} />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                    <div className='w-full'>
                        <h2 className='text-3xl pb-10 font-semibolds  text-center'>Sản phẩm bán chạy</h2>
                        <div className='w-full flex flex-row items-center flex-wrap h-full'>
                            {listBook.map((book) => {
                                return (
                                    <div className='w-[20%]'>
                                        <BookCard book={book} />
                                    </div>
                                )
                            })}
                            
                            
                        </div>
                        <div>
                            <Paginator first={first} rows={8} totalRecords={totalProduct} onPageChange={onBasicPageChange}></Paginator>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}




