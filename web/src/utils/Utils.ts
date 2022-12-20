
export const userNavigation = [
  { name: 'Dashboard', href: '/user/dashboard' },
  { name: 'My Jobs', href: '/user/MyJobs' },
  { name: 'Certification', href: '/user/certification' },
  { name: 'Education', href: '/user/education' },
  { name: 'Experience', href: '/user/experience' },
  { name: 'My Profile', href: '/user/information' },
]

export const companyNavigation = [
  { name: 'Dashboard', href: '/company/dashboard' },
  { name: 'My Jobs', href: '/company/MyJobs' },
  { name: 'My Company', href: '/company/information' },
]

export function getUpload(filename: any, folder: string) {
  const file = filename ? require(`../../../server/uploads/${folder}/${filename}`) : require('../assets/user.png');
  return file;
}

export function getDiffDate(created_at: Date) {
  const date1 = new Date(created_at).getTime();
  const date2 = new Date().getTime();
  const diffDays = Math.floor((date2 - date1) / (1000 * 3600 * 24));
  if (diffDays === 0) {
    return "Posted Today";
  } else {
    return `Posted ${diffDays} day(s) ago`;
  }
}