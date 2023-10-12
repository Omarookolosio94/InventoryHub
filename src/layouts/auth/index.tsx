import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import routes from "routes";
import Footer from "core/components/footer/FooterAuthDefault";
import FixedPlugin from "core/components/fixedPlugin/FixedPlugin";

export default function Auth() {
  var navigate = useNavigate();
  const token = localStorage.getItem("token");
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    if (token != null && token?.length > 1) {
      navigate(-1);
    }
  }, []);

  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to="/auth/sign-in" replace />}
                  />
                </Routes>
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div className="absolute flex h-full w-full items-end justify-center bg-navy-500 bg-cover bg-center dark:bg-brand-400 dark:text-white dark:active:bg-brand-200 lg:rounded-bl-[120px]  xl:rounded-bl-[200px]" />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
