import { BriefcaseIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import JobInformation from "../../../components/JobInformation";
import Loading from "../../../components/Loading";
import api from "../../../services/api";
import { IUserResponseDTO } from "../../User/Dashboard";
import { getUpload, userNavigation } from "../../../utils/Utils";

function UserJobPage() {
  const cookies = new Cookies();
  const token = cookies.get('token') as string;

  const [data, setData] = useState<IUserResponseDTO>();
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const { id: jobId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchData(token);
    checkIsApplied();
  }, [token]);

  function fetchData(token: string) {
    try {
      api.get('/users/information', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setData(response.data)
      });
    } catch (error) {
      alert("Company not found");
    }
  }

  function checkIsApplied() {
    try {
      api.get(`/jobs/check/applied/${jobId}`, { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setIsApplied(response.data);
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  function handleJobApply() {
    try {
      api.post("/jobs/apply", {
        job_id: jobId,
      }, { headers: { "Authorization": `Bearer ${token}` } }).then(() => {
        setIsApplied(!isApplied);
      });
    } catch (error) {
      alert("Could not apply!");
    }
  }

  function handleRemoveApplication() {
    try {
      api.delete(`/jobs/application/delete/${jobId}`, { headers: { "Authorization": `Bearer ${token}` } }).then(() => {
        setIsApplied(!isApplied);
      });
    } catch (error) {
      alert("Could not remove!");
    }
  }

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader type="company" logo={getUpload(data.pic, "avatars")} navigation={userNavigation} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-col w-full">
              <JobInformation job_id={jobId} token={token} />
              <div className="w-full flex justify-center m-6">
                {isApplied ?
                  <button onClick={handleRemoveApplication} className="bg-orange-800 flex flex-row text-white/95 rounded-xl font-medium p-4 hover:bg-orange-900" type="button"><XMarkIcon className="h-5 mr-1" /> Remove Application</button>
                  :
                  <button onClick={handleJobApply} className="bg-[#282E4F] flex flex-row text-white/95 rounded-xl font-medium p-4 hover:bg-[#0e101c]" type="button"><BriefcaseIcon className="h-5 mr-1" /> Apply for this job</button>
                }
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

export default UserJobPage;