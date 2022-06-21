import { useMutation } from '@apollo/client';
import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { DELETE_PROJECT } from '../mutation/projectMutation';
import { ProjectDetailsType } from '../pages/Project';
import { GET_PROJECTS } from '../queries/projectQueries';

const DeleteProjectButton: React.FC<ProjectDetailsType> = (props) => {
    const navigate = useNavigate();
    let id = props.project.id ;

    const [deleteProject] = useMutation(DELETE_PROJECT, {
      variables: { id: id },
      onCompleted: () => navigate('/'),
      refetchQueries: [{ query: GET_PROJECTS }],
    });
    
    const coClickHandler = () => {
      deleteProject()
    }
    return (
      <div className='d-flex mt-5 ms-auto'>
        <button className='btn btn-danger m-2' onClick={coClickHandler}>
          <FaTrash className='icon' /> Delete Project
        </button>
      </div>
    );
}

export default DeleteProjectButton