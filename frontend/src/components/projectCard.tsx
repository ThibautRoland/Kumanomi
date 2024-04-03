import { projectType } from "@/interfaces/projects"
import { Card } from "./theme/card"

type projectProps = {
    project: projectType
}

export const ProjectCard = ({project}: projectProps) => {


    //TODO we have an error here, "d instance of Date" return false
    // QUICKFIX a created a new date to have a real variable of type "date"
    function formatDate(d: Date): string {
        d  = new Date(d);
        return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
      }

      //TODO we need to retrieve more than just the id from the back
      function mockImageNameFromId(id: number) : string {

        switch (id) {
        case 1:
            return "frodo.jpg"
        case 4:
            return "gandalf.jpg"
        case 5:
            return "radagast.jpg"
            case 7:
                return "smaug.jpg"
        default:
            return "404.jpg"
        }
      }

    return <Card>

    <div className="flex flex-col italic space-y-8">
        <div className="flex flex-row justify-around items-center">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <div className="text-kum-light-grey">☠ quest end  {formatDate(project.deadline)}</div>

        </div>

      <div className="flex flex-row items-center space-x-4">
      <img className="max-h-8 max-w-8" src="/icon_scroll.png"/>
      <div className="font-bold">quest</div>
      <div>{project.description}</div>
      </div>


      <div className="flex flex-row space-x-4 items-center">

      <img className="max-h-8 max-w-8 rounded-full border-2 border-black" src={`http://localhost:9000/profils_pics/${mockImageNameFromId(project.user_admin_id)}`} />
      <div className="font-bold">admin</div>
      <div>{project.user_admin_id}</div>
      </div>

</div>
</Card>
}