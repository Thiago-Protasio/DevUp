import { AcademicCapIcon, ClockIcon, ComputerDesktopIcon, LockClosedIcon, LockOpenIcon, MapPinIcon, PlusIcon, TrashIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, FormEvent } from "react";
import { Cookies } from "react-cookie";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import { IJobsResponse } from "../../components/JobsSearch";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { companyNavigation, getDiffDate, getUpload } from "../../utils/Utils";
import { ICompanyResponseDTO } from "./Dashboard";

function CompanyJobs() {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const [data, setData] = useState<ICompanyResponseDTO>();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<IJobsResponse[]>([]);

  const [jobCursor, setJobCursor] = useState("");
  const [scrollHasMore, setScrollHasMore] = useState(true);

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

  useEffect(() => {
    fetchJobs();
  }, []);

  function fetchJobs() {
    try {
      api.get(`/jobs/company/${jobCursor}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then(response => {
        if (response.data.length > 0) {
          setJobs(jobs.concat(response.data));
          setJobCursor(response.data[response.data.length - 1].id)
        } else {
          setScrollHasMore(false);
        }
      })
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  function changeJobOpen(job_id: string, index: number, e: FormEvent) {
    e.stopPropagation()
    try {
      api.patch(`/jobs/open/${job_id}`, {}, { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        const newArray = [...jobs];
        newArray[index] = response.data

        setJobs(newArray);
      })
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  function handleJobDelete(job_id: string, index: number, e: FormEvent) {
    e.stopPropagation();
    try {
      api.delete(`/jobs/delete/${job_id}`, { headers: { "Authorization": `Bearer ${token}` } }).then(() => {
        const newArray = [...jobs];
        newArray.splice(index, 1);

        setJobs(newArray);
      })
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  function handleCandidates(job_id: string, e: FormEvent) {
    e.stopPropagation();

    navigate(`/company/jobs/${job_id}/candidates`);
  }

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader type="company" logo={getUpload(data.logo, "logos")} navigation={companyNavigation} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-col w-full">
              <div className="m-8 flex flex-row justify-between">
                <h1 className="text-2xl font-semibold">My Jobs</h1>
                <Link className="flex flex-row py-3 px-4 text-sm rounded-3xl text-white bg-[#1958c2] hover:bg-[#12408f]" to="/company/jobs/create" type="button">
                  <PlusIcon className="h-5 mr-1" /> Create Job
                </Link>
              </div>
              <div className="mt-8 flex justify-center w-full">
                <div className="w-[75%] flex flex-col justify-center mb-8">
                  <InfiniteScroll
                    dataLength={jobs.length}
                    next={fetchJobs}
                    hasMore={scrollHasMore}
                    loader={<h3>Loading...</h3>}
                  >
                    {jobs ? jobs.map((job, i) => {
                      return (
                        <div key={job.id}>
                          <div onClick={() => { navigate(`/company/jobs/${job.id}`) }} className="m-2 cursor-pointer rounded-lg text-left p-6 hover:bg-[#f5f5f5]">
                            <div className="flex flex-row justify-between">
                              <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                              <div className="flex flex-row gap-2">
                                <button type="button" onClick={(e) => handleCandidates(job.id, e)} className="flex flex-row bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700" title="candidates" about="candidates"><UserGroupIcon className="h-5 mr-1" />Candidates</button>
                                {job.open ?
                                  <button onClick={(e) => changeJobOpen(job.id, i, e)} type="button" title="opened" className="flex flex-row p-2 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white">Open<LockOpenIcon className="h-5 ml-1" /></button>
                                  :
                                  <button onClick={(e) => changeJobOpen(job.id, i, e)} type="button" title="closed" className="flex flex-row p-2 text-sm rounded-md bg-orange-700 hover:bg-orange-700 text-white">Closed<LockClosedIcon className="h-5 ml-1" /></button>
                                }
                                <button type="button" onClick={(e) => handleJobDelete(job.id, i, e)} className="bg-red-600 text-white p-2 rounded-md hover:bg-red-800" title="delete" about="delete"><TrashIcon className="h-5" /></button>
                              </div>
                            </div>
                            <div className="flex w-full mt-2 flex-row gap-4 font-semibold text-md text-gray-700">
                              <span className="flex flex-row"><AcademicCapIcon className="h-5 mr-1" /> {job.level}</span>
                              {job.location ?
                                <span className="flex flex-row"><MapPinIcon className="h-5 mr-1" />{job.location}</span>
                                : ''}
                              {job.home_office ?
                                <span className="flex flex-row"><ComputerDesktopIcon className="h-5 mr-1" />Remote</span>
                                : ''}
                            </div>
                            <div className="flex flex-row flex-wrap gap-3 mt-3">
                              {job.technologies.map((technology, i) => {
                                return (
                                  <div key={i} className="w-fit p-3 text-sm font-semibold text-gray-800 bg-[#f5f5f5] rounded-3xl">{technology}</div>
                                );
                              })}
                            </div>
                            <div className="textEllipsis max-h-28 text-gray-600 mt-3 w-4/5 overflow-hidden">
                              {job.description}
                            </div>
                            <div>
                              <div className="flex flex-row text-sm font-semibold text-gray-700 items-center justify-end"><ClockIcon className="h-5 mr-1" />{getDiffDate(job.created_at)}</div>
                            </div>
                          </div>
                          <div className="h-[1px] bg-gray-200"></div>
                        </div>
                      );
                    }) :
                      <div className="text-xl text-gray-400 font-semibold">Add a new job...</div>
                    }
                  </InfiniteScroll>
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

export default CompanyJobs;