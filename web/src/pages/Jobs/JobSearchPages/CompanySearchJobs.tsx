import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import JobsSearch from "../../../components/JobsSearch";
import Loading from "../../../components/Loading";
import api from "../../../services/api";
import { companyNavigation, getUpload } from "../../../utils/Utils";
import { ICompanyResponseDTO } from "../../Company/Dashboard";

function CompanySearchJobs() {
  const cookies = new Cookies();
  const token = cookies.get('token') as string;

  const [data, setData] = useState<ICompanyResponseDTO>();

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
        <JobsSearch jobRoute="company" token={token} />
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default CompanySearchJobs;