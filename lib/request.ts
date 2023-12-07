export const createRecipe = async (body: {
  userId: string;
  username: string;
  avatar: string;
  title: string;
  category: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
};

export const fetchRecipes = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`,
    {
      cache: "no-store",
    }
  );
  const result = await response.json();
  return result;
};

export const fetchCooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cooks`,
    {
      cache: "no-store",
    }
  );
  const result = await response.json();
  return result;
};

export const fetchRecipe = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${id}`,
    {
      cache: "no-store",
    }
  );
  const result = await response.json();
  return result;
};

export const fetchCook = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cooks/${id}`,
    {
      cache: "no-store",
    }
  );
  const result = await response.json();
  return result;
};

export const deleteRecipe = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }
  );
  const result = await response.json();
  return result;
};
