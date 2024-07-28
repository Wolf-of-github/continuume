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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {resources.map(resource => (
            <div key={resource._id} className="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col justify-between">
              <h2 className="text-lg font-semibold mb-2 text-center text-gray-800 break-words">{resource.resourceName}</h2>
              <p className="mb-4 text-center text-gray-600">{resource.resourceDescription}</p>

              <hr className="my-4 border-b-2 border-gray-200" />

              <div className="flex justify-around items-center px-4">
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
                  className="text-indigo-500 hover:font-semibold"
                >
                  Download
                </button>
                <button
                  onClick={() => window.open(resource.url, '_blank')}
                  className="text-indigo-500 hover:font-semibold"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
