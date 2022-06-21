import React from "react";
import { FaTrash } from "react-icons/fa";
import { ClientProps, ClientType, ClientArray } from "./Client";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutation/mutation";
import { GET_CLIENTS } from "../queries/clientQueries";

type ClientResult = ClientType[] | any 

const ClientRow: React.FC<ClientProps> = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    //refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery<ClientResult>({ query: GET_CLIENTS });
      console.log(clients);
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client:ClientType) => client.id !== deleteClient.id),
          //clients: clients
        },
      });
    },
  });

  const onClickHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    deleteClient();
  };
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={onClickHandler}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
