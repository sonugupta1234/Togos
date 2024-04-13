import React, { useState } from "react";

const FormData = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);
  console.log(totalPages);

  // Calculate index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>PhoneNumber</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item) => {
            return (
              <tr>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.PhoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage===1 ? "bg-slate-300 border border-black px-3 py-1": "border border-black px-3 py-1"}
        >
          Prev
        </button>
        <p className="border border-black p-2 mx-1">{currentPage}</p>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={indexOfLastItem >= data.length ? "bg-slate-300 border border-black px-3 py-1  mx-1": "border border-black px-3 py-1  mx-1"}
          disabled={indexOfLastItem >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FormData;