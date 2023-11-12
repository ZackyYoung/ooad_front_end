export class StudentInfo {
    sid: number
    name: string
    gender: number
    degree: number
    major: string
    intro: string
}

export class TeamInfo {
    team_id: number
    creator_id: number
    members: StudentInfo[]
}

export class SidebarItem{
    title: string
    icon: string
}
export class EditPasswdForm {
    sid: number
    oldPasswd: number
    newPasswd: number
}
