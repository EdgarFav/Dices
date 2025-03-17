import {
  EventService,
  LocalStorageEncryptService,
  environment
} from "arsa";
import { Navigate } from "react-router-dom";

export function LoginRoute ({ children }){
  const user = LocalStorageEncryptService.getFromLocalStorage(environment.userTagSession);
  
  if (user) {
    EventService.send(environment.eventKeys.closeDrawer, true);
    return <Navigate to="/home" replace />;
  }

  return children;
};
