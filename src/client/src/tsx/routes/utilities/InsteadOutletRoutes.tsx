import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PropsBasic } from "../../components/baseComponents/baseComponentsTypes";
import {
  checkSecValueIncludeOrEqualFirstValue,
  getEndPoint,
} from "../../utilities/helpersFun";

export type InsteadOutletRoutesProps<CTX> = PropsBasic & {
  InsteadOutletRoutesPaths: string | string[];
  context?: CTX;
};

/**
 * 
 When the url endpoint matches the InsteadOutletRoutesPaths, 
 the component will display the parent route component,
 instead and not the Outlet component, namely the children route components.
 */

function InsteadOutletRoutes<CTX>({
  children,
  context,
  InsteadOutletRoutesPaths,
}: InsteadOutletRoutesProps<CTX>) {
  const checkResult = checkSecValueIncludeOrEqualFirstValue(
    InsteadOutletRoutesPaths,
    getEndPoint(useLocation().pathname)
  );

  return checkResult ? <>{children}</> : <Outlet context={context} />;
}

export default InsteadOutletRoutes;
