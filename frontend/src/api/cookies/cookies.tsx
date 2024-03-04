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