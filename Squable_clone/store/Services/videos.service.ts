// API call services
import client from '../../hooks/useAxios';

const videoFIlters = [
    {
        id: 5,
        label: "Trending",
    },
    {
        id: 6,
        label: "General",
    },
    {
        id: 7,
        label: "Following",
    },
];

export default class VideosService {

    constructor() {
        this.getGeneralVideos = this.getGeneralVideos.bind(this);
    }

    getGeneralVideos({ offset, limit }: { offset: number, limit: number }) {
        return client.post('/trending_general_following', {
            limit,
            offset,
            video_filter: 6,
            device_id: 1,
            device_type: 3,
        });
    }

    getTrendingVideos({ offset, limit }: { offset: number, limit: number }) {
        return client.post('/trending_general_following', {
            limit,
            offset,
            video_filter: 5,
            device_id: 1,
            device_type: 3,
        });
    }

    getFollowingVideos({ offset, limit }: { offset: number, limit: number }) {
        return client.post('/trending_general_following', {
            limit,
            offset,
            video_filter: 7,
            device_id: 1,
            device_type: 3,
        });
    }

}

// const getVideos = useCallback(async () => {
//     setIsLoader(true);
//     const { data } = await client.post("https://devsytes.com/mobileapi/trending_general_following", {
//       video_filter: video_filter.id,
//       offset,
//       device_id: 1,
//       device_type: 3,
//       limit: 3,
//     });

//     if (data.status) {

//       if (previousFilter?.id !== video_filter.id) {
//         setVideos([...videosState, ...data.data]);
//       }
//       else {
//         setVideos([...videos, ...data.data]);
//       }
//       setIsLoader(false);

//     } else {
//       toast.error(data.message || "Something went wrong");
//     }
//   }, [videos, offset, video_filter, previousFilter, videosState]);
