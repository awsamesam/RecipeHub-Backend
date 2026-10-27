import EditRecipeClient from "../../../../components/EditAllRecipes/EditRecipeClient";
import "./EditRecipe.css";

export default async function EditRecipePage({ params }) {
  const resolvedParams = await params;
  const recipeId = resolvedParams.Id;

  return <EditRecipeClient recipeId={recipeId} />;
}
