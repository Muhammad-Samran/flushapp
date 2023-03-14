import AxiosConfig from "../AxiosConfig";
export async function getUserProfile(userId) {
  try {
    const { data } = await AxiosConfig.get(
      `core/user/guest/profile/view/?core_user=${userId}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
export async function getUserBio() {
  try {
    const { data } = await AxiosConfig.get("user/bio/create/");
    return data;
  } catch (error) {
    return error;
  }
}
export async function getUserPortfolios(userId) {
  try {
    const { data } = await AxiosConfig.get(
      `portfolio/fetch/detail/?core_id=${userId}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
export async function getUserSkills(userId) {
  try {
    const { data } = await AxiosConfig.get(
      `user/guest/skills/details/?is_business=false&is_personal=true&core_user=${userId}`
    );

    return data;
  } catch (error) {
    return error;
  }
}
export async function getWorkExperience(userId) {
  try {
    const { data } = await AxiosConfig.get(
      `user/guest/work/details/?core_user=${userId}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
export async function getEducation(userId) {
  try {
    const { data } = await AxiosConfig.get(
      `user/educational/background/guset/view/?core_user=${userId}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
export async function getEducationById(cert_id) {
  try {
    const { data } = await AxiosConfig.get(
      `user/educational/background/view/?cert_id=${cert_id}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
export async function getWorkById(work_id) {
  try {
    const { data } = await AxiosConfig.get(
      `user/work/details/?work_id=${work_id}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
export async function updateUserProfile(data) {
  try {
    const res = await AxiosConfig.put(`user/profile/view/`, data);
    return res;
  } catch (error) {
    return error;
  }
}
export async function getPortfolioItem(userId, portfolioId) {
  try {
    const res = await AxiosConfig.get(
      `portfolio/single/fetch/?p_id=${portfolioId}&core_id=${userId}`
    );
    return { res };
  } catch (error) {
    return { error };
  }
}
