const DeleteConfirmModal = ({ taskTitle, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 font-ia">
    <div className="bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-center">Delete Task?</h2>
      <p className="text-gray-600 text-center">
        Are you sure you want to delete <span className="font-semibold">"{taskTitle}"</span>? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-300 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;

