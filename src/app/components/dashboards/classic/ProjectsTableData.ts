interface PerformerType {
  id: string;
  imgsrc: string;
  name: string;
  post: string;
  pname: string;
  status: string;
  budget: string;
}

const ProjectsTableData: PerformerType[] = [
  {
    id: "1",
    imgsrc: "/images/profile/user-1.jpg",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    status: "Low",
    budget: "3.9",
  },
  {
    id: "2",
    imgsrc: "/images/profile/user-2.jpg",
    name: "John Deo",
    post: "Web Developer",
    pname: "Flexy Admin",
    status: "Medium",
    budget: "23.9",
  },
  {
    id: "3",
    imgsrc: "/images/profile/user-3.jpg",
    name: "Nirav Joshi",
    post: "Web Manager",
    pname: "Material Pro",
    status: "High",
    budget: "12.9",
  },
  {
    id: "4",
    imgsrc: "/images/profile/user-4.jpg",
    name: "Yuvraj Sheth",
    post: "Project Manager",
    pname: "Xtreme Admin",
    status: "Low",
    budget: "10.9",
  },
  {
    id: "5",
    imgsrc: "/images/profile/user-5.jpg",
    name: "Micheal Doe",
    post: "Content Writer",
    pname: "Helping Hands",
    status: "High",
    budget: "12.9",
  },
];

export default ProjectsTableData;
