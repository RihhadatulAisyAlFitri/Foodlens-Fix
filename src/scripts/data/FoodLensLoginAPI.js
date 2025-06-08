const BASE_URL = 'https://foodlens-backend-production-c5b2.up.railway.app/api';

const FoodLensLoginAPI = {
  async getLogin({ email, password }) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      const data = await response.json();
      return {
        ok: true,
        message: data.message,
        data: data.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
        data: null,
      };
    }
  },

  async register({ email, password }) {
  console.log('Payload:', { email, password });
  // Validasi
  if (!email || !password) {
    return {
      ok: false,
      message: 'Email dan kata sandi wajib diisi.',
      data: null,
    };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      ok: false,
      message: 'Format email tidak valid.',
      data: null,
    };
  }
  if (password.length < 8) {
    return {
      ok: false,
      message: 'Kata sandi harus minimal 8 karakter.',
      data: null,
    };
  }

  try {
    console.log('BASE_URL:', BASE_URL);
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }), // Tambahkan field lain jika perlu
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Respons server:', errorData);
      return {
        ok: false,
        message: errorData.message || `Registrasi gagal: Status ${response.status}`,
        data: null,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    let errorMessage = 'Terjadi kesalahan jaringan atau server tidak merespons.';
    if (error.message.includes('ECONNRESET') || error.message.includes('Network request failed')) {
      errorMessage = 'Koneksi ke server terputus. Cek koneksi internet Anda.';
    } else if (error.message.includes('Failed to fetch')) {
      errorMessage = 'Tidak dapat terhubung ke server. Pastikan server berjalan.';
    } else {
      errorMessage = error.message;
    }
    console.error('Error:', error);
    return {
      ok: false,
      message: errorMessage,
      data: null,
    };
  }
},

  async forgotPassword({ email }) {
    try {
      const response = await fetch(`${BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Forgot password failed');
      }
      const data = await response.json();
      return {
        ok: true,
        message: data.message,
        data: data.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
        data: null,
      };
    }
  },

  async resetPassword({ token, password }) {
    try {
      const response = await fetch(`${BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Reset password failed');
      }
      const data = await response.json();
      return {
        ok: true,
        message: data.message,
        data: data.data,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
        data: null,
      };
    }
  },
};

export default FoodLensLoginAPI;