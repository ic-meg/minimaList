const FilterButtons = ({ filter, setFilter }) => {
  return (
    <div className="space-x-2 text-sm">
      <button
        onClick={() => setFilter("todo")}
        className={`px-3 py-1 rounded-full ${
          filter === "todo"
            ? "bg-black text-white"
            : "bg-gray-200 text-gray-700 cursor-pointer"
        }`}
      >
        To-Do
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-3 py-1 rounded-full ${
          filter === "completed"
            ? "bg-black text-white"
            : "bg-gray-200 text-gray-700 cursor-pointer"
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterButtons;
