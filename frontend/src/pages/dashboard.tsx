
import { tasksRequest } from '@/interfaces/sessions';
import { getProtectedEndpoint, getTasksApi } from '@/api/sessions/sessions';
import { getBearerToken } from '@/api/cookies/cookies'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { task } from '@/interfaces/tasks';

type IndexProps = {
  msg: string,
  tasks: task[]
}



export default function Dashboard({msg, tasks}: IndexProps) {
  const router = useRouter();
  const [tokenState, setTokenState] = useState("")

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
          <h1 className="text-center font-bold text-3xl py-5">{msg}</h1>
  
          <button className='border p-3 rounded-lg' onClick={printCookie}>get token</button>
          <button className='border p-3 rounded-lg' onClick={printProps}>get props</button>
          <div>
            {tasks.map((task, i) => (
              <div key={i}>
                <p>{task.id}</p>
                <p>{task.name}</p>
              </div>
            ))}
          </div>
        </div>
    );
  }

  export const config = {
    runtime: 'nodejs',
  }

  export async function getServerSideProps(context : any) {
    //TODO use an auto parser
    const allCookiesStr = context.req.headers.cookie as string
    console.log(context.req.headers.cookie)

    const keyValuePairs: string[] = allCookiesStr.split('; ');

    const dataMap: { [key: string]: string } = {};
    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('=');
      dataMap[key] = value;
    });

    const tokenValue = dataMap['token'];



    console.log("token from GetServerSideProps", tokenValue)
    const welcomeMsg = await getProtectedEndpoint(tokenValue)
    const tasks = await getTasksApi(tokenValue)
    console.log("welcome ?", welcomeMsg)
        return {
          props: {
            msg : welcomeMsg.message,
            tasks : tasks
          }
        }
  }