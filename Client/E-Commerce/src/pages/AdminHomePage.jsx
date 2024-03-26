import AdminHome from "../features/Administration/AdminHome";

function AdminHomePage() {
  return (
    <>
      <div className="fs-2 fw-medium text-center mt-4">Services</div>
      <hr />
      <div>
        <AdminHome />
      </div>
    </>
  );
}

export default AdminHomePage;
