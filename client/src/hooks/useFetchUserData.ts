import { getSingleUser } from "../utils/apiservice"

const userFetchUserData=async(id:string)=>{
    const data= await getSingleUser(id)
    return data.userData.name;
}
export default userFetchUserData;