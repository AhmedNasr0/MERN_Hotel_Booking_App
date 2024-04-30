import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import * as apiClient from "../api-client"
import { useAppContext } from "../context/appContext"

export type loginFormData={
    email:string,
    password:string 
}

const LoginPage=()=>{

    const {register,formState:{errors},watch,handleSubmit}=useForm<loginFormData>();
    const navigate = useNavigate();
    const appContext=useAppContext();
    const queryClient=useQueryClient();
    const mutation=useMutation(apiClient.login,{
        onSuccess:async ()=>{
            appContext.showToast({message:`welcome ${watch('email')} `,type:'success'})
            await queryClient.invalidateQueries("validateToken");
            navigate('/')
        },
        onError:(error:Error)=>{
            appContext.showToast({message:error.message,type:"error"})
        }
    })
    const onSubmit:SubmitHandler<loginFormData>=(data)=>{
        mutation.mutate(data)
    }
    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl font-bold">LogIn With Your Account</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                    Email :
                    <input type="email" className='border rounded w-full py-1 px-2 font-normal' 
                     {...register("email",{required:"This Field Is Required"})}
                     />
                     {
                        errors.email&&(
                            <span className="text-red-500">{errors.email.message}</span>
                        )
                     }
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                    Password :
                    <input type="password" className='border rounded w-full py-1 px-2 font-normal' 
                    {...register("password",{required:"This Field Is Required",minLength:{value:6,message:"Min Length is 6 Characters"}})} />
                    {
                        errors.password&&(
                            <span className="text-red-500">{errors.password.message}</span>
                        )
                    }
            </label> 
            <div className='flex justify-between'>
                <span>Dont Have Account ? <Link to="/register" className='border-b border-b-black pb-[2px]'>Create Account</Link></span>
                <button type="submit" className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'>
                    LogIn
                </button>
            </div>
        </form>
    )
}
export default LoginPage 