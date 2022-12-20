import { MagnifyingGlassIcon, BuildingOffice2Icon, BriefcaseIcon, AcademicCapIcon, IdentificationIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { getUpload, userNavigation } from "../../utils/Utils";

export interface IUserResponseDTO {
  email: string;
  name: string;
  birthday: string;
  pic: string | null;
  about: string | null;
  salary_pretension: number | null;
  github: string | null;
  linkedin: string | null;
  phone: string | null;
  headline: string | null;
  country: string | null;
  city: string | null;
  level: string | null;
  resume: string | null;
  languages: string[];
  skills: string[];
  created_at: Date;
}

function UserDashboard() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [data, setData] = useState<IUserResponseDTO>();

  const token = cookies.get('token');

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    try {
      api.get('/users/information', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setData(response.data)
      });
    } catch (error) {
      alert("User not found");
    }
  }, [token]);

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader type="user" logo={getUpload(data.pic, "avatars")} navigation={userNavigation} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-row w-full">
              <div className="w-full flex flex-col p-8">
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                <div className="flex flex-wrap gap-7 flex-col m-8 justify-center">
                  <div className="flex flex-row flex-wrap justify-center gap-7">
                    <Link className="flex flex-col justify-center items-center w-56 h-56 text-lg font-semibold text-gray-700 border rounded-lg shadow hover:bg-gray-700 hover:text-white hover:border-gray-700" to={"/user/MyJobs"}>
                      <BriefcaseIcon className="h-16 mb-2 " />
                      My Jobs
                    </Link>
                    <Link className="flex flex-col justify-center items-center w-56 h-56 text-lg font-semibold text-gray-700 border rounded-lg shadow hover:bg-gray-700 hover:text-white hover:border-gray-700" to={"/user/jobs/search"}>
                      <MagnifyingGlassIcon className="h-16 mb-2 " />
                      Search Jobs
                    </Link>
                  </div>
                  <div className="flex flex-row flex-wrap justify-center gap-7">
                    <Link className="flex flex-col justify-center items-center w-56 h-56 text-lg font-semibold text-gray-700 border rounded-lg shadow hover:bg-gray-700 hover:text-white hover:border-gray-700" to={"/user/information"}>
                      <IdentificationIcon className="h-16 mb-2 " />
                      My Profile
                    </Link>
                    <Link className="flex flex-col justify-center items-center w-56 h-56 text-lg font-semibold text-gray-700 border rounded-lg shadow hover:bg-gray-700 hover:text-white hover:border-gray-700" to={"/user/education"}>
                      <AcademicCapIcon className="h-16 mb-2 " />
                      Education
                    </Link>
                    <Link className="flex flex-col justify-center items-center w-56 h-56 text-lg font-semibold text-gray-700 border rounded-lg shadow hover:bg-gray-700 hover:text-white hover:border-gray-700" to={"/user/experience"}>
                      <BuildingOffice2Icon className="h-16 mb-2 " />
                      Experiences
                    </Link>
                    <Link className="flex flex-col justify-center items-center w-56 h-56 text-lg font-semibold text-gray-700 border rounded-lg shadow hover:bg-gray-700 hover:text-white hover:border-gray-700" to={"/user/certification"}>
                      <DocumentCheckIcon className="h-16 mb-2 " />
                      Certifications
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return <Loading />
  }
}

export default UserDashboard;