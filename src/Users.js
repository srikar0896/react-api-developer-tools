import React from "react";
import useDebuggableFetch from "./useDebuggableFetch";
import { List, Avatar, Card, Icon, Skeleton } from "antd";
import ModuleWithDescription from "./ModuleWithDescription";
import User from "./User";

import moduleData from "./ModulesData.json";

const { Meta } = Card;

const Users = props => {
  const { response, error, isLoading } = useDebuggableFetch({
    endpoint: "/authors",
    response: [
      "Sebastian Markbåge",
      "Andrew Clark",
      "Dan Abramov",
      "Andrew Loe",
      "Brandon Dail",
      "Brian Dolhansky"
    ],
    error: {
      status: 401,
      errorMessage: "Not Authorized"
    }
  });

  if (error) return "Error";
  if (isLoading)
    return (
      <Icon type="loading" style={{ fontSize: 24, color: "#108ee9" }} spin />
    );
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {response.map(user => (
        <User user={user} />
      ))}
    </div>
  );
};

export default Users;
