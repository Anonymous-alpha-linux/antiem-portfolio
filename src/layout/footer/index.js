import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FiPhoneCall } from 'react-icons/fi';
import { BiUserVoice } from 'react-icons/bi';
import { LuMapPin } from 'react-icons/lu';
import { AiOutlineMail } from 'react-icons/ai';
import { TbSocial } from 'react-icons/tb';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaYoutubeSquare } from 'react-icons/fa';
import { IoMailSharp } from 'react-icons/io5';
import logo from '../../img/logo.svg';
import '../footer/footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <div className="container py-4">
                <Row className="mb-3 pb-3 border-bottom footer-contact-form">
                    <Col xs="12" sm="6" xl="3">
                        <div>
                            <img src={logo} className="logo-antiem-footer" />
                        </div>
                    </Col>
                    <Col xs="12" sm="6" xl="3">
                        <div className="footer-col-top">
                            <span>
                                <FiPhoneCall style={{ fontSize: '25px' }}></FiPhoneCall>
                            </span>
                            <span>
                                <div>Hotline</div>
                                <div>
                                    <b>0909 850 381 – 079 479 3456</b>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs="12" sm="6" xl="3">
                        <div className="footer-col-top">
                            <span>
                                <BiUserVoice style={{ fontSize: '25px' }}></BiUserVoice>
                            </span>
                            <span>
                                <div>Hỗ trợ khách hàng</div>
                                <div>
                                    <b>antiemlandscape@gmail.com</b>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col xs="12" sm="6" xl="3">
                        <div className="footer-col-top">
                            <span>
                                <TbSocial style={{ fontSize: '25px' }}></TbSocial>
                            </span>
                            <span>
                                <div>Kết nối với chúng tôi</div>
                                <div>
                                    <FaFacebookSquare
                                        className="mt-2"
                                        style={{ fontSize: '32px', marginRight: '10px', cursor: 'pointer' }}
                                    ></FaFacebookSquare>
                                    <FaYoutubeSquare
                                        className="mt-2"
                                        style={{ fontSize: '32px', cursor: 'pointer' }}
                                    ></FaYoutubeSquare>
                                </div>
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" lg="6" md="6" className="footer-col-bot mb-3">
                        <b>
                            <div className="mb-3" style={{ textTransform: 'uppercase' }}>
                                CÔNG TY TNHH ĐẦU TƯ VÀ DỊCH VỤ AN TIÊM PENJING
                            </div>
                        </b>
                        <div className="d-flex align-items-center">
                            <div>
                                <LuMapPin style={{ marginRight: '15px', fontSize: '22px' }}></LuMapPin>
                            </div>
                            <div> Số 17 Trường Chinh, Phường Long Toàn, TP Bà Rịa, Tỉnh Bà Rịa - Vũng Tàu</div>
                        </div>
                        <div>
                            <FiPhoneCall style={{ marginRight: '15px', fontSize: '22px' }}></FiPhoneCall>0909 850 381 –
                            079 479 3456
                        </div>
                        <div>
                            <AiOutlineMail style={{ marginRight: '15px', fontSize: '22px' }}></AiOutlineMail>
                            antiemlandscape@gmail.com
                        </div>
                    </Col>
                    <Col xs="12" lg="3" md="3" className="footer-col-bot mb-3">
                        <div className="mb-3" style={{ textTransform: 'uppercase' }}>
                            <b>Hướng dẫn</b>
                        </div>
                        <div>Báo giá & hỗ trợ</div>
                        <div>Câu hỏi thường gặp</div>
                        <div>Gợi ý báo lỗi</div>
                    </Col>
                    <Col xs="12" lg="3" md="3" className="footer-col-bot mb-3">
                        <div className="mb-3" style={{ textTransform: 'uppercase' }}>
                            <b>Quy Định</b>
                        </div>
                        <div>Điều khoản</div>
                        <div>Chính sách bảo mật</div>
                        <div>Giải quyết khiếu nại</div>
                    </Col>
                    {/* <Col xs="12" lg="3" md="6" className="footer-col-bot mb-3">
                        <div className="mb-3" style={{ textTransform: 'uppercase' }}>
                            <b>Đăng ký nhận tin</b>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div className="footer-input-email">
                                <input type="text" placeholder="Nhập email của bạn" />
                                <div className="footer-icon-send">
                                    <RiSendPlaneLine></RiSendPlaneLine>
                                </div>
                            </div>
                        </div>
                    </Col> */}
                </Row>
            </div>
            <div className="text-center py-1" style={{ background: '#B4B4B3', fontSize: '13px' }}>
                copyright@Catmedia
            </div>
        </div>
    );
}
