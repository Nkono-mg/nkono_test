export default function Pagination({ page, totalPages, onPageChange }) {
  const generatePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (page > 3) pages.push(1);
    if (page > 4) pages.push("...");

    for (
      let i = Math.max(1, page - 2);
      i <= Math.min(totalPages, page + 2);
      i++
    ) {
      pages.push(i);
    }

    if (page < totalPages - 3) pages.push("...");
    if (page < totalPages - 2) pages.push(totalPages);

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ◀ Précédent
      </button>

      {pages.map((p, index) => (
        <button
          key={index}
          onClick={() => typeof p === "number" && onPageChange(p)}
          disabled={p === "..." || p === page}
          className={`px-3 py-1 rounded ${
            p === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Suivant ▶
      </button>
    </div>
  );
}
