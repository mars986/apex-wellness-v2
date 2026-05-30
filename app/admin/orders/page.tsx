export default function AdminOrdersPage() {
  const orders = [
    {
      id: "ord_001",
      customer: "customer@example.com",
      total: "$179.99",
      status: "Paid",
      provider: "Dr Smith",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">
        Orders
      </h1>

      <div className="mt-8 overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Provider</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.provider}</td>
                <td className="p-4">{order.status}</td>
                <td className="p-4">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}