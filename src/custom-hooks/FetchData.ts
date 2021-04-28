import React, { useState, useEffect } from 'react';
import { server_calls } from '../api';

export const useGetData = () => {
    const [droneData, setData] = useState<any>([]);

    const handleDataFetch = async() => {
        const result = await server_calls.get()
        setData(result)
    }

    // Introducing the useEffect Hook to add our data call to React State
    useEffect( () => {
        handleDataFetch();
    }, [])

    return {droneData, getData:handleDataFetch}
}