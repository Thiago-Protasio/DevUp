import { BuildingOfficeIcon, AcademicCapIcon, MapPinIcon, ComputerDesktopIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { getDiffDate, getUpload } from "../../utils/Utils";
import Loading from "../Loading";

interface IJobResponse {
  id: string;
  company_id: string;
  title: string;
  description: string;
  technologies: string[];
  level: string;
  location: string | null;
  home_office: boolean;
  open: boolean;
  created_at: Date;
  companies: {
    name: string;
    description: string;
    logo: string,
  };
}

interface IJobInformation {
  job_id: string | undefined;
  token: string;
}

function JobInformation({ job_id, token }: IJobInformation) {
  const [job, setJob] = useState<IJobResponse>();

  useEffect(() => {
    fetchJob();
  }, []);

  function fetchJob() {
    try {
      api.get(`/jobs/${job_id}`, { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setJob(response.data);
      })
    } catch (error) {
      alert("Could not find the job!");
    }
  }

  if (job) {
    return (
      <div className="m-8 flex w-full justify-center flex-col">
        <h1 className="w-full text-3xl font-bold text-gray-800 text-center">{job.title}</h1>
        <div className="flex mt-6 flex-row flex-wrap gap-3 justify-center">
          {job.technologies.map((technology, i) => {
            return (
              <div key={i} className="bg-gray-800 text-white py-2 px-3 rounded-3xl">{technology}</div>
            )
          })}
        </div>
        <div className="w-[75%] flex mx-auto flex-col bg-gray-50 p-6 mt-6 rounded-md">
          <h3 className="font-semibold text-gray-700 text-2xl mb-3 flex flex-row"><BuildingOfficeIcon className="h-6 mr-2" /> {job.companies.name}</h3>
          <div className="flex w-full flex-wrap flex-row ">
            <img src={getUpload(job.companies.logo, "logos")} className="inline h-32 w-32" alt="Company logo" />
            <div className="text-gray-800 font-semibold flex flex-col items-left justify-center ml-5">
              <span className="flex flex-row"><AcademicCapIcon className="h-5 mr-1" /> {job.level}</span>
              <span className="flex flex-row mt-2"><MapPinIcon className="h-5 mr-1" />
                {job.location ? job.location : "Not provided"}
              </span>
              <span className="flex flex-row mt-2"><ComputerDesktopIcon className="h-5 mr-1" />Remote: {job.home_office ? "Yes" : "No"}</span>
              <span className="flex flex-row mt-2 items-center justify-start"><ClockIcon className="h-5 mr-1" />{getDiffDate(job.created_at)}</span>
            </div>
          </div>
        </div>
        <div className="w-[75%] mx-auto mt-8">
          <h3 className="font-bold text-2xl text-gray-700 mb-4">Description</h3>
          <div className="whitespace-pre-line font-medium text-gray-700">{job.description}</div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

export default JobInformation;