import React from 'react';
//Boostrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';
//Icon
import { LuMenuSquare } from 'react-icons/lu';
//Css
import '../nav/nav.css';
import { useLayoutEffect } from 'react';
import logo from '../../img/logo.svg';
// import Login from '../../pages/public/login';
// import Register from '../../pages/public/register';

function Navbar() {
    const [navMenu, setNavMenu] = React.useState(false);
    const navlinks = ['Giới thiệu', 'Dịch vụ', 'Sản phẩm', 'Liên Hệ'];

    useLayoutEffect(() => {
        window.addEventListener('scroll', function () {
            var header = this.document.querySelector('#nav');
            header.classList.toggle('compact', this.window.scrollY > 0);
            var logo = this.document.querySelector('.logo-antiem');
            logo.classList.toggle('smaller', this.window.scrollY > 0);
        });
        return () => {
            window.removeEventListener('scroll', () => {});
        };
    }, []);

    return (
        <div className="px-5 nav-component" id="nav">
            {/* <Login show={login} hide={() => setLogin(false)} />
            <Register show={register} hide={() => setRegister(false)}></Register> */}
            <Row className="w-100">
                <Col className="nav-frame-1 d-flex align-items-center gap-4">
                    <div className="nav-logo">
                        <img src={logo} className="logo-antiem" />
                    </div>
                    <div className="nav-topic justify-content-start align-items-center gap-4">
                        {navlinks.map((item, index) => {
                            return (
                                <div className="nav-topic-link">
                                    <div>
                                        <div className="nav-topic-item py-1">{item}</div>
                                        <div className="topic-line"></div>
                                    </div>
                                    <div className="nav-topic-hover">Hover item</div>
                                </div>
                            );
                        })}
                    </div>
                </Col>
                <Col className="nav-frame-2 d-flex justify-content-end align-items-center gap-4">
                    <div className="nav-action-btn justify-content-end align-items-center">
                        {/* <div className="nav-btn-action" onClick={() => setLogin(true)}>
                            Đăng nhập
                        </div>
                        <div className="nav-btn-action" onClick={() => setRegister(true)}>
                            Đăng ký
                        </div> */}
                        {/* <div className="btn-outline">Đăng tin</div> */}
                    </div>
                    <LuMenuSquare className="nav-menu-icon" onClick={() => setNavMenu(true)}></LuMenuSquare>
                    <SidebarMenu navLink={navlinks} show={navMenu} hide={() => setNavMenu(false)}></SidebarMenu>
                </Col>
            </Row>
        </div>
    );
}

function SidebarMenu({ show, hide, navLink }) {
    return (
        <Offcanvas show={show} onHide={hide} placement={'end'}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="nav-sidebar px-3">
                    <div className="row">
                        <button className="nav-btn-post mt-3 py-3">Đăng tin</button>
                    </div>
                    <div className="">
                        <b>
                            {navLink.map((item, index) => {
                                return (
                                    <div className="nav-link my-4" key={index}>
                                        {item}
                                    </div>
                                );
                            })}
                        </b>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
export default Navbar;
