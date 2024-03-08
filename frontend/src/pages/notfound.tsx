
import { tasksRequest } from '@/interfaces/tasks';
import { getProtectedEndpoint, getTasksApi } from '@/api/sessions/sessions';
import { getBearerToken, getItemFromContext } from '@/api/cookies/cookies'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { task } from '@/interfaces/tasks';
import { Layout } from '@/components/layout';

export default function NotFound() {
  const router = useRouter();
  const [tokenState, setTokenState] = useState("")

    return (<Layout>
          <h1 className="text-center font-bold text-3xl py-5">404</h1>
          <p>Sorry but we couldn't find your page !</p>
          
        </Layout>
    );
  }

  export const config = {
    runtime: 'nodejs',
  }

  export async function getServerSideProps(context : any) {
    // console.log("context.req.headers.cookie ---> ", context.req.headers.cookie)
    const tokenValue = getItemFromContext(context, 'token')
    const userIdValue = getItemFromContext(context, 'user_id')
    console.log("from cookie context --> ", userIdValue)
    const tasks = await getTasksApi(tokenValue)

        return {
          props: {
            tasks : tasks, 
            user_id: userIdValue
          }
        }
  }