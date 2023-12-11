// ** Third Party Imports
import * as yup from 'yup'

export default {
  add: yup.object().shape({
    name: yup.string().required()
    // type: yup.string().required(),
    // uploadOpenAt: yup.string().required(),
    // uploadCloseAt: yup.string().required(),
    // uploadTime: yup.string().required(),
    // votingCloseAt: yup.string().required(),
    // votingOpenAt: yup.string().required(),
    // votingTime: yup.string().required()
  })
}
