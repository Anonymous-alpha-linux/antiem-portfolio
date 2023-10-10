import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar({ children, menu }) {
    return (
        <Row>
            <Col lg={3}>
                <ul>
                    {menu.map((item, index) => {
                        const { link, name, ...restItem } = item;
                        return (
                            <li key={index}>
                                <Link to={link}>{name}</Link>
                                <ul>
                                    {restItem?.subs?.map((subItem, index2) => {
                                        const { link, name } = subItem;
                                        return (
                                            <li key={index2}>
                                                <Link to={link}>{name}</Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </Col>
            <Col lg={9}>{children}</Col>
        </Row>
    );
}

export default Sidebar;
