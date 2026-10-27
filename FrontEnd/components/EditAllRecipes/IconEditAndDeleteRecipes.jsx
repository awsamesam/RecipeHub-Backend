import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
function IconEditAndDeleteRecipes({ item, onDeleteSuccess }) {
  const router = useRouter();
  const handleDelete = async () => {
    if (!item || !item._id) return;
    const token = localStorage.getItem("token");
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/recipe/${item._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (onDeleteSuccess) {
          onDeleteSuccess(item._id);
        }
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.errors?.[0]?.msg ||
          error.response?.data?.message ||
          "Something went wrong";
      });
  };

  return (
    <>
      <div className="box-actions">
        <FaEdit
          title="تعديل"
          className="action-icon edit-icon"
          onClick={() => {
            router.push(`/EditRecpies/${item._id}`);
          }}
        />
        <FaTrash
          title="حذف"
          className="action-icon delete-icon"
          onClick={handleDelete}
        />
      </div>
    </>
  );
}

export default IconEditAndDeleteRecipes;
