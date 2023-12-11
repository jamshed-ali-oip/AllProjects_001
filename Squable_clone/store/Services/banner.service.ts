// API call services
import client from '../../hooks/useAxios';

export default class BannerService {

    constructor() {
        this.getBaners = this.getBaners.bind(this);
    }

    getBaners() {
        return client.get('/is_admin_live');
    }

}
