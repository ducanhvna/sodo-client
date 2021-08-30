import React, { Fragment } from "react";
import LoadingOverlay from "react-loading-overlay";
import { SyncLoader } from "react-spinners";
import PropTypes from "prop-types";
import "./styles.css";

export function OverlayLoading(props) {
  return (
    <Fragment>
      <LoadingOverlay
        className="LoadingOverlayCenter"
        active={props.active}
        spinner={
          <div>
            <SyncLoader color={"#00BFFF"} size={15} />
          </div>
        }
        text="Đang xử lý dữ liệu ..."
      >
        {props.children}
      </LoadingOverlay>
    </Fragment>
  );
}

const propTypes = {
  children: PropTypes.node,
  props: PropTypes.object,
  active: PropTypes.bool,
};
OverlayLoading.propTypes = propTypes;
