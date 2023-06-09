import * as actionTypes from "./actions";
import config from "./../config";
import { ACTIONTYPE } from './actions';
export const initialState = {
  isOpen: [] as string[], //for active default menu
  isTrigger: [] as string[], //for active default menu, set blank for horizontal
  projectId:"",
  ...config
};

const reducer = (state = initialState, action: ACTIONTYPE): typeof initialState => {
  let trigger: string[] = [];
  let open: string[] = [];
  switch (action.type) {
    case actionTypes.COLLAPSE_MENU:
      return {
        ...state,
        collapseMenu: !state.collapseMenu
      };

      case actionTypes.SET_PROJECT_ID:
      return {
        ...state,
        projectId:action.id
      };

    case actionTypes.COLLAPSE_TOGGLE:
      if (action.menu.type === "sub") {
        open = state.isOpen;
        trigger = state.isTrigger;
        const triggerIndex = trigger.indexOf(action.menu.id);
        if (triggerIndex > -1) {
          open = open.filter(item => item !== action.menu.id);
          trigger = trigger.filter(item => item !== action.menu.id);
        }
        if (triggerIndex === -1) {
          open = [...open, action.menu.id];
          trigger = [...trigger, action.menu.id];
        }
      } else {
        open = state.isOpen;
        const triggerIndex = state.isTrigger.indexOf(action.menu.id);
        trigger = triggerIndex === -1 ? [action.menu.id] : [];
        open = triggerIndex === -1 ? [action.menu.id] : [];
      }
      return {
        ...state,
        isOpen: open,
        isTrigger: trigger
      };
    case actionTypes.NAV_CONTENT_LEAVE:
      return {
        ...state,
        isOpen: open,
        isTrigger: trigger
      };
    case actionTypes.NAV_COLLAPSE_LEAVE:
      if (action.menu.type === "sub") {
        open = state.isOpen;
        trigger = state.isTrigger;
        const triggerIndex = trigger.indexOf(action.menu.id);
        if (triggerIndex > -1) {
          open = open.filter(item => item !== action.menu.id);
          trigger = trigger.filter(item => item !== action.menu.id);
        }
        return {
          ...state,
          isOpen: open,
          isTrigger: trigger
        };
      }
      return { ...state };
    case actionTypes.CHANGE_LAYOUT:
      return {
        ...state,
        layout: action.layout
      };
    case actionTypes.LAYOUT_TYPE:
      return {
        ...state,
        layoutType: action.layoutType,
        headerBackColor: initialState.headerBackColor
      };
    case actionTypes.NAV_BACK_COLOR:
      return {
        ...state,
        layoutType:
          state.layoutType === "menu-light" ? "menu-dark" : state.layoutType
      };
    case actionTypes.HEADER_BACK_COLOR:
      return {
        ...state,
        headerBackColor: action.headerBackColor
      };
    case actionTypes.NAV_FIXED_LAYOUT:
      return {
        ...state,
        navFixedLayout: !state.navFixedLayout
      };
    case actionTypes.HEADER_FIXED_LAYOUT:
      return {
        ...state,
        headerFixedLayout: !state.headerFixedLayout
      };
    case actionTypes.FULL_WIDTH_LAYOUT:
      return {
        ...state,
        fullWidthLayout: !state.fullWidthLayout
      };
    case actionTypes.RESET:
      return {
        ...state,
        layout: initialState.layout,
        collapseMenu: initialState.collapseMenu,
        layoutType: initialState.layoutType,
        headerBackColor: initialState.headerBackColor,
        navFixedLayout: initialState.navFixedLayout,
        headerFixedLayout: initialState.headerFixedLayout,
        fullWidthLayout: initialState.fullWidthLayout
      };
    default:
      return state;
  }
};
export default reducer;
