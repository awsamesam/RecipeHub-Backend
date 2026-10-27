import FaHeart1 from "./FaHeart1";
import IconEditAndDeleteRecipes from "../EditAllRecipes/IconEditAndDeleteRecipes";
import "./AllRecipes.css";

function Recipes({ recipes, type, onDeleteSuccess }) {
  return (
    <div className="recipes-container">
      {recipes?.map((item) => {
        return (
          <div className="box" key={item._id}>
            {/* أيقونة القلب أصبحت هنا: في أعلى الكرت من جهة اليمين، وفوق الصورة */}
            <div className="recipe-heart-container">
              <FaHeart1 item={item} />
            </div>

            {/* حاوية الصورة */}
            <div className="recipe-image-container">
              <img
                src={`http://localhost:5000/images/${item.coverImage}`}
                alt={item.title || "Recipe"}
                className="recipe-image"
              />
            </div>

            {/* تفاصيل الوصفة بالأسفل */}
            <div className="box-content">
              <div className="left">
                <h1>{item.title}</h1>
                <p>{item.ingredients}</p>
              </div>

              {type == "my-recipes" && (
                <IconEditAndDeleteRecipes
                  item={item}
                  onDeleteSuccess={onDeleteSuccess}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Recipes;
