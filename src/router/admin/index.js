import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../../layout/sidebar/sidebar';
import { GoFileMedia } from 'react-icons/go';
import { CgWebsite } from 'react-icons/cg';
import { BsNewspaper } from 'react-icons/bs';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';

// Pages
import { PageContentEditor, PageAssetUploader, PageAdminBlogPost, PageAdminContact } from '../../page';

function RedirectAdmin() {
    console.log('redirected');
    return <Navigate to={'/admin/media'} replace></Navigate>;
}

let sidebarMenu = [
    {
        name: 'Thư viện',
        path: 'media',
        element: <PageAssetUploader></PageAssetUploader>,
        icon: <GoFileMedia></GoFileMedia>,
    },
    {
        name: 'Nội dung trang',
        path: 'web-content-editor',
        element: <PageContentEditor></PageContentEditor>,
        icon: <CgWebsite></CgWebsite>,
    },
    {
        name: 'Bài viết',
        path: 'blog',
        element: <PageAdminBlogPost></PageAdminBlogPost>,
        icon: <BsNewspaper></BsNewspaper>,
    },
    {
        name: 'Liên lạc',
        path: 'web-contact-editor',
        element: <PageAdminContact></PageAdminContact>,
        icon: <BiSolidPhoneCall></BiSolidPhoneCall>,
    },
    {
        name: 'Cài đặt',
        path: 'setting',
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
        children: [
            ...sidebarMenu,
            {
                path: '*',
                element: <RedirectAdmin></RedirectAdmin>,
            },
        ],
    },
    {
        path: '*',
        element: <RedirectAdmin></RedirectAdmin>,
    },
];
