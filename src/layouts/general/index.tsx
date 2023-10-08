import { Routes, Route, Navigate } from "react-router-dom";
import routes from "routes";

export default function General() {
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/general") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  return (
    <Routes>
      {getRoutes(routes)}
      <Route path="/" element={<Navigate to="/general/about" replace />} />
    </Routes>
  );
}
