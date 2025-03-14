import { useEffect, useRef, useState } from "react";
import FloorMapApi from "../../Services/FloorMapApi";
import { toast } from "react-toastify";

const FloorMap = () => {
  const ref = useRef(null);
  const [floorMap, setFloorMap] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get floor map data from API
  const getFloorMap = async () => {
    try {
      const response = await FloorMapApi.getFloorMapData();
      if (response.status === 200) {
        setFloorMap(response.data);
        setLoading(false);
      } else {
        if (ref.current) toast.error(response.response.data, { autoClose: 1500 });
        ref.current = true;
        setLoading(false);
      }
    } catch (error) {
      if (ref.current) toast.error("Something went wrong", { autoClose: 1500 });
      ref.current = true;
      setLoading(false);
    }
  };

  // Get floor map data on component mount
  useEffect(() => {
    getFloorMap();
  }, []);

  // Placeholder data for 3 tables with parts if API fails
  const defaultTables = Array.from({ length: 11 }, (_, tableIndex) => ({
    id: tableIndex + 1,
    label: `Table No-${tableIndex + 1}`,
    parts: Array.from({ length: 14 }, (_, partIndex) => ({
      id: partIndex + 1,
      sections: ['CPU', 'MNT', 'MS', 'KB']
    }))
  }));

  const tablesData = floorMap.length > 0 ? floorMap : defaultTables;

  // Split tables into two equal groups
  const midIndex = Math.ceil(tablesData.length / 2);
  const firstHalf = tablesData.slice(0, midIndex);
  const secondHalf = tablesData.slice(midIndex);

  return (
    <div className="relative min-w-full min-h-full p-1 overflow-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Office Floor Plan
      </h1>

      {loading && (
        <>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center bg-gray-200 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-1/4 w-1/4  border-1 border-b-4 border-t-4 border-black"></div>  
        </div>
         <div> 
         <h1 className="text-2xl font-bold flex justify-center items-center">Loading...</h1>      
       </div>
        </>
      )}

      {/* Floor Plan Container */}
      <div className="flex justify-center">
        <div className="w-1/2 p-2">
          {firstHalf.map((table) => (
            <div key={table.id} className="flex flex-col items-center mb-4">
              <div className="bg-gray-200 p-2 rounded-md shadow-md">
                <h2 className="text-lg font-bold">{table.label}</h2>
              </div>
              <div className="flex flex-col items-center mt-2">
                {table.parts.map((part) => (
                  <div key={part.id} className="flex items-center space-x-1">
                    {part.sections.map((section, index) => (
                      <div
                        key={index}
                        className="bg-blue-200 p-1 rounded-md shadow-md"
                      >
                        {section}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 p-2">
          {secondHalf.map((table) => (
            <div key={table.id} className="flex flex-col items-center mb-4">
              <div className="bg-gray-200 p-2 rounded-md shadow-md">
                <h2 className="text-lg font-bold">{table.label}</h2>
              </div>
              <div className="flex flex-col items-center mt-2">
                {table.parts.map((part) => (
                  <div key={part.id} className="flex items-center space-x-1">
                    {part.sections.map((section, index) => (
                      <div
                        key={index}
                        className="bg-blue-200 p-1 rounded-md shadow-md"
                      >
                        {section}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloorMap;
