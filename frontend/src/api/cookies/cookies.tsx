import Cookies from 'js-cookie';

// cross crf token warning
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value
export function saveTokenInCookie(token : string){
    Cookies.set('token', token);
}

export function getBearerToken() : string{
    //todo check what happen if undefined
    return Cookies.get('token') as string
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