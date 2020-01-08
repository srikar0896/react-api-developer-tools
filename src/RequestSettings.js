import React, { useState } from "react";
import { resolveRequest, rejectRequest } from "./requestService";
import { Input, Button } from "antd";
import JSONInput from "react-json-editor-ajrm";

const { TextArea } = Input;

const RequestSettings = ({ request }) => {
  const [responseData, setResponseData] = useState(
    JSON.stringify(request.requestOptions.response)
  );

  return (
    <div>
      <h4>Custom Response</h4>
      <TextArea
        value={responseData}
        onChange={e => setResponseData(e.target.value)}
      />
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "6px 0" }}
      >
        <Button
          type="dashed"
          size="small"
          style={{
            // border: "1px solid black",
            borderColor: "grey",
            borderRadius: 0,
            fontFamily: '"Source Code Pro", monospace'
          }}
          onClick={() => {
            resolveRequest({
              requestId: request.requestId,
              customResponse: responseData
            });
          }}
        >
          Resolve with the above response
        </Button>
      </div>
    </div>
  );
};

export default RequestSettings;
