import React from "react";
import Truncate from "react-truncate";
import { Avatar, Icon } from "antd";

const ModuleWithDescription = ({ user }) => {
  return (
    <div
      style={{
        display: "flex",
        background: "white",
        padding: "10px 10px 10px 18px",
        alignItems: "center",
        width: 320,
        margin: 8,
        borderRadius: 20
      }}
    >
      <div style={{ marginRight: 8, display: "flex" }}>
        <Avatar style={{ backgroundColor: "#f56a00" }}>
          {user.charAt(0).toUpperCase()}
        </Avatar>
      </div>
      <div style={{ paddingTop: 12, fontSize: 16, flex: 1 }}>
        <p className="module-description">{user}</p>
      </div>
      <div style={{ margin: "0 10px" }}>
        <Icon type="select" />
      </div>
    </div>
  );
};

export default ModuleWithDescription;
