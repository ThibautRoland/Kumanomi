import Cookies from 'js-cookie';

// cross crf token warning
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value
export function saveTokenInCookie(token : string){
    Cookies.set('token', token);
}

export function getBearerToken() : string{
    const token = Cookies.get('token')
    if (typeof token === "string"){
        return token
    }
    return ""
}

export function getTokenFromContext(context: any) : string {
    const allCookiesStr = context.req.headers.cookie as string
    const keyValuePairs: string[] = allCookiesStr.split('; ');

    const dataMap: { [key: string]: string } = {};
    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('=');
      dataMap[key] = value;
    });

    const tokenValue = dataMap['token'];

    return tokenValue 
}