import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import { Grid, Paper, TextField } from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import {
  Magnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION,
} from "@africasokoni/react-image-magnifiers";
import { getValueStore } from "utils";
import { STORE_TITLE } from "const";
import { useDispatch } from "react-redux";
import { setIndexValueModalActions } from "services/WorkTasks/actions";
import { useForm, Controller } from "react-hook-form";
import { updateFieldValueActions } from "services/WorkTasks/actions";
import { toastError, toastSuccess } from "components/ShowAlert";
import { ToastComponent } from "components/ShowAlert";
import { isNullOrEmpty } from "utils";
import { MESS_ALERT } from "const";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  oppositeContent: {
    // TODO: adjust this value accordingly
    flex: 0.2,
  },
  oppositeContentChild: {
    flex: 0.3,
  },
  root: {
    display: "block",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
    // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
  resize: {
    fontSize: 15,
  },
  input: {
    height: 40,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalWorkTasks(props) {
  const dispatch = useDispatch();
  const setIndex = (index) => dispatch(setIndexValueModalActions(index));
  const updateFieldValue = (id, payload) =>
    dispatch(updateFieldValueActions(id, payload));
  const { register, control, getValues } = useForm();

  const workTasks = getValueStore(STORE_TITLE.WORK_TASKS);
  const item = workTasks.itemUpdate ?? {};
  const index = workTasks.indexItem ?? 0;
  const classes = useStyles();
  const pods = item?.pod_sodos ?? [];
  const podsCurrent = pods ? pods[index] : {};
  const podImages = podsCurrent ? podsCurrent.sodo_images : [];
  const podFormValues = podsCurrent ? podsCurrent.sodo_values : [];
  const isDisableBtnNext = pods.length - 1 === index;
  const isDisableBtnPrev = index === 0;

  // const getDefaultFormValue = () => {
  //   let obj = {};
  //   podFormValues.forEach((el) => {
  //     const type = el.type;
  //     obj[`${type}-${index}`] = "";
  //   });
  //   return obj;
  // };

  const parseFieldFormData = () => {
    if (isNullOrEmpty(podFormValues)) return [];
    const results = podFormValues.map((el) => {
      const type = el.type;
      return { ...el, [type]: el.text };
    });
    return results;
  };

  const handleCloseModal = () => {
    props.handleCloseModal();
  };

  const handleBlurField = (item) => {
    const formData = getValues();
    // console.log("blur", formData, item);
    const type = `${item.type}-${item.id}`;
    const dataChanged = formData[type];
    const itemUpdate = { ...item, text: dataChanged };
    // console.log("updated", itemUpdate);
    if (!isNullOrEmpty(dataChanged)) {
      updateFieldValue(item.id, itemUpdate)
        .then(() => {
          toastSuccess(MESS_ALERT.UPDATE_WORK_TASKS_SUCCESS);
        })
        .catch(() => {
          toastError(MESS_ALERT.UPDATE_WORK_TASKS_FAIL);
        });
    }
  };

  const fields = parseFieldFormData();
  return (
    <div>
      <ToastComponent />
      <Dialog
        fullScreen
        open={props.isShowModal}
        onClose={() => handleCloseModal()}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => props.handleCloseModal()}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {item.title}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => setIndex(index - 1)}
              disabled={isDisableBtnPrev}
            >
              PREV
            </Button>
            <Button
              autoFocus
              color="inherit"
              onClick={() => setIndex(index + 1)}
              disabled={isDisableBtnNext}
            >
              NEXT
            </Button>
          </Toolbar>
        </AppBar>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={8} md={9} lg={9}>
            <Paper
              className={classes.paper}
              style={{ height: "94vh", overflow: "scroll" }}
            >
              <div className={classes.root}>
                {podImages.map((el, i) => {
                  return (
                    <Magnifier
                      imageSrc={el?.link}
                      imageAlt="Image"
                      // largeImageSrc="./large-image.jpg" // Optional
                      mouseActivation={MOUSE_ACTIVATION.CLICK} // Optional
                      touchActivation={TOUCH_ACTIVATION.TAP} // Optional
                      key={i}
                    />
                  );
                })}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={4} md={3} lg={3}>
            <Paper
              className={classes.paper}
              style={{ height: "94vh", overflow: "scroll" }}
              //   alignContent="flex-start"
            >
              <Timeline align="left">
                {fields.map((el, i) => {
                  return (
                    <TimelineItem key={i}>
                      <TimelineOppositeContent
                        className={classes.oppositeContent}
                        color="textSecondary"
                      >
                        {i === 0 ? `File ${index + 1}` : null}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color="primary"></TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <p>{el.display_text}</p>
                        <Controller
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              variant="outlined"
                              onBlur={() => handleBlurField(el)}
                              // key={el.id}
                            />
                          )}
                          id={`${el.type}-${el.id}`}
                          name={`${el.type}-${el.id}`}
                          inputRef={register}
                          key={el.id}
                          defaultValue={el.text}
                        />
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </Timeline>
            </Paper>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

ModalWorkTasks.propTypes = {
  props: PropTypes.any,
  isShowModal: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  item: PropTypes.any,
};
