export class StudentInfo {
    sid: number
    name: string
    gender: number
    degree: number
    major: string
    intro: string
}

export class TeamInfoType {
    team_id: number
    creator_id: number
    members: StudentInfo[]
}

export class InvitationInfoType {
    sid: number
    name: string
    is_invitation: boolean
}

export class SidebarItemType {
    title: string
    icon: string
    router_path: string
}

export class EditPasswdForm {
    sid: number
    oldPasswd: number
    newPasswd: number
}
