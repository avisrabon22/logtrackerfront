import { useEffect, useRef, useState } from "react";
import FloorMapApi from "../../Services/FloorMapApi";
import { toast } from "react-toastify";

const FloorMap = () => {
  const ref = useRef(null);
  const [floorMap, setFloorMap] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFloorMap = async () => {
    try {
      const response = await FloorMapApi.getFloorMapData();
      if (response.status === 200) {
        setFloorMap(response.data);
        setLoading(false);
      } else {
        if (ref.current) toast.error(response.response.data,{autoClose:1500});
        ref.current = true;
      }
    } catch (error) {
      if (ref.current) toast.error("Something went wrong",{autoClose:1500});
      ref.current = true;
    }
  };

  useEffect(() => {
    getFloorMap();
    
  }, []);
// Placeholder data for 14 tables if API fails
const defaultTables = Array.from({ length: 14 }, (_, index) => ({
  id: index + 1,
  label: `Table-${String(index + 1).padStart(3, "0")}`,
}));

  return (
    <div className="min-h-screen p-6">
    <h1 className="text-3xl font-bold text-center mb-8">
      Office Floor Plan
    </h1>

    {/* Loading Spinner */}
    {loading && (
      <div className="absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-90 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )}
       {/* Floor Plan Container */}
    <div className="max-w-6xl mx-auto relative bg-white border border-gray-300 p-4 grid grid-cols-12 gap-2">
    {/* Training Room (Top Left, Yellow) */}
    <div
      className="col-span-4 bg-yellow-200 p-2 rounded text-center text-sm font-semibold text-gray-700"
      style={{ gridRow: "1", gridColumn: "1 / span 4" }}
      >
      Training Room
    </div>

    {/* Admin Room (Top Right, Yellow) */}
    <div
      className="col-span-4 bg-yellow-200 p-2 rounded text-center text-sm font-semibold text-gray-700"
      style={{ gridRow: "1", gridColumn: "9 / span 4" }}
      >
      Admin Room
    </div>

    {/* Cafeteria (Middle Right, Green) */}
    <div
      className="col-span-4 bg-green-300 p-2 rounded text-center text-sm font-semibold text-gray-700"
      style={{ gridRow: "2 / span 3", gridColumn: "9 / span 4" }}
      >
      Cafeteria
    </div>

    {/* Playground (Middle Right, Yellow) */}
    <div
      className="col-span-2 bg-yellow-200 p-2 rounded text-center text-sm font-semibold text-gray-700"
      style={{ gridRow: "2", gridColumn: "7 / span 2" }}
    >
      Playground
    </div>

    {/* Pantry Area (Bottom Left, Yellow) */}
    <div
      className="col-span-4 bg-yellow-200 p-2 rounded text-center text-sm font-semibold text-gray-700"
      style={{ gridRow: "4", gridColumn: "1 / span 4" }}
      >
      Pantry Area
    </div>

    {/* Washroom (Bottom Left, Blue) */}
    <div
      className="col-span-2 bg-blue-200 p-2 rounded text-center text-sm font-semibold text-gray-700"
      style={{ gridRow: "4", gridColumn: "5 / span 2" }}
      >
      Washroom
    </div>

    {/* Table Area (Middle, Mixed Colors) */}
    <div
      className="col-span-12 bg-gray-50 p-2 rounded"
      style={{ gridRow: "2 / span 2", gridColumn: "1 / span 12" }}
      >
      <div className="grid grid-cols-7 gap-2">
        {(floorMap.length > 0 ? floorMap : defaultTables).map((table) => (
          <div
          key={table.id}
          className="bg-red-200 p-2 rounded text-center text-xs font-medium text-gray-800 hover:bg-red-300 transition-colors"
          >
            {table.cpuId}
          </div>
        ))}
      </div>
    </div>
  </div>
  </div>
  );
};
export default FloorMap;
