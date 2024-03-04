import { getTasksApi } from '@/api/sessions/sessions'
import { tasksRequest } from '@/interfaces/sessions';
import { getBearerToken } from '@/api/cookies/cookies'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

type IndexProps = {
  token: string
} 

export default function Dashboard({token}: IndexProps) {
  const router = useRouter();
  const [tokenState, setTokenState] = useState("")

  useEffect(() => {
    console.log("token props -> " + token);
    // setTokenState(router.query.token as string)
  }, []);

  function printCookie(){
    const HAAAA_COOKIE = getBearerToken()
    console.log("from getBerarToken "+HAAAA_COOKIE)
  }

  function printProps(){
    const tokenProp: string | string[] | undefined = router.query.token
    console.log("props sent from login page "+tokenProp)
  }

    return (<div>
          <h1 className="text-center font-bold text-3xl py-5">Dashboard</h1>
          <button className='border p-3 rounded-lg' onClick={printCookie}>get token</button>
          <button className='border p-3 rounded-lg' onClick={printProps}>get props</button>
        </div>
    );
  }


  export async function getServerSideProps() {
    // todo : get token from cookies
    const token = getBearerToken()
    // console.log("haaa cookie from dashbord serversideprops -> " +token)

    
    // const taskRequest = {
    //   id: 1,
    //   token: "token_from_cookies"
    // } as tasksRequest
    // const res = await getTasksApi(taskRequest)

    return {
      props: {
        token
      }
    }
  }