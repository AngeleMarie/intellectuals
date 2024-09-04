"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isVisible, setIsVisible] = useState(false); // State for visibility
  const router = useRouter();

  useEffect(() => {
    if (error || success) {
      setIsVisible(true); // Trigger the animation when error or success is set
    }
  }, [error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Resetting error states
    setUsernameError('');
    setPasswordError('');
    setError('');
    setSuccess('');

    // Checking for empty fields
    if (!username) {
      setUsernameError('Username is required.');
    }
    if (!password) {
      setPasswordError('Password is required.');
    }
    if (!username || !password) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://intellectuals.vercel.app/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setSuccess('You have logged in successfully.');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000); 
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (type) => {
    setIsVisible(false); 
    setTimeout(() => {
      if (type === 'error') {
        setError('');
      } else if (type === 'success') {
        setSuccess('');
      }
    }, 100);
  };

  return (
    <main className="min-h-screen flex justify-center items-center relative">
      {success && (
        <div
          className={`absolute top-12 right-4 bg-green-500/40 shadow-md h-20 text-xl text-green-500 px-4 py-2 rounded flex items-center transition-all duration-500 transform ${
            isVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <span className="mr-2">{success}</span>
          <button
            onClick={() => handleClose('success')}
            className="ml-auto text-green-500 text-xl bg-white/40 rounded-full h-8 w-8 text-center hover:bg-green-500/40 hover:text-white"
          >
            &times;
          </button>
        </div>
      )}
      {error && (
        <div
          className={`absolute top-12 right-4 text-xl text-red-500 bg-red-500/40 h-20 shadow-md px-4 py-2 rounded flex items-center transition-all duration-500 transform ${
            isVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <span className="mr-2">{error}</span>
          <button
            onClick={() => handleClose('error')}
            className="ml-auto text-red-500 text-xl bg-white/40 rounded-full h-8 w-8 text-center hover:bg-red-500/40 hover:text-white "
          >
            &times;
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mx-40 my-0">
          <img src="/RMC.png" alt="logo" />
        </div>
        <div className="text-center text-2xl text-main font-bold">Admin Login</div>
        
        <div>
          <div>Username:</div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            className="border p-2"
          />
          {usernameError && <p className="text-red-500">{usernameError}</p>}
        </div>
        
        <div>
          <div>Password:</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="border p-2"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
    
        <button
          type="submit"
          className="bg-main w-96 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  );
}
