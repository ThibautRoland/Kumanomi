import { ProjectMember } from '@/interfaces/projectMember';
import Cookies from 'js-cookie';

// cross crf token warning
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value
export function saveTokenInCookie(token : string){
    Cookies.set('token', token);
}

export function saveUserIdInCookie(id : string){
    Cookies.set('user_id', id);
}

// export function saveProjectMemberInCookie(projectMember: ProjectMember) {
//     Cookies.set("project_member_id", projectMember.id.toString())
//     Cookies.set("project_member_first_name", projectMember.first_name)
//     Cookies.set("project_member_role", projectMember.role)
// }

export function saveUserProfilImgInCookie(profilImg : string){
    Cookies.set('profil_img', profilImg);
}

export function getBearerToken() : string{
    const token = Cookies.get('token')
    if (typeof token === "string"){
        return token
    }
    return ""
}

export function getItemFromContext(context: any, item: string) : string {
    const allCookiesStr = context.req.headers.cookie as string
    const keyValuePairs: string[] = allCookiesStr.split('; ');

    const dataMap: { [key: string]: string } = {};
    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('=');
      dataMap[key] = value;
    });

    const itemValue = dataMap[item];

    return itemValue 
}