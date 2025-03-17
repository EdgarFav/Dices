import { Navigate } from "react-router-dom";

import { EventService, LocalStorageEncryptService, environment } from 'arsa';

export const ProtectedRoute = ({ children }) => {
  const user = LocalStorageEncryptService.getFromLocalStorage(environment.userTagSession);
  
  if (!user) {
    EventService.send(environment.eventKeys.closeDrawer, true);
    return <Navigate to="/login" replace />;
  }

  return children;
};
