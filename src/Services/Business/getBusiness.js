import AxiosConfig from "../AxiosConfig";

export async function getBusinessProfile(business_id) {
  try {
    const { data } = await AxiosConfig.get(
      `/fetch/business/?b_id=${business_id}`
    );
    return { data };
  } catch (error) {
    return { error };
  }
}
export async function updateBusinessProfile(values) {
  try {
    const { data } = await AxiosConfig.put(`create/business/profile/`, values);
    return { data };
  } catch (error) {
    return { error };
  }
}
export async function createService(values) {
  try {
    const res = await AxiosConfig.post("user/services/", values);
    return res;
  } catch (error) {
    return error;
  }
}
export async function updateService(values, serviceId) {
  try {
    const res = await AxiosConfig.put(
      `user/services/?s_id=${serviceId}`,
      values
    );
    return res;
  } catch (error) {
    return error;
  }
}
export async function deleteService(serviceId) {
  try {
    const res = await AxiosConfig.delete(`user/services/?s_id=${serviceId}`);
    return res;
  } catch (error) {
    return error;
  }
}
export async function createPortfolio(values) {
  try {
    const res = await AxiosConfig.post("business/portfolio/", values);
    return res;
  } catch (error) {
    return error;
  }
}
export async function deleteProject(projectId) {
  try {
    const res = await AxiosConfig.delete(`business/project/?p_id=${projectId}`);
    return res;
  } catch (error) {
    return error;
  }
}
export async function deletePortfolio(portfolioId, businessId) {
  try {
    const res = await AxiosConfig.delete(
      `business/portfolio/?p_id=${portfolioId}&business_id=${businessId}`
    );
    return res;
  } catch (error) {
    return error;
  }
}
