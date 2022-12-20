import { AcademicCapIcon, MapPinIcon, ComputerDesktopIcon, ClockIcon, MagnifyingGlassIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { getDiffDate, getUpload, userNavigation } from "../../utils/Utils";
import { IUserResponseDTO } from "./Dashboard";

interface IUserJobsResponse {
  id: string;
  jobs_id: string;
  user_id: string;
  created_at: string;
  jobs: {
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
    };
  }
}

function UserJobs() {
  const cookies = new Cookies();
  const token = cookies.get('token') as string;

  const [data, setData] = useState<IUserResponseDTO>();
  const [jobs, setJobs] = useState<IUserJobsResponse[]>([]);

  const [jobCursor, setJobCursor] = useState("");
  const [scrollHasMore, setScrollHasMore] = useState(true);

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
      api.get('/users/information', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setData(response.data)
      });
    } catch (error) {
      alert("User not found");
    }
  }

  function fetchJobs() {
    try {
      api.get(`/jobs/user/${jobCursor}`, {
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

  useEffect(() => {
    fetchJobs();
  }, []);

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader logo={getUpload(data.pic, "avatars")} navigation={userNavigation} type="user" />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-col w-full">
              <div className="m-8 flex flex-row justify-between">
                <h1 className="text-2xl font-semibold items-center">My Jobs</h1>
                <Link className="flex flex-row py-3 px-4 text-sm rounded-xl text-white bg-gray-700 hover:bg-gray-800" to="/user/jobs/search" type="button">
                  <MagnifyingGlassIcon className="h-5 mr-1" /> Search Jobs
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
                    {jobs ? jobs.map((application, i) => {
                      return (
                        <div key={application.jobs.id}>
                          <div onClick={() => { navigate(`/user/jobs/${application.jobs.id}`) }} className="m-2 cursor-pointer rounded-lg text-left p-6 hover:bg-[#f5f5f5]">
                            <div className="flex flex-row justify-between">
                              <h3 className="text-lg font-bold text-ellipsis text-gray-800">{application.jobs.title}</h3>
                              <div className="flex flex-row text-md font-semibold text-gray-500"><BuildingOfficeIcon className="h-5 mr-1" /> {application.jobs.companies.name}</div>
                            </div>
                            <div className="flex w-full mt-2 flex-row gap-4 font-semibold text-md text-gray-700">
                              <span className="flex flex-row"><AcademicCapIcon className="h-5 mr-1" /> {application.jobs.level}</span>
                              {application.jobs.location ?
                                <span className="flex flex-row"><MapPinIcon className="h-5 mr-1" />{application.jobs.location}</span>
                                : ''}
                              {application.jobs.home_office ?
                                <span className="flex flex-row"><ComputerDesktopIcon className="h-5 mr-1" />Remote</span>
                                : ''}
                            </div>
                            <div className="flex flex-row flex-wrap gap-3 mt-3">
                              {application.jobs.technologies.map((technology, i) => {
                                return (
                                  <div key={i} className="w-fit p-3 text-sm font-semibold text-gray-800 bg-[#f5f5f5] rounded-3xl">{technology}</div>
                                );
                              })}
                            </div>
                            <div className="textEllipsis max-h-28 text-gray-600 mt-3 w-4/5 overflow-hidden">
                              {application.jobs.description}
                            </div>
                            <div>
                              <div className="flex flex-row text-sm font-semibold text-gray-700 items-center justify-end"><ClockIcon className="h-5 mr-1" />{getDiffDate(application.jobs.created_at)}</div>
                            </div>
                          </div>
                          <div className="h-[1px] bg-gray-200"></div>
                        </div>
                      );
                    }) :
                      <div className="text-xl text-gray-400 font-semibold">Apply for a job...</div>
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

export default UserJobs;