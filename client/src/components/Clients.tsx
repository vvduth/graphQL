import React from "react";
import { gql, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";
import AddClientModel from "./AddClientModel";

export interface ClientType {
    id : string,
    name: string,
    phone: string, 
    email: string
}
export interface ClientList {
    clients:ClientType[]
}
export type ClientArray = ClientType[] | null;

export interface ClientProps {
    client: ClientType ;
}



const Client = () => {
  const {loading, error, data} =  useQuery(GET_CLIENTS);
  if (loading) return (<Spinner/>)
  if (error) return <p>Something went wrong</p>
  return (
    <>
        {!loading && !error && (
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.clients.map((client : ClientType) => (
                            <ClientRow key={client.id} client={client} />
                        ))
                    }
                </tbody>
            </table>
        )} 
    
    </>
    
  );
};

export default Client;
