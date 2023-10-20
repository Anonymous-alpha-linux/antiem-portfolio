import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './style.css';
import { Col, Row } from 'react-bootstrap';

function Sidebar({ children, menu }) {
    const sidebarMenuRef = useRef(null);
    let [sidebarChildrenStyle, setSidebarChildStyle] = useState(null);

    const [openSubTab, setOpenSubtab] = useState(null);

    useEffect(() => {
        if (sidebarMenuRef.current) {
            sidebarChildrenStyle = {
                width: `calc(100% - ${sidebarMenuRef?.current?.getBoundingClientRect?.()?.width}px)`,
            };
            setSidebarChildStyle(sidebarChildrenStyle);
        }
    }, [sidebarMenuRef]);

    return (
        <section className="w-100">
            <div className="sidebar-menu-container" ref={sidebarMenuRef}>
                <ul className="sidebar-menu">
                    <li>
                        <div className="sidebar-logo">
                            <h2 className="mb-1">AN TIEM</h2>
                            <i className="text-end">website</i>
                        </div>
                    </li>
                    {menu.map((item, index) => {
                        const { path, name, ...restItem } = item;
                        return (
                            <li key={index}>
                                <Link to={path}>
                                    <Row>
                                        <Col xs="auto">{restItem?.icon}</Col>
                                        <Col>{name}</Col>
                                        <Col xs="auto" style={{ alignSelf: 'flex-end' }}>
                                            <AiOutlineRight
                                                onClick={() => setOpenSubtab(index)}
                                                style={{
                                                    float: 'right',
                                                    transform: 'rotate(90deg)',
                                                    transformOrigin: 'center',
                                                }}
                                            ></AiOutlineRight>
                                        </Col>
                                    </Row>
                                </Link>
                                {!!restItem?.subs && (
                                    <ul>
                                        {restItem?.subs?.map((subItem, index2) => {
                                            const { path, name } = subItem;
                                            return (
                                                <li key={index2}>
                                                    <Link to={path}>{name}</Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="sidebar-children" style={sidebarChildrenStyle}>
                {children}
            </div>
        </section>
    );
}

export default Sidebar;
