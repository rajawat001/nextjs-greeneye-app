// pages/plantshop.js
import dynamic from "next/dynamic";

const PlantShop = dynamic(() => import("../components/PlantShop"), { ssr: false });

export default PlantShop;
