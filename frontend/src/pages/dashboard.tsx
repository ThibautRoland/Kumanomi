import { getTasksApi } from '@/api/sessions/sessions'
import { tasksRequest } from '@/interfaces/sessions';
import { getBearerToken } from '@/api/cookies/cookies'

export default function Dashboard() {

  function printCookie(){
    const HAAAA_COOKIE = getBearerToken()
    console.log("from getBerarToken "+HAAAA_COOKIE)
  }

    return (<div>
        <h1 className="text-center font-bold text-3xl py-5">Dashboard</h1>
        <button className='border p-3 rounded-lg' onClick={printCookie}>get token</button>
        </div>
    );
  }


  export async function getServerSideProps() {
    // todo : get token from cookies

    
    const taskRequest = {
      id: 1,
      token: "token_from_cookies"
    } as tasksRequest
    const res = await getTasksApi(taskRequest)

    return {
      props: {

      }
    }
  }