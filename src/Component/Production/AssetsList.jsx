import React, { useState } from "react";

const AssetsList = () => {
    const [assets,setAssets]  = useState([]);


return (
    <div className="p-4 flex ">
        {assets.map((asset) => (
            <div key={asset.id} className="p-2  w-20 flex justify-center bg-gray-200 rounded m-2">
                {asset.name}
            </div>
        ))}
    </div>
);
}

export default AssetsList;