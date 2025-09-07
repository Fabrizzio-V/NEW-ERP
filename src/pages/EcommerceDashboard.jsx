import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Package, ShoppingCart, TrendingUp, Users, Eye, Clock, AlertTriangle, Plus, Upload, Download, Edit, Trash2, Save, X, Filter, Search, Calendar, RefreshCw } from 'lucide-react';
import { useData } from '../hooks/useData';
import { useMetrics } from '../hooks/useMetrics';

const EcommerceDashboard = () => {
  const {
    data,
    addProduct: addProductHook,
    addOrder: addOrderHook,
    addCustomer: addCustomerHook,
    deleteItem,
    updateOrderStatus,
    updateProduct
  } = useData();
  const metrics = useMetrics(data);

  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Estados para búsqueda y filtros
  const [searchTerms, setSearchTerms] = useState({
    products: '',
    orders: '',
    customers: ''
  });

  const [filters, setFilters] = useState({
    products: {
      category: '',
      status: '',
      priceRange: { min: '', max: '' },
      stockRange: { min: '', max: '' }
    },
    orders: {
      status: '',
      dateRange: { start: '', end: '' },
      valueRange: { min: '', max: '' }
    },
    customers: {
      type: '',
      ordersRange: { min: '', max: '' },
      valueRange: { min: '', max: '' }
    }
  });

  const [showFilters, setShowFilters] = useState({
    products: false,
    orders: false,
    customers: false
  });

  // Formularios para nuevos elementos
  const [newProduct, setNewProduct] = useState({
    name: '', category: '', price: '', stock: '', provider: ''
  });

  const [newOrder, setNewOrder] = useState({
    customer: '', product: '', value: '', status: 'Por Confirmar'
  });

  const [newCustomer, setNewCustomer] = useState({
    name: '', email: '', type: 'Nuevo'
  });

  // Función para filtrar datos
  const getFilteredData = (dataType) => {
    let filteredData = data[dataType];
    const searchTerm = searchTerms[dataType].toLowerCase();
    const currentFilters = filters[dataType];

    // Aplicar búsqueda por texto
    if (searchTerm) {
      filteredData = filteredData.filter(item => {
        return Object.values(item).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm)
        );
      });
    }

    // Aplicar filtros específicos según el tipo de datos
    if (dataType === 'products') {
      if (currentFilters.category) {
        filteredData = filteredData.filter(item => item.category === currentFilters.category);
      }
      if (currentFilters.status) {
        filteredData = filteredData.filter(item => item.status === currentFilters.status);
      }
      if (currentFilters.priceRange.min !== '') {
        filteredData = filteredData.filter(item => item.price >= Number(currentFilters.priceRange.min));
      }
      if (currentFilters.priceRange.max !== '') {
        filteredData = filteredData.filter(item => item.price <= Number(currentFilters.priceRange.max));
      }
      if (currentFilters.stockRange.min !== '') {
        filteredData = filteredData.filter(item => item.stock >= Number(currentFilters.stockRange.min));
      }
      if (currentFilters.stockRange.max !== '') {
        filteredData = filteredData.filter(item => item.stock <= Number(currentFilters.stockRange.max));
      }
    }

    if (dataType === 'orders') {
      if (currentFilters.status) {
        filteredData = filteredData.filter(item => item.status === currentFilters.status);
      }
      if (currentFilters.dateRange.start) {
        filteredData = filteredData.filter(item => item.date >= currentFilters.dateRange.start);
      }
      if (currentFilters.dateRange.end) {
        filteredData = filteredData.filter(item => item.date <= currentFilters.dateRange.end);
      }
      if (currentFilters.valueRange.min !== '') {
        filteredData = filteredData.filter(item => item.value >= Number(currentFilters.valueRange.min));
      }
      if (currentFilters.valueRange.max !== '') {
        filteredData = filteredData.filter(item => item.value <= Number(currentFilters.valueRange.max));
      }
    }

    if (dataType === 'customers') {
      if (currentFilters.type) {
        filteredData = filteredData.filter(item => item.type === currentFilters.type);
      }
      if (currentFilters.ordersRange.min !== '') {
        filteredData = filteredData.filter(item => item.orders >= Number(currentFilters.ordersRange.min));
      }
      if (currentFilters.ordersRange.max !== '') {
        filteredData = filteredData.filter(item => item.orders <= Number(currentFilters.ordersRange.max));
      }
      if (currentFilters.valueRange.min !== '') {
        filteredData = filteredData.filter(item => item.totalValue >= Number(currentFilters.valueRange.min));
      }
      if (currentFilters.valueRange.max !== '') {
        filteredData = filteredData.filter(item => item.totalValue <= Number(currentFilters.valueRange.max));
      }
    }

    return filteredData;
  };

  // Usar useMemo para optimizar el filtrado
  const filteredProducts = useMemo(() => getFilteredData('products'), [data.products, searchTerms.products, filters.products]);
  const filteredOrders = useMemo(() => getFilteredData('orders'), [data.orders, searchTerms.orders, filters.orders]);
  const filteredCustomers = useMemo(() => getFilteredData('customers'), [data.customers, searchTerms.customers, filters.customers]);

  // Función para limpiar filtros
  const clearFilters = (dataType) => {
    setSearchTerms(prev => ({ ...prev, [dataType]: '' }));
    setFilters(prev => ({
      ...prev,
      [dataType]: dataType === 'products' ? {
        category: '', status: '', priceRange: { min: '', max: '' }, stockRange: { min: '', max: '' }
      } : dataType === 'orders' ? {
        status: '', dateRange: { start: '', end: '' }, valueRange: { min: '', max: '' }
      } : {
        type: '', ordersRange: { min: '', max: '' }, valueRange: { min: '', max: '' }
      }
    }));
  };

  // Función para contar filtros activos
  const getActiveFiltersCount = (dataType) => {
    let count = 0;
    const currentFilters = filters[dataType];

    if (searchTerms[dataType]) count++;

    Object.entries(currentFilters).forEach(([key, value]) => {
      if (typeof value === 'object') {
        if (value.min !== '' || value.max !== '' || value.start !== '' || value.end !== '') count++;
      } else if (value !== '') {
        count++;
      }
    });

    return count;
  };

  // Funciones CRUD
  const addProduct = () => {
    if (addProductHook(newProduct)) {
      setNewProduct({ name: '', category: '', price: '', stock: '', provider: '' });
      setShowModal(false);
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setModalType(`edit${type}`);
    setShowModal(true);
  };

  const handleSave = (item) => {
    if (modalType === 'editProduct') {
      updateProduct(item);
    }
    // Add other types here later if needed
    setShowModal(false);
    setEditingItem(null);
  };

  const addOrder = () => {
    if (addOrderHook(newOrder)) {
      setNewOrder({ customer: '', product: '', value: '', status: 'Por Confirmar' });
      setShowModal(false);
    }
  };

  const addCustomer = () => {
    if (addCustomerHook(newCustomer)) {
      setNewCustomer({ name: '', email: '', type: 'Nuevo' });
      setShowModal(false);
    }
  };

  // Función para cargar datos desde CSV
  const handleFileUpload = (event, dataType) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());

        const newData = lines.slice(1).filter(line => line.trim()).map((line, index) => {
          const values = line.split(',');
          const item = { id: Date.now() + index };
          headers.forEach((header, i) => {
            item[header] = values[i]?.trim() || '';
          });
          return item;
        });

        setData(prev => ({ ...prev, [dataType]: [...prev[dataType], ...newData] }));
      };
      reader.readAsText(file);
    }
  };

  // Función para exportar datos
  const exportToCSV = (dataType) => {
    const items = getFilteredData(dataType);
    if (items.length === 0) return;

    const headers = Object.keys(items[0]);
    const csvContent = [
      headers.join(','),
      ...items.map(item => headers.map(header => item[header]).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${dataType}_filtered_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

import SearchAndFilters from '../components/shared/SearchAndFilters';

import Modal from '../components/ui/Modal';

import OverviewTab from '../components/tabs/OverviewTab';

import ProductsTab from '../components/tabs/ProductsTab';

import OrdersTab from '../components/tabs/OrdersTab';

import CustomersTab from '../components/tabs/CustomersTab';

  const componentMap = {
    overview: <OverviewTab metrics={metrics} />,
    products: <ProductsTab
      filteredProducts={filteredProducts}
      deleteItem={deleteItem}
      handleFileUpload={handleFileUpload}
      exportToCSV={exportToCSV}
      SearchAndFiltersComponent={(props) => <SearchAndFilters {...props} />}
      handleEdit={handleEdit}
    />,
    orders: <OrdersTab
      filteredOrders={filteredOrders}
      updateOrderStatus={updateOrderStatus}
      deleteItem={deleteItem}
      exportToCSV={exportToCSV}
      SearchAndFiltersComponent={(props) => <SearchAndFilters {...props} />}
    />,
    customers: <CustomersTab
      filteredCustomers={filteredCustomers}
      deleteItem={deleteItem}
      exportToCSV={exportToCSV}
      SearchAndFiltersComponent={(props) => <SearchAndFilters {...props} />}
    />,
  };

  const ActiveComponent = componentMap[activeTab];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard eCommerce</h1>
              <p className="text-gray-600">Sistema completo con Cash Flow y métricas diarias</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="7days">Últimos 7 días</option>
                <option value="30days">Últimos 30 días</option>
                <option value="90days">Últimos 90 días</option>
                <option value="year">Este año</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
                {tab.id !== 'overview' && getActiveFiltersCount(tab.id) > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                    {getActiveFiltersCount(tab.id)}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ActiveComponent />
      </div>

      {/* Modals */}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          title={
            modalType === 'product' ? 'Agregar Producto' :
            modalType === 'editProduct' ? 'Editar Producto' :
            modalType === 'order' ? 'Agregar Pedido' :
            modalType === 'customer' ? 'Agregar Cliente' :
            'Cargar Datos'
          }
        >
          {modalType === 'product' && (
            <ProductForm onSave={addProduct} onCancel={() => setShowModal(false)} />
          )}
          {modalType === 'editProduct' && (
            <ProductForm product={editingItem} onSave={handleSave} onCancel={() => setShowModal(false)} />
          )}

          {modalType === 'order' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del cliente"
                value={newOrder.customer}
                onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <select
                value={newOrder.product}
                onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Seleccionar producto</option>
                {data.products.map(product => (
                  <option key={product.id} value={product.name}>{product.name}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Valor del pedido"
                value={newOrder.value}
                onChange={(e) => setNewOrder({...newOrder, value: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <select
                value={newOrder.status}
                onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Por Confirmar">Por Confirmar</option>
                <option value="Confirmado">Confirmado</option>
                <option value="En Tránsito">En Tránsito</option>
                <option value="Entregado">Entregado</option>
              </select>
              <button
                onClick={addOrder}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Agregar Pedido
              </button>
            </div>
          )}

          {modalType === 'customer' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <select
                value={newCustomer.type}
                onChange={(e) => setNewCustomer({...newCustomer, type: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Nuevo">Nuevo</option>
                <option value="Recurrente">Recurrente</option>
                <option value="VIP">VIP</option>
              </select>
              <button
                onClick={addCustomer}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Agregar Cliente
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default EcommerceDashboard;
