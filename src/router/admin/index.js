import { Outlet } from 'react-router-dom';
import Sidebar from '../../layout/sidebar/sidebar';
import { GoFileMedia } from 'react-icons/go';
import { CgWebsite } from 'react-icons/cg';
import { BsNewspaper } from 'react-icons/bs';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';

// Pages
import { PageContentEditor, PageAssetUploader, PageAdminBlogPost } from '../../page';

let sidebarMenu = [
    {
        name: 'Media Library',
        path: '/admin/media',
        element: <PageAssetUploader></PageAssetUploader>,
        icon: <GoFileMedia></GoFileMedia>,
    },
    {
        name: 'Web Content',
        path: '/admin/web-content-editor?content=landing+page',
        element: <PageContentEditor></PageContentEditor>,
        icon: <CgWebsite></CgWebsite>,
    },
    {
        name: 'Blog',
        path: '/admin/blog',
        element: <PageAdminBlogPost></PageAdminBlogPost>,
        icon: <BsNewspaper></BsNewspaper>,
    },
    {
        name: 'Contact',
        path: '/admin/web-content-editor',
        element: <PageContentEditor></PageContentEditor>,
        icon: <BiSolidPhoneCall></BiSolidPhoneCall>,
    },
    {
        name: 'Setting',
        path: '/admin/setting',
        element: <h2>Admin Setting</h2>,
        icon: <IoIosSettings></IoIosSettings>,
    },
];

export const adminRoutes = [
    {
        path: '',
        element: (
            <Sidebar menu={sidebarMenu}>
                <Outlet></Outlet>
            </Sidebar>
        ),
        children: sidebarMenu,
    },
];
