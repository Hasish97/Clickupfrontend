interface Badge {
    title: string;
    type: string;
}
export interface MenuItemType {
    id: string;
    title: string;
    type: string;
    icon?: string;
    children?: MenuItemType[];
    breadcrumbs?: boolean;
    url?: string;
    badge?: Badge;
    target?: boolean;
    classes?: string;
    external?: boolean;
}
const chartData: {
    [x: string]: any;
    items: MenuItemType[];
} = {
    items: [
        {
            id: 'clickUp',
            title: 'clickUp',
            type: 'group',
            children: [
                // home ---
                {
                    id: 'home',
                    title: 'Home',
                    type: 'item',
                    url: '/home',
                    icon: 'feather icon-home'
                },
                // employee---
                {
                    id: 'employees',
                    title: 'Employees',
                    type: 'item',
                    url: '/employees',
                    icon: 'feather icon-users'
                },
                // reports----------
                {
                    id: 'report',
                    title: 'Reports',
                    type: 'item',
                    icon: 'feather icon-folder',
                    url: '/reports'
                },
                // reports-----
                // // notification ---
                // {
                //     id: 'notifications',
                //     title: 'Notifications',
                //     type: 'collapse',
                //     icon: 'feather icon-layers',
                //     children: [
                //         {
                //             id: 'statistics',
                //             title: 'Statistics',
                //             type: 'item',
                //             url: '/dashboard/project/statistics'
                //         },
                //         {
                //             id: 'details',
                //             title: 'Details',
                //             type: 'item',
                //             url: '/dashboard/project/details'
                //         },
                //         {
                //             id: 'task-manager',
                //             title: 'Task Manager',
                //             type: 'item',
                //             url: '/dashboard/project/task-manager'
                //         },
                //         {
                //             id: 'members',
                //             title: 'Members',
                //             type: 'item',
                //             url: '/dashboard/project/members'
                //         }
                //     ]
                // }
            ]
        },
        // notification ---
        // // fav ---
        // {
        //     id: 'favourites',
        //     title: 'Favourites',
        //     type: 'group',
        //     icon: 'icon-heart',
        //     children: []
        // },
        // // fav ---
        //  space ---
        {
            id: 'workspace',
            title: 'Workspace',
            type: 'group',
            icon: 'icon-ui',
            url: '/dashboard/project/members',
            children: [
                {
                    id: 'projects',
                    title: 'Projects',
                    type: 'collapse',
                    icon: 'feather icon-layers',
                    children: []
                },
                {
                    id: 'spaceDash',
                    title: 'Space',
                    type: 'item',
                    url: '/spaces',
                    icon: 'feather icon-users'
                }
            ]
        },
        //  space ---
        // //  dashboard ---
        // {
        //     id: 'dashboard',
        //     title: 'Dashboard',
        //     type: 'group',
        //     icon: 'feather icon-layer',
        //     children: []
        // },
        // //  dashboard ---
        // // docs ---
        // {
        //     id: 'docs',
        //     title: 'Docs',
        //     type: 'group',
        //     icon: 'feather icon-folder',
        //     children: []
        // }
        // // docs ---
    ]
};
export default chartData;
