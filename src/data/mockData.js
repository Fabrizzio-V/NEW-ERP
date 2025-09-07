export const initialData = {
  products: [
    { id: 1, name: 'iPhone 15 Pro', category: 'Electrónicos', price: 899, stock: 50, sold: 45, inTransit: 12, delivered: 33, profit: 18000, provider: 'Apple Inc', status: 'active', createdDate: '2024-01-15' },
    { id: 2, name: 'Samsung Galaxy S24', category: 'Electrónicos', price: 699, stock: 30, sold: 38, inTransit: 8, delivered: 30, profit: 14500, provider: 'Samsung', status: 'active', createdDate: '2024-02-10' },
    { id: 3, name: 'MacBook Pro M3', category: 'Electrónicos', price: 1299, stock: 15, sold: 15, inTransit: 3, delivered: 12, profit: 22500, provider: 'Apple Inc', status: 'active', createdDate: '2024-01-20' },
    { id: 4, name: 'AirPods Pro', category: 'Accesorios', price: 199, stock: 100, sold: 72, inTransit: 15, delivered: 57, profit: 10800, provider: 'Apple Inc', status: 'active', createdDate: '2024-03-05' },
    { id: 5, name: 'Apple Watch Series 9', category: 'Accesorios', price: 299, stock: 45, sold: 28, inTransit: 5, delivered: 23, profit: 8400, provider: 'Apple Inc', status: 'active', createdDate: '2024-02-28' },
    { id: 6, name: 'Sony WH-1000XM5', category: 'Accesorios', price: 349, stock: 15, sold: 18, inTransit: 3, delivered: 15, profit: 5400, provider: 'Sony', status: 'inactive', createdDate: '2024-01-10' },
    { id: 7, name: 'Camiseta Premium', category: 'Ropa', price: 45, stock: 200, sold: 156, inTransit: 24, delivered: 132, profit: 4680, provider: 'Fashion Co', status: 'active', createdDate: '2024-03-15' },
    { id: 8, name: 'Zapatillas Deportivas', category: 'Calzado', price: 120, stock: 80, sold: 67, inTransit: 12, delivered: 55, profit: 8040, provider: 'SportsBrand', status: 'active', createdDate: '2024-02-01' }
  ],
  orders: [
    { id: 1, orderId: 'ORD-001', customer: 'Juan Pérez', product: 'iPhone 15 Pro', value: 899, status: 'En Tránsito', date: '2024-09-04', customerEmail: 'juan@email.com' },
    { id: 2, orderId: 'ORD-002', customer: 'María García', product: 'Samsung Galaxy S24', value: 699, status: 'Confirmado', date: '2024-09-04', customerEmail: 'maria@email.com' },
    { id: 3, orderId: 'ORD-003', customer: 'Carlos López', product: 'MacBook Pro M3', value: 1299, status: 'Entregado', date: '2024-09-03', customerEmail: 'carlos@email.com' },
    { id: 4, orderId: 'ORD-004', customer: 'Ana Martín', product: 'AirPods Pro', value: 199, status: 'Por Confirmar', date: '2024-09-04', customerEmail: 'ana@email.com' },
    { id: 5, orderId: 'ORD-005', customer: 'Luis Rodríguez', product: 'Apple Watch Series 9', value: 299, status: 'Entregado', date: '2024-09-03', customerEmail: 'luis@email.com' },
    { id: 6, orderId: 'ORD-006', customer: 'Elena Torres', product: 'Camiseta Premium', value: 45, status: 'Cancelado', date: '2024-09-02', customerEmail: 'elena@email.com' },
    { id: 7, orderId: 'ORD-007', customer: 'Pedro Silva', product: 'Zapatillas Deportivas', value: 120, status: 'Entregado', date: '2024-09-04', customerEmail: 'pedro@email.com' },
    { id: 8, orderId: 'ORD-008', customer: 'Carmen Ruiz', product: 'Laptop Gaming', value: 1599, status: 'En Tránsito', date: '2024-09-03', customerEmail: 'carmen@email.com' }
  ],
  customers: [
    { id: 1, name: 'Juan Carlos Mendez', email: 'juan@email.com', orders: 12, totalValue: 3450, type: 'VIP', lastPurchase: '2024-09-01', registrationDate: '2023-05-15' },
    { id: 2, name: 'María Elena Ruiz', email: 'maria@email.com', orders: 8, totalValue: 2890, type: 'VIP', lastPurchase: '2024-09-02', registrationDate: '2023-08-20' },
    { id: 3, name: 'Carlos Alberto López', email: 'carlos@email.com', orders: 6, totalValue: 1890, type: 'Recurrente', lastPurchase: '2024-08-28', registrationDate: '2024-01-10' },
    { id: 4, name: 'Ana Patricia Morales', email: 'ana@email.com', orders: 4, totalValue: 1450, type: 'Recurrente', lastPurchase: '2024-09-03', registrationDate: '2024-02-14' },
    { id: 5, name: 'José Miguel Torres', email: 'jose@email.com', orders: 2, totalValue: 890, type: 'Nuevo', lastPurchase: '2024-09-04', registrationDate: '2024-08-30' }
  ],
  salesHistory: [
    { month: 'Ene', sales: 45600, profit: 12400, orders: 45 },
    { month: 'Feb', sales: 38900, profit: 15398, orders: 38 },
    { month: 'Mar', sales: 52100, profit: 19800, orders: 28 },
    { month: 'Abr', sales: 41780, profit: 16908, orders: 52 },
    { month: 'May', sales: 47890, profit: 18800, orders: 41 },
    { month: 'Jun', sales: 44390, profit: 17300, orders: 36 },
    { month: 'Jul', sales: 49490, profit: 19100, orders: 49 }
  ],
  dailySales: [
    { date: '2024-08-29', sales: 1850, profit: 740, orders: 4, cashIn: 1850, cashOut: 300 },
    { date: '2024-08-30', sales: 2250, profit: 900, orders: 5, cashIn: 2250, cashOut: 450 },
    { date: '2024-08-31', sales: 1680, profit: 672, orders: 3, cashIn: 1680, cashOut: 200 },
    { date: '2024-09-01', sales: 2450, profit: 980, orders: 5, cashIn: 2450, cashOut: 600 },
    { date: '2024-09-02', sales: 1890, profit: 756, orders: 3, cashIn: 1890, cashOut: 500 },
    { date: '2024-09-03', sales: 3567, profit: 1427, orders: 7, cashIn: 3567, cashOut: 1200 },
    { date: '2024-09-04', sales: 4349, profit: 1740, orders: 6, cashIn: 4349, cashOut: 800 }
  ],
  cashFlow: {
    availableCash: 28500,
    investedInStock: 87600,
    pendingPayments: 3450,
    monthlyExpenses: 12000,
    projectedIncome: 15600
  }
};
