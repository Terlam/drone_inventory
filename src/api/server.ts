 let token = '1df56e4ad676565efdace718720fe75eb54d2bfc3abbb106'

export const server_calls = {
    get: async () => {
        const response = await fetch(`https://fathomless-chamber-46839.herokuapp.com/api/drones`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })

        if (!response.ok){
            console.log('Failed to fetch data from the server')
        }

        return await response.json()
    },
    create: async (data: any = {}) => {
        const response = await fetch(`https://fathomless-chamber-46839.herokuapp.com/api/drones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            console.log('Failed to create new Drone Data')
        }

        return await response.json()
    },

    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://fathomless-chamber-46839.herokuapp.com/api/drones/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if(!response.ok){
            console.log('Failed to Update Drone Data')
        }

        return await response.json()

    },
    delete: async (id:string) => {
        const response = await fetch (`https://fathomless-chamber-46839.herokuapp.com/api/drones/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `bearer ${token}`
            }
        })
    }
}