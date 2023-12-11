
import { AxiosError, AxiosResponse } from 'axios'

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk, Slice } from '@reduxjs/toolkit'

// ** Utils
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { AuthServices } from 'src/services'

// ** Types Imports
import { IUser } from 'src/types/apps/user'

interface InitialState {
    user: IUser;
    accessToken: string,
    refreshToken: string,
}

interface Redux {
    getState: any
    dispatch: Dispatch<any>
}

// // ** Fetch Client
// export const fetchClientAction = createAsyncThunk(
//     'client/fetchClient',
//     async (id: string) => {
//         return { id }
//     }
// )

// // ** Fetch Clients
// export const loginAction = createAsyncThunk(
//     'client/fetchClients',
//     async () => {
//         const response = await ClientServices.getAll();
//         return response.data
//     }
// )

// ** Add Client
export const loginAction = createAsyncThunk(
    'auth/login',
    async (body: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
        try {
            const { data } = await AuthServices.login(body);
            // dispatch(fetchClientsAction(getState().user.params))
            toast.success("Login succesfully!")
            return data;
        } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong!")
            return error.response.data;
        }
    }
)

// ** Add Client
// export const updateClientAction = createAsyncThunk(
//     'client/updateClient',
//     async ({ id, data }: { id: string, data: IClient }, { getState, dispatch }: Redux) => {
//         try {
//             const response = await ClientServices.update(id, data);
//             dispatch(fetchClientsAction(getState().user.params))
//             toast.success("Client updated succesfully!")
//             return response.data;
//         } catch (error: any) {
//             toast.error(error.response.data.message || "Something went wrong!")
//             return error.response.data;
//         }
//     }
// )

// ** Delete Client
// export const deleteClientAction = createAsyncThunk(
//     'client/deleteEmployee',
//     async (id: string, { getState, dispatch }: Redux) => {
//         try {
//             const response = await ClientServices.delete(id);
//             dispatch(fetchClientsAction(getState().user.params))
//             toast.success("Client deleted succesfully!")
//             return response.data
//         } catch (error: any) {
//             toast.error(error.response.data.message || "Something went wrong!")
//             return error.response.data;
//         }
//     }
// )

// @ts-ignore
export const appAuthSlice: Slice<InitialState, {}, "auth"> = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        accessToken: "",
        refreshToken: "",
    },
    reducers: {},
    // extraReducers: builder => {
    //     builder.addCase(fetchClientsAction.fulfilled, (state, action) => {
    //         const { data } = action.payload;

    //         state.clients = data.clients || []
    //         state.total = data.clients.length || 0
    //         // state.params = action.payload.params
    //         // state.allData = action.payload.allData
    //     }),
    //         builder.addCase(fetchClientAction.fulfilled, (state, action) => {
    //             const { id } = action.payload;
    //             state.client = state.clients.find((client: any) => client.id === id) || {};
    //         })
    // }
})

export default appAuthSlice.reducer
