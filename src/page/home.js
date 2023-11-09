import React, { useEffect, useState } from 'react';
import './style/home.css';
import { Button, Col, Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import { Fade } from 'react-reveal';

import { getSetting } from '../api';
// Custom hooks
import { useBlog } from '../hooks';

let homePlaceholder = {
    banner: {
        title: '',
        subtitle: '',
        content: '',
        images: [
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
        ],
    },
    about: {
        title: 'About Us',
        content:
            'An Tiêm Penjing là công ty ĐẦU TIÊN của Việt Nam đi tiên phong trong việc kiến tạo “khu vườn bền vững” – Cam kết không sử dụng hóa chất cho cây trồng, đảm bảo tất cả mọi vật liệu trồng cây đều có nguồn gốc hữu cơ từ thiên nhiên, không làm hại môi trường, an toàn cho nguồn nước và sức khỏe con người ngay cả với trẻ nhỏ.',
        images: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwYmFubmVyfGVufDB8fDB8fHww&w=1000&q=80',
    },
    card: {
        title: 'Dịch vụ của chúng tôi',
        subtitle: 'An Tiêm',
        children: [
            {
                title: 'Animal Speech Topics',
                content:
                    'Writing an exciting and thoughtful speech requires one to select a good topic, research it thoroughly, and formation of individual opinions to express the same.',
                image: 'https://media.istockphoto.com/id/505625400/photo/toucan-on-the-branch.webp?b=1&s=170667a&w=0&k=20&c=xkza6GPx2UkLHT-FMaplnK5OEV7ZoKNpEriUIEMaxUk=',
            },
            {
                title: 'Animal Speech Topics',
                content:
                    'Writing an exciting and thoughtful speech requires one to select a good topic, research it thoroughly, and formation of individual opinions to express the same.',
                img: 'https://media.istockphoto.com/id/505625400/photo/toucan-on-the-branch.webp?b=1&s=170667a&w=0&k=20&c=xkza6GPx2UkLHT-FMaplnK5OEV7ZoKNpEriUIEMaxUk=',
            },
            {
                title: 'Animal Speech Topics',
                content:
                    'Writing an exciting and thoughtful speech requires one to select a good topic, research it thoroughly, and formation of individual opinions to express the same.',
                img: 'https://media.istockphoto.com/id/505625400/photo/toucan-on-the-branch.webp?b=1&s=170667a&w=0&k=20&c=xkza6GPx2UkLHT-FMaplnK5OEV7ZoKNpEriUIEMaxUk=',
            },
        ],
    },
    project: {
        title: 'Dự án gần đây của chúng tôi',
        subtitle: 'An Tiêm',
        items: [
            {
                title: 'Tên Dự Án',
                date: '31/12/2022',
                content: 'Mô tả',
                img: 'https://img.freepik.com/free-photo/ferocious-tiger-family-nature_23-2150767553.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1696291200&semt=ais',
            },
            {
                title: 'Tên Dự Án',
                date: '31/12/2022',
                content: 'Mô tả',
                img: 'https://img.freepik.com/free-photo/ferocious-tiger-family-nature_23-2150767553.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1696291200&semt=ais',
            },
            {
                title: 'Tên Dự Án',
                date: '31/12/2022',
                content: 'Mô tả',
                img: 'https://img.freepik.com/free-photo/ferocious-tiger-family-nature_23-2150767553.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1696291200&semt=ais',
            },
        ],
    },
    blog: {
        title: 'Cool Green Science',
        subtitle: 'Antiem',
        button: 'read our blog',
    },
};

export default function Home() {
    const [homeContent, setHomeContent] = useState();
    const { blogs, setPage, setTake, page, take, total } = useBlog();
    const phone = '0909 850 381';

    useEffect(() => {
        getSetting({
            page: 'Home Page',
        })
            .then((response) => {
                if (response?.data?.isSuccess === false) {
                    setHomeContent(homePlaceholder);
                    return;
                }
                console.log(JSON.parse(response));
                setHomeContent(JSON.parse(response));
            })
            .catch((error) => {});
    }, []);

    return (
        <div id="home-body">
            <section className="pb-5 w-100" id="st-banner">
                <Swiper
                    navigation={true}
                    effect={'fade'}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    keyboard={true}
                    modules={[Navigation, Keyboard, EffectFade, Autoplay]}
                    className="mySwiper"
                >
                    {homeContent?.['banner']?.['images']?.map?.((url, index) => (
                        <SwiperSlide key={index} className="section-1-slide">
                            <img alt={'banner_image'} src={url} className="section-1-slide-img" />
                            <div
                                className="section-1-slide-img-filter"
                                style={{ backgroundImage: `url(${url})` }}
                            ></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            <section className="container" id="st-about">
                <Row className="align-items-center py-5" style={{ position: 'relative' }}>
                    <Col sm="12" lg="4" className="section-2-col-1 p-0">
                        <Fade bottom>
                            <div className="section-2-title">{homeContent?.about?.title}</div>
                            {/* <div className='skeleton'></div> */}
                            <div
                                className="section-2-content"
                                dangerouslySetInnerHTML={{
                                    __html: homeContent?.about?.content,
                                }}
                            ></div>
                        </Fade>
                        <Button variant="success" href={`tel:${phone}`}>
                            Liên hệ ngay
                        </Button>
                    </Col>
                    <Col sm="12" lg="8" className="section-2-img-form p-0">
                        <img
                            className="section-2-img"
                            src={homeContent?.about?.images?.[0]}
                            width={'100%'}
                            loading="lazy"
                            alt="about_image"
                        />
                    </Col>
                </Row>
            </section>

            <section className="section-3 container pt-5" id="st-card">
                <div className="section-3-title-form">
                    <div className="section-3-subtitle">
                        <b>{homeContent?.card?.subtitle}</b>
                    </div>
                    <div className="section-3-line"></div>
                    <div className="section-3-title">{homeContent?.card?.title}</div>
                </div>
                <Row className="section-3-container pb-5">
                    {homeContent?.card?.children?.map((item, index) => (
                        <Col sm="12" lg="4" className="section-3-card my-2 px-0" key={index}>
                            <Fade bottom distance="7%" duration={500 + index * 600}>
                                <div className="section-3-form">
                                    <div className="section-3-card-img">
                                        <img src={item?.image} height={'100%'} width={'100%'} alt="card_image" />
                                    </div>
                                    <div className="section-3-card-content">
                                        <div className="my-1" style={{ fontSize: '25px' }}>
                                            {item?.title}
                                        </div>
                                        <p
                                            style={{ fontSize: '16px' }}
                                            dangerouslySetInnerHTML={{ __html: item?.content }}
                                        ></p>
                                    </div>
                                </div>
                            </Fade>
                        </Col>
                    ))}
                </Row>
            </section>

            <section className="section-5 mt-5" id="st-project">
                <div className="section-5-bg py-5">
                    <div className="container">
                        <div className="d-flex align-items-center gap-3 mt-2 mb-3">
                            <div className="section-3-subtitle">
                                <b>{homeContent?.project?.subtitle}</b>
                            </div>
                            <div className="section-3-line"></div>
                        </div>
                        <div className="section-5-title">{homeContent?.project?.title}</div>
                    </div>
                </div>
                <div className="section-5-project container">
                    <Fade bottom distance="10%">
                        <Swiper
                            navigation={true}
                            cssMode={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Navigation, Autoplay]}
                            className="mySwiper"
                        >
                            {homeContent?.project?.children?.map((item, index) => (
                                <SwiperSlide key={index} style={{ overflow: 'hidden' }}>
                                    <Row className="pb-4">
                                        <Col className="p-0">
                                            <img src={item?.image} width={'100%'} alt={item?.title} loading="lazy" />
                                        </Col>
                                        <Col
                                            className="d-flex justify-content-center align-items-center flex-column gap-4 p-0"
                                            style={{ background: 'white' }}
                                        >
                                            <div className="section-5-project-date">{item?.subtitle}</div>
                                            <div className="section-5-project-name">{item?.title}</div>
                                            <div
                                                className="section-5-project-description p-2"
                                                dangerouslySetInnerHTML={{ __html: item?.content }}
                                            ></div>
                                        </Col>
                                    </Row>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Fade>
                    <Fade bottom istance="10%">
                        <Row style={{ padding: '0 10px' }}>
                            {homeContent?.project?.children?.map((item, index) => (
                                <Col xs="6" sm="6" lg="4" className="mb-2" key={index}>
                                    <Row>
                                        <Col className="p-0">
                                            <img src={item?.image} width={'100%'} alt={item?.title} />
                                        </Col>
                                        <Col>
                                            <div className="section-5-project-date">{item?.subtitle}</div>
                                            <div style={{ fontWeight: '700' }}>{item?.title}</div>
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    </Fade>
                </div>
            </section>

            <section className="section-4" id="st-blog">
                <div className="section-4-img-frame">
                    <img
                        src="https://t3.ftcdn.net/jpg/03/77/38/02/360_F_377380244_Z7AOXqVIDzLb4XJQ7RXfGnEJrcwhcBp1.jpg"
                        height={'100%'}
                        className="section-4-img"
                        alt={'blog_image'}
                    />
                    <div className="section-4-content">
                        <div className="section-4-brand">
                            <b>{homeContent?.blog?.subtitle}</b>
                        </div>
                        <div className="section-4-title">{homeContent?.blog?.title}</div>
                        <Fade bottom distance="20%">
                            <div className="section-4-btn-blog">{homeContent?.blog?.button}</div>
                        </Fade>
                    </div>
                </div>
            </section>
        </div>
    );
}
