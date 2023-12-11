import request from '@src/@core/config';

export const Services = {
  login: body => {
    return request.post(`/signin`, body);
  },
};
