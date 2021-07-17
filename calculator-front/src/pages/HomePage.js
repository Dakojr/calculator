import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  Popover,
} from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    width: theme.spacing(11),
  },
  buttonEqual: {
    backgroundColor: "#4285F4",
    color: theme.palette.primary.main,
    borderColor: "#4285F4",
    "&:hover": {
      backgroundColor: "#4285F4",
      color: theme.palette.primary.main,
    },
  },
  buttonIcon: {
    padding: 0,
  },
  inputBox: {
    height: theme.spacing(9),
    border: "1px solid #dadce0",
    borderRadius: theme.spacing(1),
    padding: "10px 14px 0 10px",
  },
  popoverBox: {
    width: "448px",
    padding: theme.spacing(2),
  },
  popoverButton: {
    border: "1px solid #DFE1E5",
    borderRadius: "4px",
    color: "#1a73e8",
  },
}));

export const HomePage = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [lastCalcul, setLastCalcul] = useState("");
  const [valueString, setValueString] = useState("0");
  const [isRequested, setIsRequested] = useState(false);
  const [lastCalculArray, setLastCalculArray] = useState([]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClickAnchor = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const CE = () => {
    setValueString("0");
    return;
  };

  // POPOVER

  const setLastCalculPopover = (param) => {
    setLastCalcul("Ans = " + valueString);
    setValueString(param);
    setAnchorEl(null);
    return;
  };

  const RenderLastCalculs = () => {
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box className={classes.popoverBox}>
          <IconButton
            aria-describedby={id}
            onClick={() => setAnchorEl(null)}
            className={classes.buttonIcon}
          >
            <Autorenew />
          </IconButton>
          {lastCalculArray.map((data, i) => (
            <Box display="flex" alignItems="center" mt={2} key={i}>
              <Button
                className={classes.popoverButton}
                color="primary"
                onClick={() => setLastCalculPopover(data.lastValueStringTmp)}
              >
                {data.lastValueStringTmp}
              </Button>
              <Typography variant="body1">=</Typography>
              <Button
                className={classes.popoverButton}
                color="primary"
                onClick={() => setLastCalculPopover(data.lastAnswerTmp)}
              >
                {data.lastAnswerTmp}
              </Button>
            </Box>
          ))}
        </Box>
      </Popover>
    );
  };

  // AXIOS REQUEST

  const RequestCalculator = (param) => {
    var data = JSON.stringify({
      value: param,
    });

    var config = {
      method: "post",
      url: "http://localhost:8000/calculator",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          const tmp = lastCalculArray;
          tmp.push({
            lastValueStringTmp: valueString,
            lastAnswerTmp: response.data,
          });
          setLastCalculArray(tmp);
          setLastCalcul(valueString + " =");
          setValueString(response.data);
          setIsRequested(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleValue = (param) => {
    const array = ["+", "/", "*", "-"];

    if (param === "CE") {
      CE();
    } else if (param === "=") {
      const arrayTmp = valueString.split(" ");

      if (array.includes(arrayTmp[arrayTmp.length - 1])) {
        arrayTmp.splice(-1, 1);
        setValueString(valueString.substring(0, valueString.length - 2));
      }

      arrayTmp.forEach((data, i) => {
        if (!array.includes(data)) {
          arrayTmp[i] = Number(data);
        }
      });

      // AXIOS
      RequestCalculator(arrayTmp);

      return;
    } else if (array.includes(param)) {
      if (isRequested) {
        setIsRequested(false);
      }

      if (valueString[0] === "0") {
        setValueString(valueString + " " + param.toString());
        return;
      }
      setValueString(valueString + " " + param.toString());
      return;
    } else {
      if (isRequested) {
        setLastCalcul("Ans = " + valueString);
        setValueString(param.toString());
        setIsRequested(false);
        return;
      }

      if (valueString[0] === "0" && valueString.length === 1) {
        setValueString(param.toString());
        return;
      }
      if (array.includes(valueString[valueString.length - 1])) {
        setValueString(valueString + " " + param.toString());
        return;
      }
      setValueString(valueString + param.toString());
      return;
    }
  };

  const RenderInput = () => {
    return (
      <Box className={classes.inputBox} width={1} my={1}>
        <Box display="flex" justifyContent="space-between">
          <div>
            <IconButton
              aria-describedby={id}
              onClick={handleClickAnchor}
              className={classes.buttonIcon}
            >
              <Autorenew />
            </IconButton>
            <RenderLastCalculs />
          </div>
          <Typography variant="body1">{lastCalcul}</Typography>
        </Box>
        <Typography align="right" variant="h5">
          {valueString}
        </Typography>
      </Box>
    );
  };

  const RenderCalculat = () => {
    const array = [
      "(",
      ")",
      "%",
      "CE",
      7,
      8,
      9,
      "/",
      4,
      5,
      6,
      "*",
      1,
      2,
      3,
      "-",
      0,
      ".",
      "=",
      "+",
    ];

    return (
      <Grid container spacing={2} direction="row" item>
        {array.map((data, i, arr) => (
          <Grid key={i} item xs={3}>
            <Button
              className={
                data === "="
                  ? `${classes.button} ${classes.buttonEqual}`
                  : classes.button
              }
              disabled={data === "(" || data === ")" || data === "%"}
              variant="contained"
              color={
                data === "CE" ||
                data === "/" ||
                data === "*" ||
                data === "+" ||
                data === "-"
                  ? "secondary"
                  : "primary"
              }
              onClick={() => handleValue(data)}
            >
              {data.toString()}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box width={400}>
      <RenderInput />
      <RenderCalculat />
    </Box>
  );
};
