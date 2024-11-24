import { FC } from "react";
import Providers from "../providers";

const App: FC = () => {
  return (
    <Providers>
      <div className="px-8 py-8 bg-surface text-on-surface">
        Testing
      </div>
    </Providers>
  );
};

export default App;
