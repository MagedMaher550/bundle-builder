import { AppLayout } from "@/components/layout/AppLayout";
import Builder from "@/components/builder";
import ReviewPanel from "@/components/review";

function App() {
  return (
    <AppLayout>
      <Builder />
      <ReviewPanel />
    </AppLayout>
  );
}

export default App;

// import data from "@/data";
// import { useBundle } from "@/hooks/useBundle";

// function App() {
//   const {
//     currentStep,
//     selectedDevices,
//     selectedPlan,
//     subtotal,
//     savings,
//     total,
//     totalItems,
//     addDevice,
//     removeDevice,
//     incrementQuantity,
//     decrementQuantity,
//     selectDeviceVariant,
//     selectPlan,
//     nextStep,
//     previousStep,
//     clearBundle,
//   } = useBundle();

//   const camera = data.devices.find(
//     (device) => device.category === "camera",
//   );

//   const sensor = data.devices.find(
//     (device) => device.category === "sensor",
//   );

//   const plan = data.plans[0];

//   return (
//     <div className="min-h-screen bg-slate-950 p-10 text-white">
//       <h1 className="mb-8 text-4xl font-bold">Bundle Builder Dev Playground</h1>

//       <div className="mb-8 flex flex-wrap gap-3">
//         {camera && (
//           <>
//             <button
//               onClick={() => addDevice(camera.id)}
//               className="rounded bg-green-600 px-4 py-2"
//             >
//               Add Camera
//             </button>

//             <button
//               onClick={() => incrementQuantity(camera.id)}
//               className="rounded bg-blue-600 px-4 py-2"
//             >
//               + Camera
//             </button>

//             <button
//               onClick={() => decrementQuantity(camera.id)}
//               className="rounded bg-orange-600 px-4 py-2"
//             >
//               - Camera
//             </button>

//             <button
//               onClick={() => removeDevice(camera.id)}
//               className="rounded bg-red-600 px-4 py-2"
//             >
//               Remove Camera
//             </button>

//             {camera.variants?.[0] && (
//               <button
//                 onClick={() =>
//                   selectDeviceVariant(camera.id, camera.variants![0].id)
//                 }
//                 className="rounded bg-purple-600 px-4 py-2"
//               >
//                 Select First Variant
//               </button>
//             )}
//           </>
//         )}

//         {sensor && (
//           <button
//             onClick={() => addDevice(sensor.id)}
//             className="rounded bg-cyan-600 px-4 py-2"
//           >
//             Add Sensor
//           </button>
//         )}

//         <button
//           onClick={() => selectPlan(plan.id)}
//           className="rounded bg-pink-600 px-4 py-2"
//         >
//           Select Plan
//         </button>

//         <button
//           onClick={nextStep}
//           className="rounded bg-yellow-500 px-4 py-2 text-black"
//         >
//           Next Step
//         </button>

//         <button
//           onClick={previousStep}
//           className="rounded bg-yellow-700 px-4 py-2"
//         >
//           Previous Step
//         </button>

//         <button onClick={clearBundle} className="rounded bg-gray-700 px-4 py-2">
//           Clear Bundle
//         </button>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         <div className="rounded-lg bg-slate-900 p-6">
//           <h2 className="mb-4 text-xl font-semibold">Derived State</h2>

//           <ul className="space-y-2">
//             <li>Current Step: {currentStep}</li>
//             <li>Total Items: {totalItems}</li>
//             <li>Subtotal: ${subtotal.toFixed(2)}</li>
//             <li>Savings: ${savings.toFixed(2)}</li>
//             <li>Total: ${total.toFixed(2)}</li>
//             <li>Selected Plan: {selectedPlan?.name ?? "None"}</li>
//           </ul>
//         </div>

//         <div className="rounded-lg bg-slate-900 p-6">
//           <h2 className="mb-4 text-xl font-semibold">Selected Devices</h2>

//           <pre className="overflow-auto text-sm">
//             {JSON.stringify(selectedDevices, null, 2)}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
