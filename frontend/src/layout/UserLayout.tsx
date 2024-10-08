import { Outlet } from "react-router-dom"
import  NavBar  from "./NavBar"
import  SideBar  from "./SideBar"

export const UserLayout = () => {

  return (
    <div className="w-[100vw] h-[100vh] relative">
      <NavBar />
      <div className="flex">
        { <SideBar />}
        <Outlet />
      </div>
    </div>
  )
}