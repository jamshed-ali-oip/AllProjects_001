import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Banner {
    content: string,
    link: string,
    banner_image_path: string,
}

export interface BannersState {
    entities: Array<Banner>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: BannersState = {
    entities: [],
    status: 'idle',
};

interface GetBanersAction {
    type: 'getBaners';
    payload: {
        baners: Array<Banner>;
    };
}

export const banersSlice = createSlice({
    name: 'banners',
    initialState,
    reducers: {
        startCall: (state: BannersState) => {
            state.status = 'loading';
        },
        success: (state: BannersState, action: PayloadAction<Banner[]>) => {
            state.entities = action.payload;
        },
        failed: (state: BannersState) => {
            state.status = 'failed';
        },
        getBaners: (state: BannersState, action: PayloadAction<GetBanersAction['payload']>) => {

            // console.log("=====================================================")
            // console.log(JSON.stringify(action.payload.baners, null, 2))
            state.entities = action.payload.baners;
            state.status = 'idle';
            // console.log("=====================================================")
            
        },
    },
});

export const { startCall, success, failed, getBaners } = banersSlice.actions;

export default banersSlice.reducer;
