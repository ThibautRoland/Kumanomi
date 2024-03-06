
import { tasksRequest } from '@/interfaces/tasks';
import { getProtectedEndpoint, getTasksApi } from '@/api/sessions/sessions';
import { getBearerToken, getTokenFromContext } from '@/api/cookies/cookies'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { task } from '@/interfaces/tasks';
import { Layout } from '@/components/layout';

type IndexProps = {
  tasks: task[]
}

export default function Dashboard({tasks}: IndexProps) {
  const router = useRouter();
  const [tokenState, setTokenState] = useState("")

    return (<Layout>
          <h1 className="text-center font-bold text-3xl py-5">Dashboard</h1>
          
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
    const tokenValue = getTokenFromContext(context)
    const tasks = await getTasksApi(tokenValue)

        return {
          props: {
            tasks : tasks
          }
        }
  }