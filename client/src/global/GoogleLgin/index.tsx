import React from 'react';
import {useGoogleLogin} from "@react-oauth/google"
import { googleAuth } from '../../utils/googleApi';

const GoogleLogin = () => {
    const responseGoogle=async(authResult)=>{
        
        try{
            if(authResult['code']){
                console.log(authResult)
                const result =await googleAuth(authResult['code']);
                 console.log(result)
            }
          console.log("authresult",authResult)
        }
        catch(err){
         console.error('Error while requesting',err)
        }
    }
 const googleLogin=useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow:'auth-code'
 })
  return (
    <div>
    <button onClick={googleLogin}>Login with Google</button>
    </div>
  )
}

export default GoogleLogin