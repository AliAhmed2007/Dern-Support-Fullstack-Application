import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
// Website Main Layout (Navbar, Content, Footer)
import Layout from "./components/Layout";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminLayout from "./components/adminDashboard/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Request a repair Pages
import RepairLayout from "./components/repairRequest/RepairLayout";
import SelectDevice from "./pages/repairRequest/SelectDevice";
import SelectTopic from "./pages/repairRequest/SelectTopic";
import DeviceData from "./pages/repairRequest/DeviceData";

// User Dashbaord Pages
import UserLayout from "./components/userDashboard/UserLayout";
import Dashboard from "./pages/user/Dashboard";
import RepairRequests from "./pages/user/RepairRequests";
import RepairRequest from "./pages/user/RepairRequest";
import Technicians from "./pages/user/Technicians";
import Technician from "./pages/user/Technician";
import Users from "./pages/user/Users";
import User from "./pages/user/User";
import Bills from "./pages/user/Bills";
import Plans from "./pages/user/Plans";
import Tickets from "./pages/user/Tickets";

// Other Pages
import Landing from "./pages/Landing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";

import NotFound from "./pages/NotFound";
import Success from "./pages/Success";
import ProtectedRoute from "./components/ProtectedRoute";

import { loader as repairRequestsLoader } from "./loaders/repair-requests/repairRequestsLoader";
import { loader as repairRequestLoader } from "./loaders/dashboard/repairRequestLoader";
import { loader as devicesLoader } from "./loaders/repair-requests/devicesLoader";
import { loader as topicsLoader } from "./loaders/repair-requests/topicsLoader";
import { loader as usersLoader } from "./loaders/dashboard/usersLoader";
import { loader as userLoader } from "./loaders/dashboard/userLoader";
import { loader as techniciansLoader } from "./loaders/dashboard/techniciansLoader";
import { loader as technicianLoader } from "./loaders/dashboard/technicianLoader";
import { loader as deviceDataLoader } from "./loaders/repair-requests/deviceDataLoader";
import { action as loginAction } from "./actions/auth/loginAction";
import { action as registerAction } from "./actions/auth/registerAction";
import { action as deviceDataAction } from "./actions/repairRequets/deviceDataAction";
import { action as updateTechnicianAction } from "./actions/technicians/updateTechnicianAction";
import { action as updateUserAction } from "./actions/users/updateUserAction";
import PlansSubscriptions from "./pages/PlansSubscriptions";
import UnAuthorized from "./pages/UnAuthorized";

// All of my routes
const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/register" element={<Register />} action={registerAction} />D
    <Route path='/' element={<Layout />}>
      <Route index element={<Landing />} />
      <Route path="repair-request" element={<ProtectedRoute><RepairLayout /></ProtectedRoute>}>
        <Route index element={<SelectDevice />} loader={devicesLoader} />
        <Route path="topics" element={<SelectTopic />} loader={topicsLoader} />
        <Route path="device-data" element={<DeviceData />} loader={deviceDataLoader} action={deviceDataAction} />
      </Route >
      <Route path="faq" element={<FAQ />} />
      <Route path="contact" element={<Contact />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="plans-subscriptions" element={<PlansSubscriptions />} />
    </Route>
    <Route path="/dashboard" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
      <Route index element={<Dashboard />} />
      <Route path="plan-subscriptions" element={<Plans />} />
      <Route path="repair-requests" element={<RepairRequests />} loader={repairRequestsLoader} />
      <Route path="repair-requests/:id" element={<RepairRequest />} loader={repairRequestLoader} />
      <Route path="tickets" element={<Tickets />} />
      <Route path="user-accounts" element={<Users />} loader={usersLoader} />
      <Route path="user-accounts/:id" element={<User />} loader={userLoader} action={updateUserAction} />
      <Route path="technicians" element={<Technicians />} loader={techniciansLoader} />
      <Route path="technicians/:id" element={<Technician />} loader={technicianLoader} action={updateTechnicianAction} />
      <Route path="bills" element={<Bills />} />
    </Route>

    <Route
      path="/admin"
      element={
        <AdminLayout />
      }
    >
      <Route index element={<AdminDashboard />} />
    </Route>
    <Route index element={<AdminDashboard />} />
    <Route path="/success" element={<Success />} />
    <Route path="/unauthorized-user" element={<UnAuthorized />} />
    <Route path="*" element={<NotFound />} />
  </>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}



export default App