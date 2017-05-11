import axios from 'axios';

const AddressAPI = {
  getAddresses: () => axios.get('/api/addresses'),
  setAddresses: (data) => axios.post('/api/addresses', data)
};

export default AddressAPI;
