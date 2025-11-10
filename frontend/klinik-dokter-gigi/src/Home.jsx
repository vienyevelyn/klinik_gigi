import { useAuth } from "./AuthContext";

function Home() {
  const { auth, logout } = useAuth();

  if (auth.loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Welcome, {auth.username}!</h3>
      <button className="btn btn-danger" onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
