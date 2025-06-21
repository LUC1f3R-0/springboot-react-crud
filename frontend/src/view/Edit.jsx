import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/APIInstances';

const Edit = () => {
    const { id } = useParams();
    const [pageData, setPageData] = React.useState(null);
    
    const getEdit = async () => {
        try {
            const response = await axiosInstance(`/user/${id}`);
            setPageData(response.data);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    React.useEffect(() => {
        getEdit();
    }, []);

    if (!pageData) return <p>Loading...</p>;

    return (
        <>
            <h1 className="text-xl font-bold mb-4">Edit Page</h1>
            <table className="table-auto border-collapse w-full text-sm text-left">
                <thead className="bg-white divide-y divide-gray-200">
                    <tr>
                        <th className="px-4 py-2 border text-black">ID</th>
                        <th className="px-4 py-2 border text-black">Product Name</th>
                        <th className="px-4 py-2 border text-black">Description</th>
                        <th className="px-4 py-2 border text-black">Price</th>
                        <th className="px-4 py-2 border text-black">Quantity</th>
                        <th className="px-4 py-2 border text-black">Category</th>
                        <th className="px-4 py-2 border text-black">Created At</th>
                        <th className="px-4 py-2 border text-black">Updated At</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-4 py-2 border text-black">{pageData.id}</td>
                        <td className="px-4 py-2 border text-black">{pageData.name}</td>
                        <td className="px-4 py-2 border text-black">{pageData.desc}</td>
                        <td className="px-4 py-2 border text-black">{pageData.prs}</td>
                        <td className="px-4 py-2 border text-black">{pageData.qty}</td>
                        <td className="px-4 py-2 border text-black">{pageData.ctgry}</td>
                        <td className="px-4 py-2 border text-black">{new Date(pageData.crtd).toLocaleString()}</td>
                        <td className="px-4 py-2 border text-black">{new Date(pageData.uptd).toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Edit;
