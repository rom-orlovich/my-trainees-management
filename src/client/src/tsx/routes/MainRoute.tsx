import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PropsBasic } from "../components/baseComponents/baseComponentsTypes";
import {
  checkSecValueIncludeOrEqualFirstValue,
  getEndPoint,
} from "../utilities/helpersFun";

export type MainRouteProps<CTX> = PropsBasic & {
  mainRoutes: string | string[];
  context?: CTX;
};

// Display the main route when the URL is match the main route url.
// Otherwise display the outlet.
function MainRoute<CTX>({
  children,
  context,
  mainRoutes,
}: MainRouteProps<CTX>) {
  const checkResult = checkSecValueIncludeOrEqualFirstValue(
    mainRoutes,
    getEndPoint(useLocation().pathname)
  );

  return checkResult ? <>{children}</> : <Outlet context={context} />;
}

export default MainRoute;
