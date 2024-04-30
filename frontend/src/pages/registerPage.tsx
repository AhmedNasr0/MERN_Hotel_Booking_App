import {useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client'
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

export type registerFormData={
    firstName:string ,
    lastName:string ,
    email:string,
    password:string,
    confirmPassword:string
}

const RegisterPage=()=>{
    const {register,handleSubmit , watch , formState:{errors}} = useForm<registerFormData>();
    const navigate=useNavigate();
    const appContext=useAppContext();
    const queryClient=useQueryClient();
    const mutation=useMutation(apiClient.register,{
        onSuccess:async ()=>{
            appContext.showToast({message:"User Succssesfully Sign Up",type:"success"})
            await queryClient.invalidateQueries("validateToken")
            navigate("/");
        },
        onError:(error:Error)=>{
            appContext.showToast({message:error.message,type:"error"})
        }
    });

    const onSubmit=handleSubmit((data)=>{
            mutation.mutate(data);
    })
    const checkPassword=(val:string)=>{
        if(!val){
            return "this field is Required"
        }
        else if(watch("password")!== val) return "Password doesnt Match !"
    }
    return(
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <div className='flex flex-col md:flex-row gap-10'>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name :
                    <input type="text" className='border rounded w-full py-1 px-2 font-normal '
                     {...register('firstName',{required:"This field is Required"})} />
                     {errors.firstName && (
                            <div className='text-red-500'>{errors.firstName.message}</div>
                        )
                    }
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name :
                    <input type="text" className='border rounded w-full py-1 px-2 font-normal' 
                     {...register('lastName',{required:"This field is Required"})}/>
                     {errors.lastName && (
                            <div className='text-red-500'>{errors.lastName.message}</div>
                        )
                    }
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                    Email :
                    <input type="email" className='border rounded w-full py-1 px-2 font-normal' 
                     {...register('email',{required:"This field is Required"})}/>
                     {errors.email && (
                            <span className='text-red-500'>{errors.email.message}</span>
                        )
                    }
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                    Password :
                    <input type="password" className='border rounded w-full py-1 px-2 font-normal' 
                     {...register('password',{required:"This field is Required" ,minLength:{value:6,message:"Minimum Characters must be at Least 6"}})}/>
                    {errors.password && (
                            <span className='text-red-500'>{errors.password.message}</span>
                        )
                    }   
            </label> 
            <label className="text-gray-700 text-sm font-bold flex-1">
                    Confirm Password :
                    <input type="password" className='border rounded w-full py-1 px-2 font-normal' 
                     {...register('confirmPassword',{required:"This field is Required" ,
                        validate:(val)=>{
                            return checkPassword(val);
                        }})}/>
                    {errors.confirmPassword&& (
                            <span className='text-red-500'>{errors.confirmPassword.message}</span>
                        )
                    }
            </label> 
            <div className='flex justify-between'>
                <span>Already Have Account ? <Link to="/login" className='border-b border-b-black pb-[2px]'>Login Now</Link></span>
                <button type="submit" className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'>
                    Create Account
                </button>
            </div>
        </form>
    )
}
export default RegisterPage 