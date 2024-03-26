import AdminProductForm from "../features/Administration/AdminProductForm";

function AdminProductCreate() {
  return (
    <div className="mt-4">
      <div className="fs-3 my-3">Admin Product Create</div>
      <hr className="me-3" />
      <AdminProductForm />
    </div>
  );
}

export default AdminProductCreate;
