'use client'
import React, { useState ,useEffect} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { loginUser } from '../features/auth/slice';
import { useRouter } from 'next/navigation';
const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const router=useRouter();
  const [form, setForm] = useState({
    username: 'emilys',
    password: 'emilyspass',
  });
  


  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handleSubmit =  (e) => {
      e.preventDefault();
      dispatch(loginUser(form))

    }
    useEffect(() => {
     if (user?.username) {
      router.push('/');
     }
    }, [user])
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl px-8 pt-6 pb-8 w-[300px] space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border text-black border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border text-black border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p>{error && <span className="text-red-500">{error}</span>}</p>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
        >
          {loading ? 'Logging in...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Login;
