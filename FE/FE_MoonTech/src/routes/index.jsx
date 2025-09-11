import { Route, Routes } from "react-router";

function UserRouter() {
  return <Routes></Routes>;
}

export function AppRouter() {
  return (
    <>
      <Route path="/*" element={<UserRouter />} />
    </>
  );
}
