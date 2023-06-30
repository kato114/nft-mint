import React from "react";
import { Toaster } from "react-hot-toast";
import MyRouter from "routers/index";
function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
            },
          }}
        />
      <MyRouter />
    </div>
  );
}

export default App;
