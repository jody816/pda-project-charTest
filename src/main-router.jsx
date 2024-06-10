import { createBrowserRouter } from "react-router-dom";
import MainPage from "./routes/main/page";
import EditorPage from "./routes/editor/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/edit",
    element: <EditorPage />,
  },
]);

export default router;
