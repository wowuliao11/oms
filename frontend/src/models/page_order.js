export default {
  namespace: 'order-manage',
  state: {
    record: [],
  },
  reducers: {
    set_record(state, { payload: record }) {
      return { ...state, record };
    },
  },
};
