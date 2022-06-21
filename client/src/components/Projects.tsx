import React from "react";
import { gql, useQuery } from "@apollo/client";
import Spinner from "./Spinner";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";
export interface ProjectType {
    id : string ,
    name: string, 
    description: string, 
    status: string, 
    clientId: string, 
}
export interface ProjectProps {
    project: ProjectType
}
const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;
  return (
    <>
        {data.projects.length > 0 ? (
            <div className='row mt-4'>
            {data.projects.map((project:ProjectType) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ): (
            <p>No projects</p>
        )}
    </>
  );
};

export default Projects;
