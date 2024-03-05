export default function SingleOrder({ line_items, createdAt, ...rest }) {
  return (
    <div className="border-b border-gray-300 flex items-center gap-4 py-2">
      <div>
        <time className="text-sm text-gray-500">{(new Date(createdAt)).toLocaleString('sv-SE')}</time>
        <div className="text-xs text-gray-600 mt-1">
          {rest.name}<br />
          {rest.email}<br />
          {rest.streetAddress}<br />
          {rest.postalCode} {rest.city}, {rest.country}
        </div>
      </div>
      <div>
        {line_items.map((item) => (
          <div key={item._id} className="text-xs text-gray-700">
            <span className="text-gray-500">{item.quantity} x </span>
            {item.price_data.product_data.name}
          </div>
        ))}
      </div>
    </div>
  );
}
