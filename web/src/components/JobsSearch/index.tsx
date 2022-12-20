import { BuildingOfficeIcon, AcademicCapIcon, MapPinIcon, ComputerDesktopIcon, ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { getDiffDate } from "../../utils/Utils";

export interface IJobsResponse {
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

interface IJobsSearch {
  token: string;
  jobRoute: string;
}

function JobsSearch({ token, jobRoute }: IJobsSearch) {
  const [jobs, setJobs] = useState<IJobsResponse[]>([]);

  const [jobCursor, setJobCursor] = useState("");
  const [scrollHasMore, setScrollHasMore] = useState(true);
  let query = "";
  let remote = "false";
  let level = "";

  useEffect(() => {
    fetchJobs();
  }, []);

  function fetchJobs() {
    try {
      api.get(`/jobs/search/${jobCursor}?q=${query}&remote=${remote}&level=${level}`, {
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

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const { queryText, formRemote, formLevel } = Object.fromEntries(formData);

    if (queryText) {
      query = queryText.toString().trim().split(" ").join("+");
    } else {
      query = "";
    }

    if (formRemote === "on") {
      remote = "true";
    }

    level = formLevel.toString();

    try {
      const response = await api.get(`/jobs/search?q=${query}&remote=${remote}&level=${level}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.data.length > 0) {
        setJobs(response.data);
        setJobCursor(response.data[response.data.length - 1].id)
      } else {
        setJobs(response.data);
        setScrollHasMore(false);
      }
    } catch (error) {
      alert(`Error: ${error}`)
    }

  }

  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-col w-full">
          <h1 className="m-8 w-full text-2xl font-semibold">Search Jobs</h1>
          <div className="mt-8 flex flex-col justify-center w-full">
            <form onSubmit={handleSearch} className="flex flex-row w-full flex-wrap justify-center items-center m-4">
              <input className="w-2/4 border rounded-lg h-16 p-4 text-xl font-semibold text-gray-700 outline-0" title="queryText" type="text" name="queryText" id="searchInput" placeholder="Ex: Back-end, Front-end" />
              <div className="ml-4 h-full flex flex-row gap-3 items-center mt-4">
                <label htmlFor="formRemote" className="flex items-center cursor-pointer relative mb-4">
                  <input type="checkbox" id="formRemote" name="formRemote" className="sr-only" />
                  <div className="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
                  <span className="ml-2 text-gray-700 text-sm font-semibold">Home Office</span>
                </label>
                <select
                  id="level"
                  title="level"
                  name="formLevel"
                  defaultValue=""
                  className="block w-32 mb-3 ml-2 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Job Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              <button className="flex flex-row p-4 h-fit rounded-xl items-center ml-6 bg-indigo-700 text-white hover:bg-indigo-900" title="submit" type="submit"><MagnifyingGlassIcon className="h-5 mr-1" /> Search</button>
            </form>
            <div className="w-[75%] flex flex-col mx-auto justify-center mb-8">
              <InfiniteScroll
                dataLength={jobs.length}
                next={fetchJobs}
                hasMore={scrollHasMore}
                loader={<h4>Loading...</h4>}
              >
                {jobs ? jobs.map((job) => {
                  return (
                    <Link to={`/${jobRoute}/jobs/${job.id}`} className="bg-[#fefefe] m-2 border rounded-lg shadow text-left p-6 hover:bg-gray-50" type="button" key={job.id}>
                      <div className="flex flex-row justify-between">
                        <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                        <div className="flex flex-row text-md font-semibold text-gray-500"><BuildingOfficeIcon className="h-5 mr-1" /> {job.companies.name}</div>
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
                    </Link>
                  );
                }) : ''}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default JobsSearch;