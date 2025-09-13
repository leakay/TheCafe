import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000'
});

// PRODUCTS
export const getProducts = () => API.get('/products');
export const addProduct = (product) => API.post('/products', product);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// CUSTOMERS
export const getCustomers = () => API.get('/customers');
export const addCustomer = (customer) => API.post('/customers', customer);
export const updateCustomer = (id, data) => API.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);

// SALES
export const getSales = () => API.get('/sales');
export const addSale = (sale) => API.post('/sales', sale);
export const deleteSale = (id) => API.delete(`/sales/${id}`);

// STOCK
export const getStock = () => API.get('/stock');
export const updateStock = (id, data) => API.put(`/stock/${id}`, data);
export const addStock = (item) => API.post('/stock', item);
export const deleteStock = (id) => API.delete(`/stock/${id}`);
