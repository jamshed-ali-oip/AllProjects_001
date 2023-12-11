import { useEffect, useMemo } from 'react'

// ** Third Party Imports
import toast from 'react-hot-toast'
import _ from 'lodash'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types import
import { RootState, AppDispatch } from 'src/store'
import { ErrCallbackType } from 'src/context/types'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

import { InvoiceService } from 'src/services'

// ** Actions Imports
// import {
//   fetchByIdAction,
//   fetchAction,
//   deleteAction,
//   QueryAction,
//   addAction,
//   updateAction
// } from 'src/store/apps/subscription'
import { ApiParams } from 'src/types/api'

import { subscriptiontSchema } from 'src/@core/schema'
import csvDownload from 'json-to-csv-export'

const defaultValues = {}

export const useSubscription = (serviceId: string | null) => {
  // ** Hook
  const dispatch = useDispatch<AppDispatch>()
  const { handleDrawer, handleModal } = useToggleDrawer()
  // const store = useSelector((state: RootState) => state.subscription)

  // ======================================
  // ======================================
  // ======================================
  // ** Report Add and Update
  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(subscriptiontSchema.add)
  })

  useMemo(() => {
    if (!_.isNull(serviceId)) {
      // dispatch(fetchByIdAction(serviceId))
    } else if (_.isNull(serviceId) || serviceId === null) {
      // form.setValue('title', '')
      form.reset()
    } else {
      toast.error('Some thing went Wrong')
    }
  }, [serviceId])

  // useEffect(() => {
  //   if (!_.isEmpty(store.subscription) && !_.isNull(serviceId)) {
  //     // @ts-ignore
  //     form.setValue('name', store.report?.name)
  //   }
  // }, [store.subscription, serviceId])

  const getSubscription = async (id: string) => {
    // dispatch(fetchByIdAction(id))
  }

  const getSubscriptions = async ({ query }: ApiParams) => {
    // dispatch(fetchAction({ query }))
  }

  const addSubscription = async (data: any) => {
    // dispatch(addAction({ ...data })).then(({ payload }: any) => {
    //   if (payload.statusCode === '10000') {
    //     form.reset()
    //     handleDrawer(null)
    //   }
    // })
  }

  const updateSubscription = async (id: string, data: any) => {
    // dispatch(updateAction({ id, data })).then(({ payload }: any) => {
    //   if (payload.statusCode === '10000') {
    //     form.reset()
    //     handleDrawer(null)
    //   }
    // })
  }

  const deleteSubscription = async (id: string) => {
    // dispatch(deleteAction(id)).then(({ payload }: any) => {
    //   if (payload.statusCode === '10000') {
    //     handleModal(null)
    //   }
    // })
  }

  const exportSubscription = async () => {
    // const dataToConvert = {
    //   data: store.subscriptions || [],
    //   filename: `subscription-qac-${Date.now()}`,
    //   delimiter: ',',
    //   headers: ['id', 'title']
    // }
    // csvDownload(dataToConvert)
  }

  const handleSubscriptionQuery = (query: string) => {
    // dispatch(QueryAction(query))
  }

  const createPaymentIntent = (
    data: { subscriptionId: string; shipping: { [x: string]: string } },
    errorCallback?: ErrCallbackType
  ) => {
    InvoiceService.createPaymentIntent(data)
      .then(async ({ data: response }) => {
        // setShipping(response?.data);
        // console.log('====================================');
        // console.log(response);
        // console.log('====================================');
      })
      .catch(error => {
        toast.error(error.response.data.message || 'Something went wrong!')
        if (error && errorCallback) errorCallback(error)
      })
  }

  return {
    // store,

    form,

    getSubscription,
    getSubscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,

    createPaymentIntent,

    exportSubscription,
    handleSubscriptionQuery
  }
}
