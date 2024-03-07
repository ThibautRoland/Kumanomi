
import { tasksRequest } from '@/interfaces/tasks';
import { getProtectedEndpoint, getTasksApi } from '@/api/sessions/sessions';
import { getBearerToken, getItemFromContext } from '@/api/cookies/cookies'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { task } from '@/interfaces/tasks';
import { Layout } from '@/components/layout';

type IndexProps = {
  tasks: task[],
  user_id: number
}

export default function Dashboard({tasks, user_id}: IndexProps) {
  const router = useRouter();
  const [tokenState, setTokenState] = useState("")

    return (<Layout>
          <h1 className="text-center font-bold text-3xl py-5">Dashboard</h1>
          <h2>Welcome user_id: {user_id}</h2>
          
            {tasks.map((task, i) => (
              <div key={i}>
                <p>{task.id}</p>
                <p>{task.name}</p>
              </div>
            ))}
          
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