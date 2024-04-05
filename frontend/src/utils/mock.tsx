//Mock.tsx's purpose is to speed up the dev by providing data that should be improved in the futur
// all it's methods are supposed to go away

//TODO we need to retrieve more than just the id from the back
export function mockImageNameFromId(id: number) : string {

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

  export function mockImageNameFromFirstName(firstName: string) : string {
    return firstName.toLowerCase()+".jpg"
  }