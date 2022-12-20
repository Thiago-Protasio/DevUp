import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import JobInformation from "../../../components/JobInformation";
import Loading from "../../../components/Loading";
import api from "../../../services/api";
import { companyNavigation, getUpload } from "../../../utils/Utils";
import { ICompanyResponseDTO } from "../../Company/Dashboard";

function CompanyJobPage() {
  const cookies = new Cookies();
  const token = cookies.get('token') as string;

  const [data, setData] = useState<ICompanyResponseDTO>();
  const { id: jobId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchData(token);
  }, [token]);

  function fetchData(token: string) {
    try {
      api.get('/companies/information', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setData(response.data)
      });
    } catch (error) {
      alert("Company not found");
    }
  }

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader type="company" logo={getUpload(data.logo, "logos")} navigation={companyNavigation} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-col w-full">
              <JobInformation job_id={jobId} token={token} />
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return <Loading />
  }
}

export default CompanyJobPage;