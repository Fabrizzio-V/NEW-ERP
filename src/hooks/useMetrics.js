import { useMemo } from 'react';

export const useMetrics = (data) => {
  const metrics = useMemo(() => {
    if (!data) return {};

    const totalRevenue = data.orders.reduce((sum, order) => sum + order.value, 0);
    const totalOrders = data.orders.length;

    const realNetProfit = data.products.reduce((sum, product) => {
      return sum + product.profit;
    }, 0);

    const totalStockValue = data.products.reduce((sum, product) => {
      return sum + (product.stock * product.price);
    }, 0);

    const soldProductsValue = data.products.reduce((sum, product) => {
      return sum + (product.sold * product.price);
    }, 0);

    const averageMargin = soldProductsValue > 0 ? (realNetProfit / soldProductsValue) * 100 : 0;

    const lowStockProducts = data.products.filter(p => p.stock < 20 && p.status === 'active').length;

    const totalSold = data.products.reduce((sum, product) => sum + product.sold, 0);
    const totalStock = data.products.reduce((sum, product) => sum + product.stock, 0);
    const inventoryTurnover = totalStock > 0 ? totalSold / totalStock : 0;

    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const ordersByStatus = data.orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    const customerTypes = data.customers.reduce((acc, customer) => {
      acc[customer.type] = (acc[customer.type] || 0) + 1;
      return acc;
    }, {});

    const topProfitableProducts = [...data.products]
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 5);

    const today = '2024-09-04';
    const yesterday = '2024-09-03';

    const todaySales = data.dailySales.find(d => d.date === today) || { sales: 0, profit: 0, orders: 0 };
    const yesterdaySales = data.dailySales.find(d => d.date === yesterday) || { sales: 0, profit: 0, orders: 0 };

    const todayOrders = data.orders.filter(order => order.date === today);

    const cashFlow = data.cashFlow;
    const netCashPosition = cashFlow.availableCash - cashFlow.pendingPayments;
    const cashFlowRatio = cashFlow.availableCash / cashFlow.investedInStock;

    const last7Days = data.dailySales.slice(-7);
    const weekSales = last7Days.reduce((sum, day) => sum + day.sales, 0);
    const weekProfit = last7Days.reduce((sum, day) => sum + day.profit, 0);
    const weekOrders = last7Days.reduce((sum, day) => sum + day.orders, 0);

    const salesGrowthDaily = yesterdaySales.sales > 0 ?
      ((todaySales.sales - yesterdaySales.sales) / yesterdaySales.sales * 100) : 0;
    const profitGrowthDaily = yesterdaySales.profit > 0 ?
      ((todaySales.profit - yesterdaySales.profit) / yesterdaySales.profit * 100) : 0;

    return {
      totalRevenue,
      totalOrders,
      realNetProfit: Math.round(realNetProfit),
      totalStockValue: Math.round(totalStockValue),
      soldProductsValue: Math.round(soldProductsValue),
      averageMargin: Math.round(averageMargin * 100) / 100,
      lowStockProducts,
      inventoryTurnover: Math.round(inventoryTurnover * 100) / 100,
      totalSold,
      totalStock,
      averageOrderValue: Math.round(averageOrderValue),
      totalProducts: data.products.length,
      activeProducts: data.products.filter(p => p.status === 'active').length,
      totalCustomers: data.customers.length,
      pendingOrders: ordersByStatus['Por Confirmar'] || 0,
      inTransitOrders: ordersByStatus['En Tránsito'] || 0,
      deliveredOrders: ordersByStatus['Entregado'] || 0,
      confirmedOrders: ordersByStatus['Confirmado'] || 0,
      customerTypes,
      topProfitableProducts,
      todaySales: todaySales.sales,
      todayProfit: todaySales.profit,
      todayOrders: todaySales.orders,
      yesterdaySales: yesterdaySales.sales,
      yesterdayProfit: yesterdaySales.profit,
      salesGrowthDaily: Math.round(salesGrowthDaily * 100) / 100,
      profitGrowthDaily: Math.round(profitGrowthDaily * 100) / 100,
      weekSales: Math.round(weekSales),
      weekProfit: Math.round(weekProfit),
      weekOrders,
      availableCash: cashFlow.availableCash,
      investedInStock: cashFlow.investedInStock,
      netCashPosition: Math.round(netCashPosition),
      cashFlowRatio: Math.round(cashFlowRatio * 100) / 100,
      pendingPayments: cashFlow.pendingPayments,
      monthlyExpenses: cashFlow.monthlyExpenses,
      projectedIncome: cashFlow.projectedIncome,
      dailySalesData: data.dailySales
    };
  }, [data]);

  return metrics;
};
