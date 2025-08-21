import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from '../lib/api';

const useAuthUser = () => {
   const authUser = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser,
    retry: false, // do not retry on error
    });


return {
  isLoading: authUser.isLoading, authUser:authUser.data?.user};
  };
export default useAuthUser;
