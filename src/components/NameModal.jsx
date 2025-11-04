const NameModal = ({ tempName, setTempName, handleNameSubmit }) => (
  <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 font-ia">
    <div className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-center">What's your name?</h2>
      <input
        type="text"
        maxLength={10}
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleNameSubmit();
        }}
        placeholder="Enter your name (max 10 characters)"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-end">
        <button
          onClick={handleNameSubmit}
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
);

export default NameModal;
