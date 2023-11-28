export const t_center_sidebar_items = [
    {title: "修改密码", icon: "password", router_path: '/teacher/center/password'},
];
export const t_dom_sidebar_items = [
    {title: "创建房间", icon: "add_circle", router_path: '/teacher/dormitory/create'},
    {title: "编辑房间", icon: "real_estate_agent", router_path: '/teacher/dormitory/edit'},
    {title: "选房时间&导出", icon: "alarm", router_path: '/teacher/dormitory/time'},
];

export const t_user_sidebar_items = [
    {title: "创建学生", icon: "person_add", router_path: '/teacher/user/create'},
    {title: "编辑学生", icon: "account_box", router_path: '/teacher/user/edit'},
];

export const t_head_bar_items = [
    {text: '个人中心', icon: 'account_circle', router_path: t_center_sidebar_items[0].router_path},
    {text: '学生管理', icon: 'groups_3', router_path: t_user_sidebar_items[0].router_path},
    {text: '选房管理', icon: 'holiday_village', router_path: t_dom_sidebar_items[0].router_path},
];