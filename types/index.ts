export interface RecipeProps {
  userId: string;
  title: string;
  image_url: string;
  ingredients: string[];
  instructions: string[];
  prep_time: string;
  servings: number;
}
