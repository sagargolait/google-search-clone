export default function SearchFilters() {
  const filters = [
    { label: "All", active: true },
    { label: "Images", active: false },
    { label: "Videos", active: false },
    { label: "News", active: false },
    { label: "Maps", active: false },
    { label: "Shopping", active: false },
    { label: "More", active: false },
  ];

  return (
    <div className="flex items-center gap-6 text-sm text-[#969ba1] border-b border-[#3c4043] mb-3 -mt-1">
      {filters.map((filter, index) => (
        <button
          key={index}
          className={`px-3 py-3 border-b-2 ${
            filter.active
              ? "text-[#8ab4f8] border-[#8ab4f8]"
              : "border-transparent hover:text-[#e8eaed]"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
