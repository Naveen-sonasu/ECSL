import {
  CENTRE_LIST_REQUEST,
  CENTRE_LIST_SUCCESS,
  CENTRE_LIST_FAIL,
  CENTRE_DETAILS_REQUEST,
  CENTRE_DETAILS_SUCCESS,
  CENTRE_DETAILS_FAIL,
  CENTRE_REGISTER_REQUEST,
  CENTRE_REGISTER_SUCCESS,
  CENTRE_REGISTER_FAIL,
  CENTRE_DELETE_REQUEST,
  CENTRE_DELETE_SUCCESS,
  CENTRE_DELETE_FAIL,
  CENTRE_UPDATE_REQUEST,
  CENTRE_UPDATE_SUCCESS,
  CENTRE_UPDATE_FAIL,
} from "../constants/centreConstants";
import * as api from "../api/index";

export const listCentres = () => async (dispatch) => {
  try {
    dispatch({ type: CENTRE_LIST_REQUEST });

    const { data } = await api.listCentreAPI();

    dispatch({
      type: CENTRE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CENTRE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCertreDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CENTRE_DETAILS_REQUEST });

    const { data } = await api.CertreDetailsAPI(id);

    dispatch({
      type: CENTRE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CENTRE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const centreRegister = (centreName) => async (dispatch) => {
  try {
    dispatch({
      type: CENTRE_REGISTER_REQUEST,
    });

    const { data } = await api.CertreRegisterAPI(centreName);

    dispatch({
      type: CENTRE_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CENTRE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CENTRE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCentre = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CENTRE_DELETE_REQUEST,
    });

    await api.CertreDeleteAPI(id);

    dispatch({
      type: CENTRE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CENTRE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCentre = (centre) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CENTRE_UPDATE_REQUEST,
    });

    const { data } = await api.CertreUpdateAPI(centre);

    dispatch({
      type: CENTRE_UPDATE_SUCCESS,
    });

    dispatch({
      type: CENTRE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CENTRE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchCentres = (centreName) => async (dispatch) => {
  try {
    dispatch({ type: CENTRE_LIST_REQUEST });

    const { data } = await api.CertreSearchAPI(centreName);

    dispatch({
      type: CENTRE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CENTRE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
