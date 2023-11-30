export const invitation_test1 = [
    {
        name: "新人想进1",
        sid: 12112000,
        is_invitation: false,
    },
    {
        name: "邀请了xx",
        sid: 12112001,
        is_invitation: true
    }
]

export const team_info_simply = {
    teamName: 'Zacky的小队',
    creatorId: '',
    creatorName: '杨宗奇',
    teamMembers: ['钟志源', '徐春晖', '郭健阳']
}
export const user_info = {
    studentInformationForm: {
        studentId: 12110001,
        name: '南小科',
        gender: '男',
        degree: '研究生',
        major: '电子系',
        intro: '大家坏'
    }
}
export const team_info = {
    teamId: 1,
    creatorId: 12110000,
    teamName: '计算机小队',
    joined: false,
    teamMembers: [
        {
            studentId: 12110000,
            name: '苏苏',
            gender: '女',
            degree: '研究生',
            major: '计算机科学与工程系',
            info: '大家好'
        },
        {
            studentId: 12110001,
            name: '南小科',
            gender: '男',
            degree: '研究生',
            major: '电子系',
            info: '大家坏'
        },
        {
            studentId: 12110002,
            name: '玉群',
            gender: '男',
            degree: '博士生',
            major: '软件工程',
            info: '不想写ooad'
        },
        {
            studentId: 12110003,
            name: '坤坤',
            gender: '男',
            degree: '博士生',
            major: '物理系',
            info: '开学了啊啊啊啊啊啊啊啊'
        },
    ],
    fetchTeamInformation: (id) => [],
}

