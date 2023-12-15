export const s_center_sidebar_items = [
    {title: "我的资料", icon: "person", router_path: '/student/center/info'},
    {title: "编辑信息", icon: "manage_accounts", router_path: '/student/center/edit'},
    {title: "修改密码", icon: "password", router_path: '/student/center/password'},
];

export const s_team_sidebar_items = [
    {title: "队伍资料", icon: "group", router_path: '/student/team/info'},
    {title: "成员管理", icon: "group_add", router_path: '/student/team/manage'},
    {title: "队伍收藏", icon: "bookmark", router_path: '/student/team/favor'},
    {title: "邀请列表", icon: "handshake", router_path: '/student/team/invitation'},
];

export const s_square_sidebar_items = [
    {title: "房子查看", icon: "king_bed", router_path: '/student/square/dormitory'},
    {title: "选择舍友", icon: "group_add", router_path: '/student/square/schoolmate'},
    {title: "聊天窗口", icon: "chat", router_path: '/student/square/chat'}
];

export const s_notif_sidebar_items = [
    {title: "评论通知", icon: "forum", router_path: '/student/notification/comment'},
    {title: "组队通知", icon: "handshake", router_path: '/student/notification/invitation'}
];

export const s_head_bar_items = [
    {text: '广场', icon: 'local_mall', router_path: s_square_sidebar_items[0].router_path,},
    {text: '个人中心', icon: 'account_circle', router_path: s_center_sidebar_items[0].router_path,},
    {text: '我的队伍', icon: 'group', router_path: s_team_sidebar_items[0].router_path,},
    {text: '消息通知', icon: 'notifications', router_path: s_notif_sidebar_items[0].router_path,},
];