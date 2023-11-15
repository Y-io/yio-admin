import { AppRoute } from "@/AppRoute.tsx";
import NiceModal from "@ebay/nice-modal-react";

function App() {
  return (
    <NiceModal.Provider>
      <AppRoute />
    </NiceModal.Provider>
  );
}

export default App;
