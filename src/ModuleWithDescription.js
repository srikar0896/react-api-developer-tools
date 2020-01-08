import React from "react";
import Truncate from "react-truncate";
import { Tag } from "antd";

const ModuleWithDescription = ({ module }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "white",
        padding: "18px 16px 18px 18px",
        width: 320,
        margin: 8,
        borderRadius: 20
      }}
    >
      <div style={{ marginBottom: 8, display: "flex" }}>
        <a className="module-title">{module.moduleName}</a>
      </div>
      <div>
        <p className="module-description">
          {module.description.substr(0, 190)}
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {module.labels.map(label => (
          <Tag color="#108ee9" style={{ marginBottom: 6 }}>
            {label}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default ModuleWithDescription;
