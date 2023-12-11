import {useEffect, useMemo} from 'react';

// ** Third Party Imports
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

// ** Store Imports
import {useDispatch, useSelector} from 'react-redux';

// ** import custom hooks
import useAsync from '../useAsync';
// import { RootState, AppDispatch } from 'src/store'

import categorySchema from '../../schema/category';

// ** Actions Imports
import {
  fetchAllAction,
  fetchOneAction,
  addAction,
  updateAction,
  deleteAction,
} from '../../../store/apps/test';

const defaultValues = {
  name: '',
};

export const useTest = serviceId => {
  // ** Hook
  const store = useSelector(state => state.test);
  const dispatch = useDispatch();

  console.log('====================================');
  console.log('useExample');
  console.log('====================================');

  const form = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(categorySchema.add),
  });

  useEffect(() => {
    serviceId && dispatch(fetchOneAction(serviceId));
  }, [serviceId]);

  useMemo(() => {
    if (store.entity && serviceId) {
      'name' in store.entity && form.setValue('name', store.entity.name);
    } else {
      form.reset();
    }
  }, [store.entity, serviceId]);

  const getBanner = async id => {
    dispatch(fetchOneAction(id));
  };

  const getAllBanners = async ({query}) => {
    dispatch(fetchAllAction({query: ''}));
  };

  const addBanner = async data => {
    dispatch(addAction({...data})).then(({payload}) => {
      if (payload?.statusCode === '10000') {
        form.reset();
        handleDrawer(null);
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    });
  };

  const updateBanner = async (id, data) => {
    dispatch(updateAction({id, data})).then(({payload}) => {
      if (payload.statusCode === '10000') {
        form.reset();
        handleDrawer(null);
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    });
  };
  const deleteBanner = async id => {
    dispatch(deleteAction(id)).then(({payload}) => {
      if (payload.statusCode === '10000') {
        handleModal(null);
      } else {
        // console.log('============API_ERROR===============')
        // console.log(payload)
        // console.log('====================================')
      }
    });
  };

  return {
    form,
    store,
    getBanner,
    getAllBanners,
    addBanner,
    updateBanner,
    deleteBanner,
  };
};
