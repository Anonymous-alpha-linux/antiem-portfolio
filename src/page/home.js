import React from 'react';
import './style/home.css';
import { Col, Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import Crane from '../img/crane.png';
const listImg = [
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
    'https://swiperjs.com/demos/images/nature-4.jpg',
    'https://swiperjs.com/demos/images/nature-5.jpg',
    'https://swiperjs.com/demos/images/nature-6.jpg',
    'https://swiperjs.com/demos/images/nature-7.jpg',
    'https://swiperjs.com/demos/images/nature-8.jpg',
    'https://swiperjs.com/demos/images/nature-9.jpg',
    'https://swiperjs.com/demos/images/nature-10.jpg',
];
export default function Home() {
    return (
        <div>
            <div className="container">
                <Row className="py-5">
                    {/* <Col className="col-4">1</Col>
                    <Col className="col-8"> */}
                    <Swiper
                        // cssMode={true}
                        navigation={true}
                        // mousewheel={true}
                        effect={'fade'}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        keyboard={true}
                        modules={[Navigation, Keyboard, EffectFade, Autoplay]}
                        className="mySwiper"
                    >
                        {listImg.map((item, index) => (
                            <SwiperSlide key={index} className="section-1-slide">
                                <img src={item} className="section-1-slide-img" />
                                <div
                                    className="section-1-slide-img-filter"
                                    style={{ backgroundImage: `url(${item})` }}
                                ></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* </Col> */}
                </Row>
                <Row className="align-items-center py-5" style={{ position: 'relative' }}>
                    <Col className="section-2-col-1 col-4 p-0">
                        <div className="section-2-title mb-5">About Us</div>
                        <div className="section-2-content">
                            An Tiêm Penjing là công ty ĐẦU TIÊN của Việt Nam đi tiên phong trong việc kiến tạo “khu vườn
                            bền vững” – Cam kết không sử dụng hóa chất cho cây trồng, đảm bảo tất cả mọi vật liệu trồng
                            cây đều có nguồn gốc hữu cơ từ thiên nhiên, không làm hại môi trường, an toàn cho nguồn nước
                            và sức khỏe con người ngay cả với trẻ nhỏ.
                        </div>
                    </Col>
                    <Col className="col-8 p-0">
                        <img
                            src="https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwYmFubmVyfGVufDB8fDB8fHww&w=1000&q=80"
                            width={'100%'}
                        />
                    </Col>
                </Row>
                <div className="section-3 pt-5">
                    <div className="section-3-title-form">
                        <div className="section-3-subtitle">
                            <b>An Tiêm</b>
                        </div>
                        <div className="section-3-line"></div>
                        <div className="section-3-title">Dịch vụ của chúng tôi</div>
                    </div>
                    <div>
                        <Row className="section-3-container gap-5 pb-5">
                            <Col className="section-3-card px-0">
                                <div className="section-3-card-img">
                                    <img
                                        src="https://media.istockphoto.com/id/505625400/photo/toucan-on-the-branch.webp?b=1&s=170667a&w=0&k=20&c=xkza6GPx2UkLHT-FMaplnK5OEV7ZoKNpEriUIEMaxUk="
                                        height={'100%'}
                                        width={'100%'}
                                    />
                                </div>
                                <div className="section-3-card-content">
                                    <div className="my-1" style={{ fontSize: '25px' }}>
                                        Animal Speech Topics
                                    </div>
                                    <p style={{ fontSize: '16px' }}>
                                        Writing an exciting and thoughtful speech requires one to select a good topic,
                                        research it thoroughly, and formation of individual opinions to express the
                                        same.
                                    </p>
                                </div>
                            </Col>
                            <Col className="section-3-card px-0">
                                <div className="section-3-card-img">
                                    <img
                                        src="https://media.istockphoto.com/id/505625400/photo/toucan-on-the-branch.webp?b=1&s=170667a&w=0&k=20&c=xkza6GPx2UkLHT-FMaplnK5OEV7ZoKNpEriUIEMaxUk="
                                        height={'100%'}
                                        width={'100%'}
                                    />
                                </div>
                                <div className="section-3-card-content">
                                    <div className="my-1" style={{ fontSize: '25px' }}>
                                        Animal Speech Topics
                                    </div>
                                    <p style={{ fontSize: '16px' }}>
                                        Writing an exciting and thoughtful speech requires one to select a good topic,
                                        research it thoroughly, and formation of individual opinions to express the
                                        same.
                                    </p>
                                </div>
                            </Col>
                            <Col className="section-3-card px-0">
                                <div className="section-3-card-img">
                                    <img
                                        src="https://media.istockphoto.com/id/505625400/photo/toucan-on-the-branch.webp?b=1&s=170667a&w=0&k=20&c=xkza6GPx2UkLHT-FMaplnK5OEV7ZoKNpEriUIEMaxUk="
                                        height={'100%'}
                                        width={'100%'}
                                    />
                                </div>
                                <div className="section-3-card-content">
                                    <div className="my-1" style={{ fontSize: '25px' }}>
                                        Animal Speech Topics
                                    </div>
                                    <p style={{ fontSize: '16px' }}>
                                        Writing an exciting and thoughtful speech requires one to select a good topic,
                                        research it thoroughly, and formation of individual opinions to express the
                                        same.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div className="section-5 mt-5">
                <div className="section-5-bg py-5">
                    <div className="container">
                        <div className="d-flex align-items-center gap-3 mt-5 mb-3">
                            <div className="section-3-subtitle">
                                <b>An Tiêm</b>
                            </div>
                            <div className="section-3-line"></div>
                        </div>
                        <div className="section-5-title">Dự án gần đây của chúng tôi</div>
                    </div>
                </div>
                <div className="section-5-project container">
                    <Row className="pb-4">
                        <Col className="p-0">
                            <img
                                src="https://img.freepik.com/free-photo/ferocious-tiger-family-nature_23-2150767553.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1696291200&semt=ais"
                                width={'100%'}
                            />
                        </Col>
                        <Col
                            className="d-flex justify-content-center align-items-center flex-column gap-4 p-0"
                            style={{ background: 'white' }}
                        >
                            <div className="section-5-project-date">31/12/2022</div>
                            <div className="section-5-project-name">Tên Dự Án</div>
                            <div className="section-5-project-description">Mô tả</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-4">
                            <Row>
                                <Col className="p-0">
                                    <img
                                        src="https://img.freepik.com/free-photo/ferocious-tiger-family-nature_23-2150767553.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1696291200&semt=ais"
                                        width={'100%'}
                                    />
                                </Col>
                                <Col>
                                    <div className="section-5-project-date">31/12/2022</div>
                                    <div style={{ fontWeight: '700' }}>Tên Dự Án</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="section-4">
                <div className="section-4-img-frame">
                    <img
                        src="https://t3.ftcdn.net/jpg/03/77/38/02/360_F_377380244_Z7AOXqVIDzLb4XJQ7RXfGnEJrcwhcBp1.jpg"
                        height={'100%'}
                        className="section-4-img"
                    />
                    <div className="section-4-content">
                        <div className="section-4-brand">
                            <b>Antiem</b>
                        </div>
                        <div className="section-4-title">Cool Green Science</div>
                        <div className="section-4-btn-blog">Read Our Blog</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
