import axios from "axios";

class EventService {
    url = 'http://localhost:37459/v1/event';
    getCurrentEvent()
    {
        return this.axios(url + '/getcurrentevent').then(s=>s.data);
    }
}

export default new EventService();