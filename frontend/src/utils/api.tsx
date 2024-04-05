export function isTokenExpired(response: Response) : boolean {
    console.log("isTokenExpired")
    return response.status === 401 && response.headers.get('WWW-Authenticate') === 'token_expired'
}

interface RedirectObject {
    redirect: {
      destination: string;
      permanent?: boolean;
    };
  }

export function cleanRedirect(redirectionPath : string) : RedirectObject {
    return {
        redirect: {
            destination : redirectionPath,
            permanent : false
          },
      }
    }
