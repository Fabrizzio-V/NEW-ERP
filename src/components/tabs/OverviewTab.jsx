import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Package, ShoppingCart, TrendingUp, Users, Eye, Clock, AlertTriangle, Calendar, RefreshCw } from 'lucide-react';

const MetricCard = ({ title, value, icon: Icon, change, color = "blue" }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
              {change} vs mes anterior
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
);

const OverviewTab = ({ metrics }) => {
    if (!metrics || Object.keys(metrics).length === 0) {
        return <div>Cargando métricas...</div>;
    }

    return (
    <div className="space-y-6">
      {/* PANEL DEL DÍA - Destacado */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Calendar className="h-6 w-6 mr-2" />
          Rendimiento de Hoy - {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="text-sm font-medium opacity-90">Ventas del Día</h3>
            <p className="text-2xl font-bold">${metrics.todaySales.toLocaleString()}</p>
            <p className="text-xs opacity-75">
              {metrics.salesGrowthDaily >= 0 ? '+' : ''}{metrics.salesGrowthDaily}% vs ayer
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="text-sm font-medium opacity-90">Ganancia del Día</h3>
            <p className="text-2xl font-bold">${metrics.todayProfit.toLocaleString()}</p>
            <p className="text-xs opacity-75">
              {metrics.profitGrowthDaily >= 0 ? '+' : ''}{metrics.profitGrowthDaily}% vs ayer
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="text-sm font-medium opacity-90">Pedidos Hoy</h3>
            <p className="text-2xl font-bold">{metrics.todayOrders}</p>
            <p className="text-xs opacity-75">Pedidos registrados</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="text-sm font-medium opacity-90">Promedio por Pedido</h3>
            <p className="text-2xl font-bold">
              ${metrics.todayOrders > 0 ? Math.round(metrics.todaySales / metrics.todayOrders) : 0}
            </p>
            <p className="text-xs opacity-75">Valor promedio hoy</p>
          </div>
        </div>
      </div>

      {/* CASH FLOW */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-green-600" />
          Cash Flow y Liquidez
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-800 text-sm">💵 Dinero Disponible</h4>
            <p className="text-xl font-bold text-green-600">${metrics.availableCash.toLocaleString()}</p>
            <p className="text-xs text-green-700">Efectivo en caja</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-800 text-sm">📦 Invertido en Stock</h4>
            <p className="text-xl font-bold text-blue-600">${metrics.investedInStock.toLocaleString()}</p>
            <p className="text-xs text-blue-700">Capital en inventario</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-800 text-sm">🏦 Posición Neta</h4>
            <p className={`text-xl font-bold ${metrics.netCashPosition >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${metrics.netCashPosition.toLocaleString()}
            </p>
            <p className="text-xs text-purple-700">Efectivo - Pagos pendientes</p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-semibold text-orange-800 text-sm">📊 Ratio Liquidez</h4>
            <p className="text-xl font-bold text-orange-600">{metrics.cashFlowRatio}x</p>
            <p className="text-xs text-orange-700">
              {metrics.cashFlowRatio >= 0.3 ? 'Liquidez saludable' : 'Mejorar liquidez'}
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">💳 Pagos Pendientes:</span>
              <span className="ml-2 font-bold text-red-600">${metrics.pendingPayments.toLocaleString()}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">💸 Gastos Mensuales:</span>
              <span className="ml-2 font-bold text-gray-800">${metrics.monthlyExpenses.toLocaleString()}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">📈 Ingresos Proyectados:</span>
              <span className="ml-2 font-bold text-green-600">${metrics.projectedIncome.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas Financieras Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Ingresos Totales"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          change="+12.5%"
          color="green"
        />
        <MetricCard
          title="Ganancia Neta Real"
          value={`$${metrics.realNetProfit.toLocaleString()}`}
          icon={TrendingUp}
          change="+18.3%"
          color="emerald"
        />
        <MetricCard
          title="Valor Stock Actual"
          value={`$${metrics.totalStockValue.toLocaleString()}`}
          icon={Package}
          change="+5.7%"
          color="blue"
        />
        <MetricCard
          title="Margen Promedio"
          value={`${metrics.averageMargin}%`}
          icon={Eye}
          change="+2.1%"
          color="purple"
        />
      </div>

      {/* Comparativo Temporal */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Comparativo Temporal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">📅 Hoy</h4>
            <p className="text-lg font-bold text-blue-600">${metrics.todaySales.toLocaleString()}</p>
            <p className="text-sm text-blue-700">{metrics.todayOrders} pedidos</p>
            <p className="text-xs text-blue-600">Ganancia: ${metrics.todayProfit.toLocaleString()}</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">📅 Esta Semana</h4>
            <p className="text-lg font-bold text-green-600">${metrics.weekSales.toLocaleString()}</p>
            <p className="text-sm text-green-700">{metrics.weekOrders} pedidos</p>
            <p className="text-xs text-green-600">Ganancia: ${metrics.weekProfit.toLocaleString()}</p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">📅 Promedio Diario</h4>
            <p className="text-lg font-bold text-purple-600">${Math.round(metrics.weekSales / 7).toLocaleString()}</p>
            <p className="text-sm text-purple-700">{Math.round(metrics.weekOrders / 7)} pedidos/día</p>
            <p className="text-xs text-purple-600">Ganancia: ${Math.round(metrics.weekProfit / 7).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* TABLA DETALLADA POR DÍA */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-600" />
          Desglose Diario Detallado
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ventas del Día
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ganancia del Día
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedidos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Promedio/Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Margen %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vs Día Anterior
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {metrics.dailySalesData.map((day, index) => {
                const previousDay = index > 0 ? metrics.dailySalesData[index - 1] : null;
                const salesGrowth = previousDay && previousDay.sales > 0 ?
                  ((day.sales - previousDay.sales) / previousDay.sales * 100) : 0;
                const avgPerOrder = day.orders > 0 ? day.sales / day.orders : 0;
                const marginPercent = day.sales > 0 ? (day.profit / day.sales * 100) : 0;
                const isToday = day.date === '2024-09-04';

                return (
                  <tr key={day.date} className={isToday ? 'bg-blue-50 border-l-4 border-blue-500' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        {isToday && <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>}
                        {new Date(day.date).toLocaleDateString('es-ES', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                        {isToday && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">HOY</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                      ${day.sales.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">
                      ${day.profit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <ShoppingCart className="h-4 w-4 mr-1 text-gray-400" />
                        {day.orders}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${Math.round(avgPerOrder).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        marginPercent >= 30 ? 'bg-green-100 text-green-800' :
                        marginPercent >= 20 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {marginPercent.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {previousDay ? (
                        <div className="flex items-center">
                          {salesGrowth >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-red-500 mr-1 transform rotate-180" />
                          )}
                          <span className={salesGrowth >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {salesGrowth >= 0 ? '+' : ''}{salesGrowth.toFixed(1)}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Resumen de la tabla */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <span className="block font-semibold text-gray-700">Total 7 días</span>
              <span className="block text-lg font-bold text-green-600">
                ${metrics.weekSales.toLocaleString()}
              </span>
            </div>
            <div className="text-center">
              <span className="block font-semibold text-gray-700">Ganancia 7 días</span>
              <span className="block text-lg font-bold text-emerald-600">
                ${metrics.weekProfit.toLocaleString()}
              </span>
            </div>
            <div className="text-center">
              <span className="block font-semibold text-gray-700">Promedio diario</span>
              <span className="block text-lg font-bold text-blue-600">
                ${Math.round(metrics.weekSales / 7).toLocaleString()}
              </span>
            </div>
            <div className="text-center">
              <span className="block font-semibold text-gray-700">Mejor día</span>
              <span className="block text-lg font-bold text-purple-600">
                ${Math.max(...metrics.dailySalesData.map(d => d.sales)).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Análisis rápido */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-start">
            <Eye className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
            <div className="text-sm text-blue-800">
              <span className="font-semibold">Análisis rápido:</span>
              <div className="mt-1 space-y-1">
                {(() => {
                  const sortedDays = [...metrics.dailySalesData].sort((a, b) => b.sales - a.sales);
                  const bestDay = sortedDays[0];
                  const avgSales = metrics.weekSales / 7;
                  const todayData = metrics.dailySalesData.find(d => d.date === '2024-09-04');

                  return (
                    <>
                      <div>• Tu mejor día fue el {new Date(bestDay.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} con ${bestDay.sales.toLocaleString()}</div>
                      <div>• Hoy vendiste {todayData && todayData.sales > avgSales ? 'por encima' : 'por debajo'} del promedio (${Math.round(avgSales).toLocaleString()})</div>
                      <div>• Margen promedio semanal: {((metrics.weekProfit / metrics.weekSales) * 100).toFixed(1)}%</div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Cash Flow Diario */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Flujo de Dinero Diario (Últimos 7 días)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics.dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(date) => new Date(date).toLocaleDateString('es-ES')}
              formatter={(value, name) => [
                `$${value}`,
                name === 'sales' ? 'Ventas' :
                name === 'profit' ? 'Ganancias' :
                name === 'cashIn' ? 'Dinero Entró' : 'Dinero Salió'
              ]}
            />
            <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} name="Ventas" />
            <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} name="Ganancias" />
            <Line type="monotone" dataKey="cashIn" stroke="#8B5CF6" strokeWidth={1} strokeDasharray="5 5" name="Entradas" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Distribución de Clientes</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={Object.entries(metrics.customerTypes).map(([name, value]) => ({ name, value }))}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {Object.entries(metrics.customerTypes).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Estado de Pedidos</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded text-sm">
              <span className="font-medium">Por Confirmar</span>
              <span className="font-bold">{metrics.pendingOrders}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded text-sm">
              <span className="font-medium">Confirmados</span>
              <span className="font-bold">{metrics.confirmedOrders}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-orange-50 rounded text-sm">
              <span className="font-medium">En Tránsito</span>
              <span className="font-bold">{metrics.inTransitOrders}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded text-sm">
              <span className="font-medium">Entregados</span>
              <span className="font-bold">{metrics.deliveredOrders}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Top Productos Rentables</h3>
          <div className="space-y-2">
            {metrics.topProfitableProducts.map((product, index) => (
              <div key={product.id} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-2">
                    {index + 1}
                  </span>
                  <span className="font-medium truncate max-w-24">{product.name}</span>
                </div>
                <span className="font-bold text-green-600">${product.profit.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas Mejoradas */}
      {(metrics.lowStockProducts > 0 || metrics.inventoryTurnover < 1 || metrics.netCashPosition < 0 || metrics.cashFlowRatio < 0.2) && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-2">⚠️ Alertas y Recomendaciones</h3>
          <div className="space-y-2 text-sm">
            {metrics.lowStockProducts > 0 && (
              <div className="flex items-center text-amber-700">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <span>Tienes {metrics.lowStockProducts} productos con stock bajo (menos de 20 unidades)</span>
              </div>
            )}
            {metrics.inventoryTurnover < 1 && (
              <div className="flex items-center text-amber-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                <span>La rotación de inventario es baja ({metrics.inventoryTurnover}x). Considera promociones.</span>
              </div>
            )}
            {metrics.netCashPosition < 0 && (
              <div className="flex items-center text-red-700">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>Tu posición de efectivo es negativa. Revisa los pagos pendientes.</span>
              </div>
            )}
            {metrics.cashFlowRatio < 0.2 && (
              <div className="flex items-center text-amber-700">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span>Ratio de liquidez bajo. Considera convertir más inventario en efectivo.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    )
};

export default OverviewTab;
