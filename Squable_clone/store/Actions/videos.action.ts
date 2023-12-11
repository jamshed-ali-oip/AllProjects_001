import { AppDispatch } from './../store';
import { startCall, failed, getVideos } from "../Slice/videos.slice"
// const { usersSuccess } = slice.actions

import { VideoService } from '../Services';
const service = new VideoService()

export const getGeneralVideosAction = () => async (dispatch: AppDispatch) => {
    dispatch(startCall("general"))
    try {

        const { data } = await service.getGeneralVideos({ offset: 1, limit: 10 });
        // console.log(JSON.stringify(data, null, 2));

        if (data.status) {
            dispatch(getVideos({
                video_filter: "general",
                videos: data.data
            }))
        } else {
            dispatch(failed("general"))
        }

    }
    catch (e) {
        dispatch(failed("general"))
    }
}

export const getTrendingVideosAction = () => async (dispatch: AppDispatch) => {
    dispatch(startCall("trending"))
    try {

        const { data } = await service.getTrendingVideos({ offset: 1, limit: 10 });
        // console.log(JSON.stringify(data, null, 2));

        if (data.status) {
            dispatch(getVideos({
                video_filter: "trending",
                videos: data.data
            }))
        } else {
            dispatch(failed("trending"))
        }

    }
    catch (e) {
        dispatch(failed("trending"))
    }
}

export const getFollowingVideosAction = () => async (dispatch: AppDispatch) => {
    dispatch(startCall("following"))
    try {

        const { data } = await service.getFollowingVideos({ offset: 1, limit: 10 });
        // console.log(JSON.stringify(data, null, 2));

        if (data.status) {
            dispatch(getVideos({
                video_filter: "following",
                videos: data.data
            }))
        } else {
            dispatch(failed("following"))
        }

    }
    catch (e) {
        dispatch(failed("following"))
    }
}
