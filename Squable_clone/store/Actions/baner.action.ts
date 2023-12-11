import { AppDispatch } from './../store';
import { getBaners, startCall, failed } from "../Slice/baners.slice"
// const { usersSuccess } = slice.actions

import { BanerService } from '../Services';
const service = new BanerService()

export const getBanersAction = () => async (dispatch: AppDispatch) => {
    dispatch(startCall())
    try {

        const { data } = await service.getBaners();
        // console.log(JSON.stringify(data.data.banner_image, null, 2));

        dispatch(getBaners({ baners: data.data.banner_image }))

    }
    catch (e) {
        dispatch(failed())
    }
}
