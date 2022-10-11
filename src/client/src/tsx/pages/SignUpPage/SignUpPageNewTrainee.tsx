import React from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/baseComponents/LoadingSpinner'
import { traineesApi } from '../../redux/api/hooksAPI'
import SignUpPage from './SignUpPage'



function SignUpPageNewTrainee() {

  const id=useParams().id
  const {isError,isFetching,isLoading,data}=traineesApi.useGetRegisterTraineeQuery((id || ""))
  console.log(data);
  return (
    <LoadingSpinner nameData='Trainee' stateData={{isError,isFetching,isLoading,data}}>
   
   { (data)=>{

return  <SignUpPage defaultValues={{"email":data.email,id:Number(data.trainee_id)}}/>
}} 
   </LoadingSpinner>

  )
}

export default SignUpPageNewTrainee