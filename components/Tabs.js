export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-20 mb-20">
      {tabs.map((tabName, index) => (
        <button
          key={index}
          onClick={() => onChange(tabName)}
          className={`text-lg cursor-pointer ${tabName === active ? 'text-black border-b-2 border-black' : 'text-gray-600'}`}
        >
          {tabName}
        </button>
      ))}
    </div>
  );
}
