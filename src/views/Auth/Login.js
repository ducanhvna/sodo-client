import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { useHistory } from "react-router-dom";
// call actions
import { useDispatch } from "react-redux";
import { loginActions } from "services/Auth/actions";
// import { toastSuccess } from "components/ShowAlert";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastComponent } from "components/ShowAlert";
import { toastError } from "components/ShowAlert";
import { MESS_ALERT } from "const";
import { VALIDATE_FIELD_MESS } from "const";

const useStyles = makeStyles(styles);

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  React.useEffect(() => {
    let id = setTimeout(function () {
      setCardAnimation("");
    }, 700);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  });
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const login = (payload) => dispatch(loginActions(payload));

  const handleLogin = (payload) => {
    login(payload)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(() => {
        toastError(MESS_ALERT.LOGIN_FAIL);
      });
  };
  const loginScheme = yup.object().shape({
    email: yup
      .string()
      .required(VALIDATE_FIELD_MESS.REQUIRED)
      .email(VALIDATE_FIELD_MESS.EMAIL),
    password: yup.string().required(VALIDATE_FIELD_MESS.REQUIRED),
  });
  const { register, handleSubmit, control } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(loginScheme),
  });
  return (
    <div className={classes.container}>
      <GridContainer justifyContent="center">
        <GridItem xs={12} sm={6} md={4}>
          <ToastComponent />
          <form onSubmit={handleSubmit(handleLogin)}>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Đăng nhập hệ thống</h4>
              </CardHeader>
              <CardBody>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Email"
                      autoComplete="email"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  id="email"
                  name="email"
                  inputRef={register}
                />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Mật khẩu"
                      autoComplete="password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        type: "password",
                        autoComplete: "off",
                      }}
                    />
                  )}
                  id="password"
                  name="password"
                  inputRef={register}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" simple size="lg" block type="submit">
                  Đăng nhập
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
