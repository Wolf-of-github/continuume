import React, { useEffect, useState } from 'react';

export default function Resource() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/resource/read');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch resources');
      }

      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error.message);
    }
  };
  
  const handleDownload = async (resourceId, resourceName) => {
    try {
      const res = await fetch(`/api/resource/download/${resourceId}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await res.blob();
      const urlObject = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlObject;
      link.setAttribute('download', resourceName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlObject); // Clean up the URL object
    } catch (error) {
      console.error('Error downloading the file:', error.message);
    }
  };

  return (
    <div className='h-screen bg-gray-800'>
      <div className="grid grid-cols-5 gap-4 p-4 overflow-auto">
        {resources.map(resource => (
          <div key={resource._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 text-wrap max-w-sm break-words">{resource.resourceName}</h2>
            <p className="mb-4 text-center text-wrap text-slate-600">{resource.resourceDescription}</p>

            <hr className="my-4 border-b-2 border-gray-200" />

            <div className="flex justify-between items-center px-4">
              <div>
                <p className="text-sm text-gray-600 text-center">Size</p>
                <p className="text-gray-800 text-center">{resource.resourceSize}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 text-center">Type</p>
                <p className="text-gray-800 text-center">{resource.resourceType}</p>
              </div>
            </div>

            <hr className="my-4 border-b-2 border-gray-200" />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleDownload(resource._id, resource.resourceName)}
                className="text-blue-500 hover:font-semibold mr-2"
              >
                Download
              </button>
              <button
                onClick={() => window.open(resource.url, '_blank')}
                className="text-blue-500 hover:font-semibold mr-2"
              >
                View
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>      
  );
}
