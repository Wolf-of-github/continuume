import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResourceForm from './ResourceForm';


const ResourceEdit = () => {
  
  const [resources, setResources] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    fetchResources();
  }, []);
  
  const fetchResources = async () => {
    try {
      const response = await fetch('/api/resource/read');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResources(data);

    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const deleteResource = async (id) =>{
    
    try{
      const response = await fetch(`/api/resource/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchResources()   
    }
    catch(error){
      console.error('Error fetching resources:', error);
    }
  }
  const handleAddResource = () => {
      setShowUploadForm(!showUploadForm)
  };
  
  const handleFormUploadSuccess = () => {
    setShowUploadForm(false);
    fetchResources();
  };  

  return (
    <div>
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-gray-700">Resources Overview</h2>
            <span className="text-xs text-gray-500">View and manage creation and updation of resources</span>
          </div>
          <button onClick={handleAddResource} className="text-sm  font-semibold bg-green-200 text-green-900 hover:bg-green-400 py-2 px-4 rounded">
            Add New Resource
          </button>          
        </div>
        { 
        showUploadForm && <ResourceForm onUploadSuccess={handleFormUploadSuccess} />
        }
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Downloads</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3">View</th>
                  <th className="px-5 py-3">Delete</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {resources.map(resource => (
                  <tr key = {resource._id}>
                    
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{resource.resourceName}</p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{resource.downloadCount}</p>
                    </td>

                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm max-w-48">
                      {/* Adjust max-w-48 as needed for maximum width */}
                      <p className="whitespace-pre-wrap">{resource.resourceDescription}</p>
                    </td>

                    <td className = "border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <a href={resource.url}   target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                        View
                      </a>
                    </td>
                    
                    <td className = "border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <button className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white hover:bg-red-900" onClick={()=>deleteResource(resource._id)}>
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm"> Showing {resources.length} Entries </span>
            <div className="mt-2 inline-flex sm:mt-0">
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ResourceEdit;
