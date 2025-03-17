const token = sessionStorage.getItem("token");
const API_URL = import.meta.env.VITE_API_URL;

export const getAllLinks = async () => {
  const response = await fetch(`${API_URL}/ctram-links`);
  if (!response.ok) {
    throw new Error(`Error fetching links: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export const getLinksById = async (id) => {
  const response = await fetch(`${API_URL}/ctram-links/${id}`);
  if (!response.ok) {
    throw new Error(`Error fetching link by ID: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
};

export const createLinks = async (links) => {
  const response = await fetch(`${API_URL}/ctram-links`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(links),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error creating links: ${response.statusText}, ${errorText}`);
  }
  const data = await response.json();
  return data;
};

export const updateLinks = async (id, links) => {
  const response = await fetch(`${API_URL}/ctram-links/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(links),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error updating links: ${response.statusText}, ${errorText}`);
  }
  const data = await response.json();
  return data;
};
