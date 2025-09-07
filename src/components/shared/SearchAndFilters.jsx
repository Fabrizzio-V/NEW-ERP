import React from 'react';
import { Filter, Search, RefreshCw } from 'lucide-react';

const SearchAndFilters = ({
    dataType,
    searchTerms,
    setSearchTerms,
    filters,
    setFilters,
    showFilters,
    setShowFilters,
    clearFilters,
    getActiveFiltersCount,
    filteredData,
    totalData
}) => {
    const activeFiltersCount = getActiveFiltersCount(dataType);

    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border">
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={`Buscar ${dataType}...`}
                value={searchTerms[dataType]}
                onChange={(e) => setSearchTerms(prev => ({ ...prev, [dataType]: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            onClick={() => setShowFilters(prev => ({ ...prev, [dataType]: !prev[dataType] }))}
            className={`flex items-center px-4 py-2 rounded-md border ${
              activeFiltersCount > 0
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700'
            } hover:bg-gray-50`}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={() => clearFilters(dataType)}
              className="flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Limpiar
            </button>
          )}

          <div className="text-sm text-gray-600">
            {filteredData.length} de {totalData.length} elementos
          </div>
        </div>

        {showFilters[dataType] && (
          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataType === 'products' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    value={filters.products.category}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      products: { ...prev.products, category: e.target.value }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Todas las categorías</option>
                    <option value="Electrónicos">Electrónicos</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Calzado">Calzado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    value={filters.products.status}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      products: { ...prev.products, status: e.target.value }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Todos los estados</option>
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rango de Precio</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.products.priceRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        products: {
                          ...prev.products,
                          priceRange: { ...prev.products.priceRange, min: e.target.value }
                        }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.products.priceRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        products: {
                          ...prev.products,
                          priceRange: { ...prev.products.priceRange, max: e.target.value }
                        }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rango de Stock</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.products.stockRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        products: {
                          ...prev.products,
                          stockRange: { ...prev.products.stockRange, min: e.target.value }
                        }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.products.stockRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        products: {
                          ...prev.products,
                          stockRange: { ...prev.products.stockRange, max: e.target.value }
                        }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            {dataType === 'orders' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    value={filters.orders.status}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      orders: { ...prev.orders, status: e.target.value }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Todos los estados</option>
                    <option value="Por Confirmar">Por Confirmar</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="En Tránsito">En Tránsito</option>
                    <option value="Entregado">Entregado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Desde</label>
                  <input
                    type="date"
                    value={filters.orders.dateRange.start}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      orders: {
                        ...prev.orders,
                        dateRange: { ...prev.orders.dateRange, start: e.target.value }
                      }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Hasta</label>
                  <input
                    type="date"
                    value={filters.orders.dateRange.end}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      orders: {
                        ...prev.orders,
                        dateRange: { ...prev.orders.dateRange, end: e.target.value }
                      }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rango de Valor</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.orders.valueRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        orders: {
                          ...prev.orders,
                          valueRange: { ...prev.orders.valueRange, min: e.target.value }
                        }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.orders.valueRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        orders: {
                          ...prev.orders,
                          valueRange: { ...prev.orders.valueRange, max: e.target.value }
                        }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </>
            )}

            {dataType === 'customers' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cliente</label>
                  <select
                    value={filters.customers.type}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      customers: { ...prev.customers, type: e.target.value }
                    }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Todos los tipos</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Recurrente">Recurrente</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Pedidos</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.customers.ordersRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        customers: {
                          ...prev.customers,
                          ordersRange: { ...prev.customers.ordersRange, min: e.target.value }
                        }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.customers.ordersRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        customers: {
                          ...prev.customers,
                          ordersRange: { ...prev.customers.ordersRange, max: e.target.value }
                        }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valor Total</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.customers.valueRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        customers: {
                          ...prev.customers,
                          valueRange: { ...prev.customers.valueRange, min: e.target.value }
                        }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.customers.valueRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        customers: {
                          ...prev.customers,
                          valueRange: { ...prev.customers.valueRange, max: e.target.value }
                        }
                      }))}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
};

export default SearchAndFilters;
