import { Transition, Dialog } from "@headlessui/react";
import { AcademicCapIcon, MapPinIcon, CalendarIcon, BanknotesIcon, CakeIcon, EnvelopeIcon, DevicePhoneMobileIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, Fragment, useRef } from "react";
import { Cookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";

import { ReactComponent as GithubLogo } from '../../../assets/github.svg';
import { ReactComponent as LinkedinLogo } from '../../../assets/linkedin.svg';
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import Loading from "../../../components/Loading";
import api from "../../../services/api";
import { companyNavigation, getUpload } from "../../../utils/Utils";
import { ICompanyResponseDTO } from "../../Company/Dashboard";

interface ICandidatesResponse {
  id: string;
  jobs_id: string;
  user_id: string;
  created_at: string;
  users: {
    id: string;
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
    certifications: {
      id: string;
      user_id: string;
      name: string;
      organization: string;
      description: string;
      issued_month: number;
      issued_year: number;
      created_at: string;
    }[];
    education: {
      id: string;
      user_id: string;
      school: string;
      degree: string;
      field: string;
      start_month: number;
      start_year: number;
      end_month: number;
      end_year: string;
      grade: string;
      activities: string | null;
      description: string | null;
      created_at: string;
    }[];
    experiences: {
      id: string;
      user_id: string;
      title: string;
      company: string;
      location: string;
      current: boolean;
      start_month: number;
      start_year: number;
      end_month: number | null;
      end_year: number | null;
      created_at: string;
    }[];
    created_at: string;
  }
}

function JobCandidates() {
  const cookies = new Cookies();
  const token = cookies.get('token') as string;

  const [data, setData] = useState<ICompanyResponseDTO>();
  const [candidates, setCandidates] = useState<ICandidatesResponse[]>([]);
  const [clickedCandidate, setClickedCandidate] = useState<ICandidatesResponse>();
  const { id: jobId } = useParams();

  const cancelButtonRef = useRef(null)
  let [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchData(token);
  }, [token]);

  useEffect(() => {
    fetchCandidates();
  });

  function fetchData(token: string) {
    try {
      api.get('/companies/information', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setData(response.data);
      });
    } catch (error) {
      alert("Company not found");
    }
  }

  function fetchCandidates() {
    try {
      api.get(`/jobs/candidates/${jobId}`, { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setCandidates(response.data);
      });
    } catch (error) {
      alert("Could not find candidates!");
    }
  }

  function handleCandidateInfo(candidate: ICandidatesResponse) {
    setClickedCandidate(candidate);
    setIsOpen(true);
  }

  function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', {
      month: 'short',
    });
  }

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader type="company" logo={getUpload(data.logo, "logos")} navigation={companyNavigation} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-col w-full">
              <div className="m-8">
                <h1 className="text-2xl font-semibold text-gray-900">Candidates</h1>
              </div>
              <div className="flex justify-center w-full">
                <div className="w-[75%] flex flex-col justify-center mb-8">
                  {
                    candidates.length > 0
                      ?
                      candidates.map((candidate) => {
                        return (
                          <div onClick={() => handleCandidateInfo(candidate)} key={candidate.id}>
                            <div className="w-full rounded-lg cursor-pointer hover:bg-[#f8f8f8] p-6">
                              <h3 className="text-[1.3rem] text-gray-700 font-semibold mb-2">{candidate.users.name} - {candidate.users.headline}</h3>
                              <div className="flex flex-row w-full">
                                <img className="h-32 w-32 rounded" src={getUpload(candidate.users.pic, "avatars")} alt="candidate avatar" />
                                <div className="flex flex-col justify-center ml-5 text-gray-600 font-semibold text-md">
                                  <div className="flex flex-row">
                                    <div className="flex flex-col gap-2 justify-center">
                                      <span>Level:</span>
                                      <span>Salary:</span>
                                      <span>Birthday:</span>
                                      <span>Location:</span>
                                    </div>
                                    <div className="flex flex-col gap-2 justify-center">
                                      <span className="flex flex-row"><AcademicCapIcon className="h-5 ml-2 mr-1" />{candidate.users.level}</span>
                                      <span className="flex flex-row"><BanknotesIcon className="h-5 ml-2 mr-1" />${candidate.users.salary_pretension}</span>
                                      <span className="flex flex-row"><CalendarIcon className="h-5 ml-2 mr-1" /> {candidate.users.birthday}</span>
                                      <span className="flex flex-row"><MapPinIcon className="h-5 ml-2 mr-1" /> {candidate.users.city} - {candidate.users.country}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap flex-col ml-24 ">
                                  <div>
                                    <h5 className="ml-1 mb-1 text-md font-semibold text-gray-700">Skills:</h5>
                                    <div className="flex flex-row gap-2 overflow-ellipsis">
                                      {candidate.users.skills.map((skill, i) => {
                                        return (
                                          <div key={i} className="text-sm text-gray-700 bg-gray-100 py-2 px-3 font-medium rounded-2xl">{skill}</div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  <div>
                                    <h5 className="ml-1 mt-3 mb-1 text-md font-semibold text-gray-700">Languages:</h5>
                                    <div className="flex flex-row gap-2 overflow-ellipsis">
                                      {candidate.users.languages.map((language, i) => {
                                        return (
                                          <div key={i} className="text-sm text-gray-700 bg-gray-100 py-2 px-3 font-medium rounded-2xl">{language}</div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 m-2 h-[1px]"></div>
                          </div>
                        );
                      })
                      :
                      <div className="text-xl font-semibold text-gray-500">There is no candidates for this job</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </main>
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setIsOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="bg-white w-4/5 p-6 rounded-md shadow">
                    <Dialog.Title className="font-semibold text-lg text-gray-900">Candidate Profile</Dialog.Title>
                    {isOpen && clickedCandidate ?
                      <div className="p-8">
                        <div className="flex flex-row">
                          <img className="h-48 rounded-full" src={getUpload(clickedCandidate.users.pic, "avatars")} alt="candidate avatar" />
                          <div className="ml-6 text-left w-full">
                            <h2 className="text-3xl text-gray-800 font-bold overflow-ellipsis">{clickedCandidate.users.name}</h2>
                            <h3 className="ml-1 text-xl text-gray-700 font-bold">{clickedCandidate.users.headline}</h3>
                            <div className="flex flex-row w-full">
                              <div className=" flex flex-col gap-2 mt-3 font-semibold text-gray-600">
                                <span className="flex flex-row"><AcademicCapIcon className="h-5 ml-2 mr-1" />{clickedCandidate.users.level}</span>
                                <span className="flex flex-row"><BanknotesIcon className="h-5 ml-2 mr-1" />${clickedCandidate.users.salary_pretension}</span>
                                <span className="flex flex-row"><CakeIcon className="h-5 ml-2 mr-1" /> {clickedCandidate.users.birthday}</span>
                                <span className="flex flex-row"><MapPinIcon className="h-5 ml-2 mr-1" /> {clickedCandidate.users.city} - {clickedCandidate.users.country}</span>
                              </div>
                              <div className="flex flex-col w-[75%] mt-3 items-end font-semibold text-gray-600 gap-2">
                                <span className="flex flex-row">{clickedCandidate.users.phone} <DevicePhoneMobileIcon className="h-5 ml-2 mr-1" /></span>
                                <span className="flex flex-row">{clickedCandidate.users.email} <EnvelopeIcon className="h-5 ml-2 mr-1" /></span>
                                {clickedCandidate.users.github ?
                                  <a href={`http://${clickedCandidate.users.github}`} target="_blank" rel="noopener noreferrer" className="flex flex-row hover:text-gray-900 hover:underline">Github Profile <GithubLogo className="h-5 ml-2 mr-1 fill-gray-600" /></a>
                                  : ''}
                                {clickedCandidate.users.linkedin ?
                                  <a href={`http://${clickedCandidate.users.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex flex-row hover:text-gray-900 hover:underline">Linkedin Profile <LinkedinLogo className="h-5 ml-2 mr-1 fill-gray-600" /></a>
                                  : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col text-left mt-10 ml-2 font-bold">
                          <h3 className="text-2xl text-gray-800">About</h3>
                          <div className="text-gray-800 font-medium whitespace-pre-line w-4/5">{clickedCandidate.users.about}</div>
                        </div>
                        <div className="flex flex-col text-left mt-10 ml-2 font-bold">
                          <h3 className="text-2xl text-gray-800">Skills</h3>
                          <div className="flex flex-row gap-2 mt-3">
                            {clickedCandidate.users.skills.length > 0 ?
                              clickedCandidate.users.skills.map((skill, i) => {
                                return (
                                  <div key={i} className="text-sm text-gray-700 bg-gray-100 py-2 px-3 font-medium rounded-2xl">{skill}</div>
                                )
                              })
                              : <div className="font-semibold text-gray-500 text-lg">There is no skill added</div>}
                          </div>
                        </div>
                        <div className="flex flex-col text-left mt-6 ml-2 font-bold">
                          <h3 className="text-2xl text-gray-800">Languages</h3>
                          <div className="flex flex-row gap-2 mt-3">
                            {clickedCandidate.users.languages.length > 0 ?
                              clickedCandidate.users.languages.map((language, i) => {
                                return (
                                  <div key={i} className="text-sm text-gray-700 bg-gray-100 py-2 px-3 font-medium rounded-2xl">{language}</div>
                                )
                              })
                              : <div className="font-semibold text-gray-500 text-lg">There is no language added</div>}
                          </div>
                        </div>
                        <div className="flex flex-col text-left mt-6 ml-2 ">
                          <h3 className="text-2xl text-gray-800 font-bold mb-4">Education</h3>
                          {clickedCandidate.users.education ? clickedCandidate.users.education.map((education) => {
                            return (
                              <div key={education.id} className="flex flex-row">
                                <div className="w-4/5 p-4 mb-4 shadow rounded-lg bg-[#fdfdfd]">
                                  <h4 className="font-semibold text-lg text-gray-800">{education.school}</h4>
                                  <div className="flex justify-between">
                                    <span className="font-semibold text-md text-gray-600">{education.field}</span>
                                    <span className="text-sm font-semibold text-gray-800">{education.degree}</span>
                                  </div>
                                  <div className="text-sm font-semibold text-gray-800">Grade: {education.grade}</div>
                                  <div className="font-semibold text-sm text-gray-800">{`${toMonthName(education.start_month)} ${education.start_year} - ${toMonthName(education.end_month)} ${education.end_year}`}</div>
                                  {education.activities ?
                                    <div className="mt-2">
                                      <h5 className="font-semibold text-gray-800">Activities:</h5>
                                      <div>{education.activities}</div>
                                    </div>
                                    : ''
                                  }
                                  {education.description ?
                                    <div className="mt-2">
                                      <h5 className="font-semibold text-gray-800">Description:</h5>
                                      <div>{education.description}</div>
                                    </div>
                                    : ''
                                  }
                                </div>
                              </div>
                            )
                          }) :
                            <div className="text-xl text-gray-500 font-semibold">No education added</div>
                          }
                        </div>
                        <div className="flex flex-col text-left mt-6 ml-2 ">
                          <h3 className="text-2xl text-gray-800 font-bold mb-4">Certifications</h3>
                          {clickedCandidate.users.certifications ? clickedCandidate.users.certifications.map((certification) => {
                            return (
                              <div key={certification.id} className="flex flex-row">
                                <div className="w-4/5 p-4 mb-4 shadow rounded-lg bg-[#fdfdfd]">
                                  <h4 className="font-semibold text-lg text-gray-800">{certification.name}</h4>
                                  <div className="font-semibold text-md text-gray-600">{certification.organization}</div>
                                  <div className="font-semibold text-sm text-gray-800">{`${toMonthName(certification.issued_month)} ${certification.issued_year} `}</div>
                                  {certification.description ?
                                    <div className="mt-2">
                                      <h5 className="font-semibold text-gray-800">Description:</h5>
                                      <div>{certification.description}</div>
                                    </div>
                                    : ''
                                  }
                                </div>
                              </div>
                            )
                          }) :
                            <div className="text-xl text-gray-500 font-semibold">No certification added</div>
                          }
                        </div>
                        <div className="flex flex-col text-left mt-6 ml-2 ">
                          <h3 className="text-2xl text-gray-800 font-bold mb-4">Experiences</h3>
                          {clickedCandidate.users.experiences ? clickedCandidate.users.experiences.map((experience) => {
                            return (
                              <div key={experience.id} className="flex flex-row">
                                <div className="w-4/5 p-4 mb-4 shadow rounded-lg bg-[#fdfdfd]">
                                  <h4 className="font-semibold text-lg text-gray-800">{experience.title}</h4>
                                  <div className="font-semibold text-md text-gray-600">{experience.company}</div>
                                  <div className="font-semibold text-sm text-gray-800">{experience.location}</div>
                                  <div className="font-semibold text-sm text-gray-800">{`${toMonthName(experience.start_month)} ${experience.start_year} - ${!experience.current ? `${toMonthName(experience.end_month!)} ${experience.end_year}` : 'Current'}`}</div>
                                </div>
                              </div>
                            )
                          }) :
                            <div className="text-xl text-gray-500 font-semibold">No experience added</div>
                          }
                        </div>
                        {clickedCandidate.users.resume ?
                          <div className="flex flex-col text-left mt-6 ml-2 ">
                            <h3 className="text-2xl text-gray-800 font-bold mb-4">Resume</h3>
                            <a className="flex flex-row w-40 hover:bg-gray-50 rounded-lg p-8 border text-gray-900 font-semibold" href={getUpload(clickedCandidate.users.resume, "resumes")} target="_blank" rel="noopener noreferrer">
                              <DocumentTextIcon className="h-5 mr-1 text-red-600" />
                              Resume
                            </a>
                          </div>
                          : ''}
                      </div>
                      : ''}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    );
  } else {
    return <Loading />
  }
}

export default JobCandidates;