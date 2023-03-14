export default async function (file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
    method: "POST",
    body: formData,
  });
  const json = await response.json();
  return json;
}
