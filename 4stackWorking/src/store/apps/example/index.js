// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Employee Service Imports
import CategoryService from '../../../services/category.service'

export const QueryAction = createAsyncThunk(
  'example/query',
  async (query, { getState, dispatch }) => {
    dispatch(Slice.actions.handleQuery(query))
    dispatch(fetchAllAction({}))
    return query
  }
)

export const fetchOneAction = createAsyncThunk('example/fetchOne', async (id) => {
  const response = await CategoryService.getById(id)
  return response.data
})

export const fetchAllAction = createAsyncThunk(
  'example/fetchAll',
  async (params, { getState, dispatch }) => {
    const query = getState().example.params.query
    const response = await CategoryService.getAll({ query: "" })
    return response.data
  }
)

export const addAction = createAsyncThunk(
  'example/add',
  async (data, { getState, dispatch }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await CategoryService.add(data)
      const query = getState().example.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('Added succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      toast.error(error.response.data.message || 'Something went wrong!')
      dispatch(Slice.actions.handleStatus('error'))
      return error.response.data
    }
  }
)

export const updateAction = createAsyncThunk(
  'example/update',
  async ({ id, data }, { getState, dispatch }) => {
    dispatch(Slice.actions.handleStatus('pending'))
    try {
      const response = await CategoryService.update(id, data)
      const query = getState().example.params.query
      dispatch(fetchAllAction({ query }))
      toast.success('updated succesfully!')
      dispatch(Slice.actions.handleStatus('success'))
      return response.data
    } catch (error) {
      toast.error(error.response.data.message || 'Something went wrong!')
      dispatch(Slice.actions.handleStatus('error'))
      return error.response.data
    }
  }
)

export const deleteAction = createAsyncThunk('example/delete', async (id, { getState, dispatch }) => {
  dispatch(Slice.actions.handleStatus('pending'))
  try {
    const response = await CategoryService.delete(id)
    const query = getState().example.params.query
    dispatch(fetchAllAction({ query }))
    toast.success('deleted succesfully!')
    dispatch(Slice.actions.handleStatus('success'))
    return response.data
  } catch (error) {
    toast.error(error.response.data.message || 'Something went wrong!')
    dispatch(Slice.actions.handleStatus('error'))
    return error.response.data
  }
})

// @ts-ignore
export const Slice = createSlice({
  name: 'example',
  initialState: {
    entities: [],
    entity: {},
    total: 0,
    params: {}
  },
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload
    },
    handleQuery: (state, action) => {
      state.params.query = { ...state.params.query, ...action.payload }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAllAction.fulfilled, (state, action) => {
      const data = action.payload
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      state.entities = data || []
      state.total = data.length || 0
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const data = action.payload
      state.entity = data || {}
    })
  }
})

export default Slice.reducer
