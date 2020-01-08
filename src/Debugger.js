import React, { useState, useEffect } from "react";
import requestsService, {
  resolveRequest,
  rejectRequest
} from "./requestService";
import Draggable from "react-draggable";
import { Icon, Row, Typography, Popover } from "antd";
import RequestSettings from "./RequestSettings";

export default props => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const subscription = requestsService.subscriber.subscribe(
      debuggingRequests => {
        setRequests(debuggingRequests);
      }
    );

    return () => subscription.unsubscribe();
  });

  return (
    <Draggable
      // axis="x"
      handle=".debugger__container-drag_handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      // grid={[25, 25]}
      scale={1}
      style={{ position: "fixed" }}
      // onStart={() => console.log("START")}
      // onDrag={() => console.log("DRAG")}
      // onStop={() => console.log("STOP")}
    >
      <div className="debugger__container vertical wrap">
        <div className="debugger__container-drag_handle">API DEBUGGER</div>
        <div style={{ padding: 8 }}>
          {/* <Row
            className="vertically-center"
            style={{ display: "flex", marginBottom: 6 }}
          >
            <div style={{ flex: 1 }}>
              <Typography.Text>Api Debugger</Typography.Text>
            </div>
            <Icon type="drag" className="handle" />
          </Row> */}
          {requests.map(request => (
            <div className="request__item" key={request.requestId}>
              <div>
                <Icon
                  type="check-circle"
                  style={{ color: "green" }}
                  onClick={() =>
                    resolveRequest({ requestId: request.requestId })
                  }
                />
                <Icon
                  type="close-circle"
                  style={{ color: "red", marginLeft: 6 }}
                  onClick={() =>
                    rejectRequest({ requestId: request.requestId })
                  }
                />
              </div>
              <div className="request_status_container">
                <span className="request_name" style={{ flex: 1 }}>
                  {request.requestOptions.endpoint}
                </span>
                <Popover
                  content={<RequestSettings request={request} />}
                  trigger="click"
                  placement="right"
                >
                  <Icon type="setting" />
                </Popover>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );
};
