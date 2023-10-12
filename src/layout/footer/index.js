import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FiPhoneCall, FiHeadphones } from 'react-icons/fi';
import { BsFacebook } from 'react-icons/bs';
import { RiSendPlaneLine } from 'react-icons/ri';
import { BiUserVoice } from 'react-icons/bi';
import { LuMapPin } from 'react-icons/lu';
import { AiOutlineMail } from 'react-icons/ai';
import '../footer/footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <div className="container py-4">
                <Row className="mb-3 pb-3 border-bottom">
                    <Col>
                        <div>Logo</div>
                    </Col>
                    <Col>
                        <div className="footer-col-top">
                            <span>
                                <FiPhoneCall style={{ fontSize: '25px' }}></FiPhoneCall>
                            </span>
                            <span>
                                <div>Hotline</div>
                                <div>
                                    <b>0927272</b>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col>
                        <div className="footer-col-top">
                            <span>
                                <BiUserVoice style={{ fontSize: '25px' }}></BiUserVoice>
                            </span>
                            <span>
                                <div>Hỗ trợ khách hàng</div>
                                <div>
                                    <b>catmedia.vn</b>
                                </div>
                            </span>
                        </div>
                    </Col>
                    <Col>
                        <div className="footer-col-top">
                            <span>
                                <FiHeadphones style={{ fontSize: '25px' }}></FiHeadphones>
                            </span>
                            <span>
                                <div>Hỗ trợ khách hàng</div>
                                <div>
                                    <b>catmedia.vn</b>
                                </div>
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row className="gap-3">
                    <Col className="footer-col-bot">
                        <b>
                            <div className="mb-3" style={{ textTransform: 'uppercase' }}>
                                Công ty Catmedia Việt Nam
                            </div>
                            <div className="d-flex align-items-center">
                                <LuMapPin style={{ marginRight: '15px', fontSize: '22px' }}></LuMapPin>
                                <span> 82 Mỹ An 7, Ngũ Hành Sơn, Đà Nẵng</span>
                            </div>
                            <div>
                                <FiPhoneCall style={{ marginRight: '15px', fontSize: '22px' }}></FiPhoneCall>0218387923
                            </div>
                            <div>
                                <AiOutlineMail style={{ marginRight: '15px', fontSize: '22px' }}></AiOutlineMail>
                                catmedia@gmail.com
                            </div>
                        </b>
                    </Col>
                    <Col className="footer-col-bot">
                        <div className="mb-3" style={{ textTransform: 'uppercase' }}>
                            <b>Hướng dẫn</b>
                        </div>
                        <div>Báo giá & hỗ trợ</div>
                        <div>Câu hỏi thường gặp</div>
                        <div>Gợi ý báo lỗi</div>
                        <div>Sitemap</div>
                    </Col>
                    <Col className="footer-col-bot">
                        <div className="mb-3" style={{ textTransform: 'uppercase' }}>
                            <b>Quy Định</b>
                        </div>
                        <div>Quy định đăng tin</div>
                        <div>Điều khoản</div>
                        <div>Chính sách bảo mật</div>
                        <div>Giải quyết khiếu nại</div>
                    </Col>
                    <Col className="footer-col-bot">
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
                    </Col>
                </Row>
            </div>
            <div className="text-center py-1" style={{ background: '#B4B4B3', fontSize: '13px' }}>
                copyright@Catmedia
            </div>
        </div>
    );
}
