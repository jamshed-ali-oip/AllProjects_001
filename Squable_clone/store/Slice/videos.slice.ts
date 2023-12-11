import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Video {
    video_id: "861",
    video_path: "https://d12z3avrqemmfm.cloudfront.net/video_1613001173testvideo.m3u8",
    user_id: "139",
    video_thumbnail: "https://d12z3avrqemmfm.cloudfront.net/video_1613001173thumb.0000001.jpg",
    video_thumbnail_new: "https://d12z3avrqemmfm.cloudfront.net/video_1613001173thumb.0000001.jpg",
    video_text: "cGludGVyZXN0IGluc3BpcmVkIHBvc2Vz",
    video_text_without_encoded: "pinterest inspired poses",
    is_posted: "0",
    is_save_to_gallery: "1",
    created_at: "1613001178",
    updated_at: "1613181687",
    status: "A",
    job_id: "1613001178530-e7uaja",
    tagged_user: [],
    aws_video_path: "https://d12z3avrqemmfm.cloudfront.net/video_1613001173testvideo.m3u8",
    user_image: "https://devsytes.com/assets/uploads/images/01c9c463971a917bd7587a288d5b5546.jpg",
    user_name: "Grace Vetter",
    username: "gracevetter",
    is_voted: 0,
    is_following: 1,
    request_status: "1",
    primary_key_follow_id: "356",
    is_reported: 0,
    setting: "2",
    views_count: "19",
    votes_count: "3",
    video_share_count: "0"
}

export interface BannersState {
    general: {
        entities: Video[];
        status: 'idle' | 'loading' | 'failed';
    },
    trending: {
        entities: Video[];
        status: 'idle' | 'loading' | 'failed';
    },
    following: {
        entities: Video[];
        status: 'idle' | 'loading' | 'failed';
    },
}

const initialState: BannersState = {
    general: {
        entities: [],
        status: 'idle',
    },
    trending: {
        entities: [],
        status: 'idle',
    },
    following: {
        entities: [],
        status: 'idle',
    },
};

interface GetVideosAction {
    type: 'getBaners';
    payload: {
        video_filter: 'general' | 'trending' | 'following'
        videos: Video[];
    };
}

export const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        startCall: (state: BannersState, action: PayloadAction<'general' | 'trending' | 'following'>) => {
            state[action.payload].status = 'loading';
        },
        failed: (state: BannersState, action: PayloadAction<'general' | 'trending' | 'following'>) => {
            state[action.payload].status = 'failed';
        },
        getVideos: (state: BannersState, action: PayloadAction<GetVideosAction['payload']>) => {
            // console.log("=====================================================")
            // console.log(JSON.stringify(action.payload, null, 2))
            state[action.payload.video_filter].entities = action.payload.videos;
            state[action.payload.video_filter].status = 'idle';
            // console.log("=====================================================")
        },
    },
});

export const { startCall, failed, getVideos } = videosSlice.actions;

export default videosSlice.reducer;
