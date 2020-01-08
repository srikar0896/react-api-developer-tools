import React from "react";
import useDebuggableFetch from "./useDebuggableFetch";
import { List, Avatar, Icon } from "antd";
import ModuleWithDescription from "./ModuleWithDescription";
import moduleData from "./ModulesData.json";

const Repos = props => {
  const { response, error, isLoading } = useDebuggableFetch({
    endpoint: "/repos",
    response: moduleData,
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
      {response.map(item => (
        <ModuleWithDescription module={item} />
      ))}
    </div>
  );
};

export default Repos;
