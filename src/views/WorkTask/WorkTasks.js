import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import PlayArrow from "@material-ui/icons/PlayArrow";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ReactTable from "components/ReactTable/ReactTable.js";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
// import { dispatchActions } from "utils";
import { getWorkTasksActions } from "services/WorkTasks/actions";
import { STORE_TITLE } from "const";
import { useDispatch } from "react-redux";
import { OverlayLoading } from "components/Commons/OverlayLoading";
import { isNullOrEmpty } from "utils";
import { getValueStore } from "utils";
import { formatTimeDisplay } from "utils/formats";
import ModalWorkTasks from "./Modal";
import { setValueItemToModalActions } from "services/WorkTasks/actions";
import { resetValueModalActions } from "services/WorkTasks/actions";
import { setIndexValueModalActions } from "services/WorkTasks/actions";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);

export default function WorkTasks() {
  const classes = useStyles();
  const [isShowModal, setShowModal] = useState(false);
  const workTasks = getValueStore(STORE_TITLE.WORK_TASKS);
  const dispatch = useDispatch();
  const getWorkTasks = () => dispatch(getWorkTasksActions());
  const setValueModal = (item) => dispatch(setValueItemToModalActions(item));
  const resetValueModal = () => dispatch(resetValueModalActions());
  const resetIndexItemUpdate = (index) =>
    dispatch(setIndexValueModalActions(index));

  useEffect(() => {
    getWorkTasks();
  }, [dispatch]);

  // console.log("workTasks", workTasks);
  const handleClickUpdate = (item) => {
    setShowModal(true);
    setValueModal(item);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetValueModal();
    resetIndexItemUpdate(0);
    getWorkTasks();
  };

  const checkActiveBtnStart = (item) => {
    const pods = item?.pod_sodos ?? [];
    if (!isNullOrEmpty(pods)) {
      const hadImagePods = pods.every((el) => {
        return !isNullOrEmpty(el.sodo_images);
      });
      return hadImagePods;
    } else {
      return false;
    }
  };

  const renderTableData = (tasks) => {
    if (isNullOrEmpty(tasks)) return [];
    return tasks.map((item, key) => {
      const isEnableBtnStart = checkActiveBtnStart(item);
      // console.log("isEnableBtnStart", isEnableBtnStart);
      return {
        id: key,
        title: item?.title ?? "",
        description: item?.description ?? "",
        created_on: formatTimeDisplay(item?.created_on ?? null),
        actions: (
          <div className="actions-right">
            <Button
              justIcon
              round
              color={isEnableBtnStart ? "info" : "secondary"}
              size="sm"
              className={classes.marginRight}
              onClick={() => handleClickUpdate(item)}
              disabled={!isEnableBtnStart}
            >
              <PlayArrow />
            </Button>{" "}
          </div>
        ),
      };
    });
  };

  return (
    <GridContainer>
      <GridItem xs={12}>
        <OverlayLoading active={workTasks.loading}>
          <ModalWorkTasks
            isShowModal={isShowModal}
            handleCloseModal={() => handleCloseModal()}
          />
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Danh sách công việc </h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                columns={[
                  {
                    Header: "File",
                    accessor: "title",
                  },
                  {
                    Header: "Mô tả",
                    accessor: "description",
                  },
                  {
                    Header: "Ngày tạo",
                    accessor: "created_on",
                  },
                  {
                    Header: "Chức năng",
                    accessor: "actions",
                  },
                ]}
                data={renderTableData(workTasks?.res ?? [])}
              />
            </CardBody>
          </Card>
        </OverlayLoading>
      </GridItem>
    </GridContainer>
  );
}
