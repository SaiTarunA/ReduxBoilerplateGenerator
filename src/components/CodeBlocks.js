import { getFormattedCodeBlock } from "./formatter";

export const getActionCodeBlock = (form, paramsKeys) => {
  return getFormattedCodeBlock(
    `export const ${form.actionName} = (${
      paramsKeys.length ? paramsKeys.join(", ") : ""
    }) => {\nreturn (dispatch) => {\ndispatch(${
      form.actionDispatcher
    }Loading())\n\n// TODO: Specify URL Name Below\nconst url = NetworkingUtil.getUrl${
      form.requestType === "GET" && paramsKeys?.length
        ? `(${paramsKeys.join(", ")})`
        : `()`
    }${
      form.requestType !== "GET" && paramsKeys?.length
        ? `\n\n// TODO: Should Change Values of below obj\nconst data = ${JSON.stringify(
            paramsKeys.reduce((obj, cur, i) => {
              return { ...obj, [cur]: cur };
            }, {})
          )}`
        : ""
    }\n\naxios\n.${form.requestType.toLowerCase()}(url${
      form.requestType !== "GET" && paramsKeys?.length ? ", data" : ""
    })\n.then((${
      form.requestType === "GET" || form.hasResponseForPost ? "response" : ""
    }) => {\n${
      form.requestType === "GET" || form.hasResponseForPost
        ? `dispatch(${form.actionDispatcher}Success(${
            form.specificDataPathFromResponse || "response.data"
          }))`
        : `console.log("Request Success")`
    }\n})\n.catch((error) => {\n${
      form.requestType === "GET" || form.hasResponseForPost
        ? `dispatch(${form.actionDispatcher}Failure(error))`
        : `console.log(error)`
    }\n})\n}\n}`
  );
};

export const getActionDispatcherCodeBlock = (form, paramsKeys) => {
  return getFormattedCodeBlock(
    `import { ${form.nameOfFeature} as ${form.actionTypesParentName} } from "./actionTypes.js"\n\nconst ${form.actionDispatcher}Loading = () => {\nreturn {\ntype: ${form.actionTypesParentName}.type[\n${form.actionTypesParentName}.${form.actionTypeConstant}_LOADING],\n}\n}
    \nconst ${form.actionDispatcher}Success = (${form.keyOfFetchedData}) => {\nreturn {\ntype: ${form.actionTypesParentName}.type[\n${form.actionTypesParentName}.${form.actionTypeConstant}_SUCCESS],\n${form.keyOfFetchedData}: ${form.keyOfFetchedData}\n}\n}
    \nconst ${form.actionDispatcher}Failure = (error) => {\nreturn {\ntype: ${form.actionTypesParentName}.type[\n${form.actionTypesParentName}.${form.actionTypeConstant}_FAILURE],\nerror: error\n}\n}`
  );
};

export const getActionTypesCodeBlock = (form, paramsKeys) => {
  return getFormattedCodeBlock(
    `const ${form.nameOfFeature} = {\n${form.actionTypeConstant}_LOADING: 1,\n${form.actionTypeConstant}_SUCCESS: 2,\n${form.actionTypeConstant}_FAILURE: 3,\ntype: {\n1: "${form.actionTypeConstant}_LOADING",\n2: "${form.actionTypeConstant}_SUCCESS",\n3: "${form.actionTypeConstant}_FAILURE",\n}\n}\n\nObject.freeze(${form.nameOfFeature})`
  );
};

export const getActionIndexBlock = (form, paramsKeys) => {
  return getFormattedCodeBlock(
    `export {\n${form.actionName}\n} from "./${form.nameOfFeature}Actions.js"`
  );
};

export const getComponentBlock = (form, paramsKeys) => {
  return getFormattedCodeBlock(
    `import {\n${
      form.actionName
    }\n} from "../../actions"\n\nconst mapStateToProps = (state) => {\nconst { ${
      form.nameOfFeature
    } } = state\nreturn {\n${form.keyOfFetchedData}: ${form.nameOfFeature}.${
      form.keyOfFetchedData
    },\n}\n}\n\nconst mapDispatchToProps = (dispatch) => {\nreturn {\n${
      form.actionName
    }: (${paramsKeys.join(", ")}) => {\ndispatch(${
      form.actionName
    }(${paramsKeys.join(", ")}))\n}\n}\n}`
  );
};

export const getReducerBlock = (form, paramsKeys) => {
  return getFormattedCodeBlock(
    `import { ${form.nameOfFeature} as ${form.actionTypesParentName} } from "../actions/actionTypes.js"\nimport { updateObject } from '../utility'\n\nconst initialState = {\n${form.keyOfFetchedData}: ${form.initialStateOfKey},\nloading: {\n${form.keyOfFetchedData}: false,\n},\n}\n\nconst ${form.nameOfFeature}Reducer = (state = initialState, action) => {\nswitch (action.type) {\ncase ${form.actionTypesParentName}.type[\n${form.actionTypesParentName}.${form.actionTypeConstant}_LOADING\n]:\nreturn updateObject(state, {\nloading: { ...state.loading, ${form.keyOfFetchedData}: true },\n})\ncase ${form.actionTypesParentName}.type[\n${form.actionTypesParentName}.${form.actionTypeConstant}_SUCCESS\n]:\nreturn updateObject(state, {\n${form.keyOfFetchedData}: action.${form.keyOfFetchedData},\nloading: { ...state.loading, ${form.keyOfFetchedData}: false },\n})\ncase ${form.actionTypesParentName}.type[\n${form.actionTypesParentName}.${form.actionTypeConstant}_FAILURE\n]:\nreturn updateObject(state, {\n${form.keyOfFetchedData}: initialState.${form.keyOfFetchedData},\nloading: { ...state.loading, ${form.keyOfFetchedData}: false },\n})\n}\n}`
  );
};

export const getReducerIndexBlock = (form, paramsKeys) => {
  return getFormattedCodeBlock(
    `const reducer = combineReducers({\n// Add This\n${form.nameOfFeature}: ${form.nameOfFeature}Reducer,\n})`
  );
};
