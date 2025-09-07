import { useState } from 'react';
import { initialData } from '../data/mockData';

export const useData = () => {
  const [data, setData] = useState(initialData);

  const addProduct = (newProduct) => {
    if (newProduct.name && newProduct.price) {
      const product = {
        id: Date.now(),
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        sold: 0,
        inTransit: 0,
        delivered: 0,
        profit: 0,
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0]
      };
      setData(prev => ({ ...prev, products: [...prev.products, product] }));
      return true;
    }
    return false;
  };

  const addOrder = (newOrder) => {
    if (newOrder.customer && newOrder.product && newOrder.value) {
      const order = {
        id: Date.now(),
        orderId: `ORD-${String(data.orders.length + 1).padStart(3, '0')}`,
        ...newOrder,
        value: Number(newOrder.value),
        date: new Date().toISOString().split('T')[0],
        customerEmail: `${newOrder.customer.toLowerCase().replace(' ', '.')}@email.com`
      };
      setData(prev => ({ ...prev, orders: [...prev.orders, order] }));
      return true;
    }
    return false;
  };

  const addCustomer = (newCustomer) => {
    if (newCustomer.name && newCustomer.email) {
      const customer = {
        id: Date.now(),
        ...newCustomer,
        orders: 0,
        totalValue: 0,
        lastPurchase: new Date().toISOString().split('T')[0],
        registrationDate: new Date().toISOString().split('T')[0]
      };
      setData(prev => ({ ...prev, customers: [...prev.customers, customer] }));
      return true;
    }
    return false;
  };

  const deleteItem = (type, id) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setData(prev => ({
      ...prev,
      orders: prev.orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    }));
  };

  const updateProduct = (updatedProduct) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    }));
    return true;
  };

  return {
    data,
    addProduct,
    addOrder,
    addCustomer,
    deleteItem,
    updateOrderStatus,
    updateProduct,
  };
};
