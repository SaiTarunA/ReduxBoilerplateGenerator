import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useState } from "react";
import IdeaIcon from "../assets/idea.png";


// import "codemirror/addon/lint/lint.css";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/xml/xml";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/css/css";
// import { UnControlled as CodeMirror } from "react-codemirror2";

import {
  getActionCodeBlock,
  getActionDispatcherCodeBlock,
  getActionIndexBlock,
  getActionTypesCodeBlock,
  getComponentBlock,
  getReducerBlock,
  getReducerIndexBlock,
} from "./CodeBlocks";
import SyntaxHighlighterComp from "./SyntaxHighlighterComp";

const Main = () => {
  const [form, setForm] = useState({
    nameOfFeature: "",
    actionName: "",
    actionDispatcher: "",
    requestType: "GET",
    specificDataPathFromResponse: "",
    hasResponseForPost: true,
    actionTypesParentName: "",
    actionTypeConstant: "",
    keyOfFetchedData: "",
    initialStateOfKey: "",
  });
  const [paramsKeys, setParamsKeys] = useState([]);
  const [mainActionBlock, setMainActionBlock] = useState("");
  const [actionDispatchers, setActionDispatchers] = useState("");
  const [actionTypesBlock, setActionTypesBlock] = useState("");
  const [actionIndexBlock, setActionIndexBlock] = useState("");
  const [componentBlock, setComponentBlock] = useState("");
  const [reducerBlock, setReducerBlock] = useState("");
  const [reducerIndexBlock, setReducerIndexBlock] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(form, paramsKeys);
    setMainActionBlock(getActionCodeBlock(form, paramsKeys));
    setActionIndexBlock(getActionIndexBlock(form, paramsKeys));
    if (form.requestType === "GET" || form.hasResponseForPost) {
      setActionDispatchers(getActionDispatcherCodeBlock(form, paramsKeys));
      setActionTypesBlock(getActionTypesCodeBlock(form, paramsKeys));
      setComponentBlock(getComponentBlock(form, paramsKeys));
      setReducerBlock(getReducerBlock(form, paramsKeys));
      setReducerIndexBlock(getReducerIndexBlock(form, paramsKeys));
    }
  };
  return (
    <Box sx={{ background: ({ palette }) => palette.background.default }}>
      <Container sx={{ pb: 1 }}>
        <Typography
          color="primary"
          variant="h5"
          sx={{
            textAlign: "center",
            pt: 2,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Redux code generator
        </Typography>
        <Typography
          color="primary"
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Boilerplate code for Redux. So that you don't have to copy paste
          &#8734; times
        </Typography>
      </Container>
      <Divider />
      <Container sx={{ mb: 2 }}>
        <Box
          component="form"
          onSubmit={(e) => handleFormSubmit(e)}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            p: 4,
            my: 4,
            border: ({ palette }) => `1px solid ${palette.divider}`,
          }}
          autoComplete="off"
        >
          <Box display="flex" alignItems="center">
            <TextField
              required
              label="Name of feature"
              id="filled-hidden-label-small"
              variant="standard"
              size="small"
              placeholder="cognitiveSearch"
              value={form.nameOfFeature}
              onChange={(e) =>
                setForm((form) => ({ ...form, nameOfFeature: e.target.value }))
              }
            />
            <Tooltip title="Feature Name in camelCase Ex: myDashboard">
              <IconButton sx={{ ml: -1 }}>
                <InfoRoundedIcon
                  sx={{ color: ({ palette }) => palette.text.secondary }}
                />
              </IconButton>
            </Tooltip>
          </Box>
          <Box display="flex" alignItems="center" sx={{ flexWrap: "wrap" }}>
            <Box display="flex" alignItems="center">
              <TextField
                required
                label="Action Name"
                id="filled-hidden-label-small"
                variant="standard"
                size="small"
                placeholder="fetchFavoritesTrends"
                value={form.actionName}
                onChange={(e) =>
                  setForm((form) => ({ ...form, actionName: e.target.value }))
                }
              />
              <Tooltip title="Name of Function to dispatch from component in camelCase Ex: fetchFavTrends">
                <IconButton sx={{ ml: -1, mr: 4 }}>
                  <InfoRoundedIcon
                    sx={{ color: ({ palette }) => palette.text.secondary }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center">
              <TextField
                required
                label="Action Dispatcher"
                id="filled-hidden-label-small"
                variant="standard"
                size="small"
                placeholder="dashboardFavoriteTrends"
                value={form.actionDispatcher}
                onChange={(e) =>
                  setForm((form) => ({
                    ...form,
                    actionDispatcher: e.target.value,
                  }))
                }
              />
              <Tooltip title="Prefix name of functions dispatched from Action Function in camelCase Ex: If the functions are dashboardFavTrendsLoading, Success, Failure, type this -> dashboardFavTrends">
                <IconButton sx={{ ml: -1 }}>
                  <InfoRoundedIcon
                    sx={{ color: ({ palette }) => palette.text.secondary }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box sx={{ m: 1 }}>
            <FormControl
              size="small"
              variant="standard"
              sx={{ pr: 2, minWidth: 120 }}
            >
              <InputLabel id="demo-simple-select-required-label">
                Request Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={form.requestType}
                label="Request Type"
                onChange={(e) =>
                  setForm((form) => ({ ...form, requestType: e.target.value }))
                }
              >
                <MenuItem value={"GET"}>GET</MenuItem>
                <MenuItem value={"POST"}>POST</MenuItem>
                <MenuItem value={"DELETE"}>DELETE</MenuItem>
              </Select>
            </FormControl>
            {form.requestType !== "GET" && (
              <FormControlLabel
                control={<Checkbox />}
                label="Has Response?"
                checked={form.hasResponseForPost}
                onChange={() =>
                  setForm((form) => ({
                    ...form,
                    hasResponseForPost: !form.hasResponseForPost,
                  }))
                }
              />
            )}
            <Box display="flex" alignItems="center">
              <Autocomplete
                multiple
                id="tags-filled"
                options={[]}
                value={paramsKeys}
                freeSolo
                onChange={(e, newval, reason) => {
                  setParamsKeys(newval);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={
                      form.requestType === "GET"
                        ? "queryParams"
                        : "Payload Data Object keys"
                    }
                    placeholder={`Enter ${
                      form.requestType === "GET" ? "queryParam" : "Object key"
                    } and press ENTER`}
                    onKeyDown={(e) => {
                      if (e.code === "enter" && e.target.value) {
                        setParamsKeys(paramsKeys.concat(e.target.value));
                      }
                    }}
                  />
                )}
              />
              <Tooltip
                title={`Fill this If there are any ${
                  form.requestType === "GET"
                    ? "queryParams"
                    : "Payload Data Object keys"
                } in camelCase. Please note that you can write param name and hit ENTER to write another Ex: If the param are name, pillarId > Do this => name -> ENTER -> pilarID -> ENTER`}
              >
                <IconButton sx={{ ml: -1 }}>
                  <InfoRoundedIcon
                    sx={{ color: ({ palette }) => palette.text.secondary }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box>
            <Box display="flex" alignItems="center">
              <TextField
                label="Specific Data path from Response"
                id="filled-hidden-label-small"
                variant="standard"
                size="small"
                placeholder="response.data.data"
                value={form.specificDataPathFromResponse}
                onChange={(e) =>
                  setForm((form) => ({
                    ...form,
                    specificDataPathFromResponse: e.target.value,
                  }))
                }
              />
              <Tooltip
                title={`Fill this If there is any other path for response data other than response.data. Please note that you have to add "response." in the beginning of path Ex: if data from response is in data.fav_data, You Enter response.data?.fav_data`}
              >
                <IconButton sx={{ ml: -1 }}>
                  <InfoRoundedIcon
                    sx={{ color: ({ palette }) => palette.text.secondary }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            {(form.requestType === "GET" || form.hasResponseForPost) && (
              <Box
                display="flex"
                alignItems="center"
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                <Box display="flex" alignItems="center">
                  <TextField
                    required
                    label="Parent ActionType Name from actionTypes.js"
                    id="filled-hidden-label-small"
                    variant="standard"
                    size="small"
                    placeholder="cognitiveSearchActionTypes"
                    value={form.actionTypesParentName}
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        actionTypesParentName: e.target.value,
                      }))
                    }
                  />
                  <Tooltip
                    title={`How do you want to import actionTypes Object into reducer and action files. Ex: if import { cognitiveSearch as cognitiveSearchActionTypes} => type -> "cognitiveSearchActionTypes"`}
                  >
                    <IconButton sx={{ ml: -1 }}>
                      <InfoRoundedIcon
                        sx={{ color: ({ palette }) => palette.text.secondary }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center">
                  <TextField
                    required
                    label="Constant in ActionTypes Obj"
                    id="filled-hidden-label-small"
                    variant="standard"
                    size="small"
                    placeholder="FETCH_TREND_RESULTS"
                    value={form.actionTypeConstant}
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        actionTypeConstant: e.target.value,
                      }))
                    }
                  />
                  <Tooltip
                    title={`Name of Constant you specify in actionTypes obj in CAPITAL snakecase. Ex: if the constants are FAV_TRENDS_LOADING, SUCCESS, FAILURE => type -> "FAV_TRENDS"`}
                  >
                    <IconButton sx={{ ml: -1 }}>
                      <InfoRoundedIcon
                        sx={{ color: ({ palette }) => palette.text.secondary }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center">
                  <TextField
                    required
                    label="Key of Response Data in Redux state"
                    id="filled-hidden-label-small"
                    variant="standard"
                    size="small"
                    placeholder="filteredTrendData"
                    value={form.keyOfFetchedData}
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        keyOfFetchedData: e.target.value,
                      }))
                    }
                  />
                  <Tooltip
                    title={`Name of key you specify in Redux State. The data will be saved by this name in redux state Ex: favTrendsData`}
                  >
                    <IconButton sx={{ ml: -1 }}>
                      <InfoRoundedIcon
                        sx={{ color: ({ palette }) => palette.text.secondary }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box display="flex" alignItems="center">
                  <TextField
                    required
                    label="Value of initial state in Redux state"
                    id="filled-hidden-label-small"
                    variant="standard"
                    size="small"
                    placeholder="{}, [], false etc"
                    value={form.initialStateOfKey}
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        initialStateOfKey: e.target.value,
                      }))
                    }
                  />
                  <Tooltip
                    title={`Initial state value of response data based on type of data. Ex: {}, [], false, null`}
                  >
                    <IconButton sx={{ ml: -1 }}>
                      <InfoRoundedIcon
                        sx={{ color: ({ palette }) => palette.text.secondary }}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            )}
          </Box>
          <Button
            sx={{ mt: 3, color: ({ palette }) => palette.background.default }}
            type="submit"
            variant="contained"
          >
            Generate
            <Box
              component="img"
              sx={{ width: "1rem", mx: 1 }}
              src={IdeaIcon}
              alt="Gen"
            ></Box>
          </Button>
        </Box>
        <Box>
          <SyntaxHighlighterComp
            fileName={`/actions/index.js`}
            code={actionIndexBlock}
          />
          <SyntaxHighlighterComp
            fileName={`/actions/${form.nameOfFeature}Actions.js`}
            code={mainActionBlock}
          />
          {(form.requestType === "GET" || form.hasResponseForPost) && (
            <>
              <SyntaxHighlighterComp
                fileName={`/actions/${form.nameOfFeature}Actions.js`}
                code={actionDispatchers}
              />
              <SyntaxHighlighterComp
                fileName={`/actions/actionTypes.js`}
                code={actionTypesBlock}
              />
              <SyntaxHighlighterComp
                fileName={`/components/${form.nameOfFeature}.js`}
                code={componentBlock}
              />
              <SyntaxHighlighterComp
                fileName={`/reducers/${form.nameOfFeature}Reducer.js`}
                code={reducerBlock}
              />
              <SyntaxHighlighterComp
                fileName={`/reducers/index.js`}
                code={reducerIndexBlock}
              />
            </>
          )}
          {/* <CodeMirror
          value={formattedCode.trim()}
          options={{
            mode: "text/javascript",
            theme: "material",
            lineNumbers: true,
            lint: true,
          }}
        /> */}
        </Box>
      </Container>
      <Divider />
      <Container sx={{ pb: 1 }}>
        <Typography
          color="primary"
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: 500,
            p: 2,
          }}
        >
          Created By Sai Tarun Avadhootha
        </Typography>
      </Container>
    </Box>
  );
};

export default Main;
