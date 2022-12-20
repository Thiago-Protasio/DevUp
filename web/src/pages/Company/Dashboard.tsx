import { BriefcaseIcon, BuildingOffice2Icon, MagnifyingGlassIcon, NewspaperIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { companyNavigation, getUpload } from "../../utils/Utils";

export interface ICompanyResponseDTO {
  email: string;
  description: string;
  employees_num: number | null;
  linkedin: string | null;
  logo: string | null;
  name: string;
  web_site: string | null;
  created_at: Date;
}

function CompanyDashboard() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [data, setData] = useState<ICompanyResponseDTO>();

  const token = cookies.get('token');

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    try {
      api.get('/companies/information', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setData(response.data)
      });
    } catch (error) {
      alert("Company not found");
    }
  }, [token]);

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader type="company" logo={getUpload(data.logo, "logos")} navigation={companyNavigation} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-row w-full">
              <div className="w-full flex flex-col p-8">
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                <div className="flex flex-wrap gap-7 flex-col m-8 justify-center">
                  <div className="flex flex-row flex-wrap justify-center gap-7">
                    <Link className="flex flex-col justify-center items-center w-56 h-56 text-lg font-semibold text-gray-700 border rounded-lg shadow hover:bg-gray-700 hover:text-white hover:border-gray-700" to={"/company/jobs/create"}>
                      <NewspaperIcon className="h-16 mb-2" />
                      Post a new Job
                    </Link>
                    <Link className="flex flex-col justify-center items-center w-56 h-56 text-lg font-semibold text-gray-700 border rounded-lg shadow hover:bg-gray-700 hover:text-white hover:border-gray-700" to={"/company/jobs/search"}>
                      <MagnifyingGlassIcon className="h-16 mb-2 " />
                      Search Jobs
                    </Link>
                  </div>
                  <div className="flex flex-row flex-wrap justify-center gap-7">
                    <Link className="flex flex-col justify-center items-center w-56 h-56 text-lg font-semibold text-gray-700 border rounded-lg shadow hover:bg-gray-700 hover:text-white hover:border-gray-700" to={"/company/information"}>
                      <BuildingOffice2Icon className="h-16 mb-2 " />
                      <span>Company</span>
                      <span>Information</span>
                    </Link>
                    <Link className="flex flex-col justify-center items-center w-56 h-56 text-lg font-semibold text-gray-700 border rounded-lg shadow hover:bg-gray-700 hover:text-white hover:border-gray-700" to={"/company/MyJobs"}>
                      <BriefcaseIcon className="h-16 mb-2 " />
                      My Jobs
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
    return <Loading />;
  }

}

export default CompanyDashboard;