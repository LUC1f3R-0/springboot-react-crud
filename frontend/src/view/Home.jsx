import React from 'react';
import axiosInstance from '../api/APIInstances';
import BUTTON from '../components/buttons';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const [pageData, setPageData] = React.useState([]);
  const [showDelete, setShowDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance("/customers");
      setPageData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    postForm(formJson);
    e.target.reset(); // Clear form after submit
  };

  const postForm = async (data) => {
    try {
      await axiosInstance.post('/add', data);
      fetchData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/user/${deleteId}`);
      const { success, message } = response.data

      fetchData();
      setShowDelete(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Form Section */}
      <div className="flex">
        <form className="flex gap-3 flex-wrap" onSubmit={formHandler}>
          <input name="name" placeholder="Product Name" className="border px-3 py-2 rounded text-sm font-medium text-gray-900 bg-white" />
          <input name="desc" placeholder="Description" className="border px-3 py-2 rounded text-sm font-medium text-gray-900 bg-white" />
          <input name="prs" placeholder="Price" className="border px-3 py-2 rounded text-sm font-medium text-gray-900 bg-white" />
          <input name="qty" placeholder="Quantity" className="border px-3 py-2 rounded text-sm font-medium text-gray-900 bg-white" />
          <input name="ctgry" placeholder="Category" className="border px-3 py-2 rounded text-sm font-medium text-gray-900 bg-white" />
          <button type="submit" className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Store
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Name", "Description", "Price ($)", "Quantity", "Category", "Created", "Updated", "Actions"].map((head) => (
                <th key={head} className="px-4 py-2 border text-black">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500 italic">No data available</td>
              </tr>
            ) : (
              pageData.map((data, index) => (
                <tr key={data.id}>
                  <td className="px-4 py-2 border text-center text-black"><NavLink to={`/edit/${data.id}`} >{index + 1}</NavLink></td>
                  <td className="px-4 py-2 border text-black">{data.name}</td>
                  <td className="px-4 py-2 border text-black">{data.desc}</td>
                  <td className="px-4 py-2 border text-right text-black">{data.prs}</td>
                  <td className="px-4 py-2 border text-center text-black">{data.qty}</td>
                  <td className="px-4 py-2 border text-black">{data.ctgry}</td>
                  <td className="px-4 py-2 border text-black whitespace-nowrap">{new Date(data.crtd).toLocaleString()}</td>
                  <td className="px-4 py-2 border text-black whitespace-nowrap">{new Date(data.uptd).toLocaleString()}</td>
                  <td className="px-4 py-2 border flex gap-2 justify-center">
                    <BUTTON value="Show" color="success" />
                    <BUTTON
                      value="Delete"
                      color="error"
                      onClick={() => {
                        setDeleteId(data.id);
                        setShowDelete(true);
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="relative rounded-lg bg-white shadow-xl sm:w-full sm:max-w-lg">
            <div className="p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100">
                  <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </div>
                <div className="mt-3 sm:ml-4 text-left">
                  <h3 className="text-base font-semibold text-gray-900">Delete Item</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Are you sure you want to delete this item? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 sm:flex sm:flex-row-reverse">
              <button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded sm:ml-3 sm:w-auto w-full">
                Delete
              </button>
              <button onClick={() => setShowDelete(false)} className="mt-3 sm:mt-0 bg-white border text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded w-full sm:w-auto">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
