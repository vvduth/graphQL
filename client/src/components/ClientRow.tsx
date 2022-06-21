import React from 'react'
import {FaTrash} from 'react-icons/fa'
import { ClientType, clientProps } from './Client';
const ClientRow: React.FC<clientProps> = ({client}) => {
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm'>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
  
}

export default ClientRow