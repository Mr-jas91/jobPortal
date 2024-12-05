import { setAllJobs } from '@/redux/jobSlice'
import { axiosInstance } from '@/utils/interCepter'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axiosInstance.get(`job/get?keyword=${searchedQuery}`);
                if(res?.data?.success){
                    dispatch(setAllJobs(res?.data?.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
}

export default useGetAllJobs