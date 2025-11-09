(function() {
  const AUTH_KEY = 'nomad_users';
  const CURRENT_USER_KEY = 'nomad_current_user';
  const SEARCH_HISTORY_KEY = 'nomad_search_history';

  function getUsers() {
    const users = localStorage.getItem(AUTH_KEY);
    return users ? JSON.parse(users) : {};
  }

  function saveUsers(users) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(users));
  }

  function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validatePhone(phone) {
    const phonePattern = /^\+?\d{10,15}$/;
    return phonePattern.test(phone.replace(/\s/g, ''));
  }

  function validatePassword(password) {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one special character' };
    }
    return { valid: true, message: '' };
  }

  function signUp(name, email, phone, password) {
    const users = getUsers();
    
    if (!name || !email || !phone || !password) {
      return { success: false, message: 'All fields are required' };
    }

    if (!validateEmail(email)) {
      return { success: false, message: 'Invalid email format' };
    }

    if (!validatePhone(phone)) {
      return { success: false, message: 'Invalid phone number format' };
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return { success: false, message: passwordValidation.message };
    }

    if (users[email]) {
      return { success: false, message: 'Email already registered' };
    }

    users[email] = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      createdAt: new Date().toISOString(),
      ratings: {}
    };

    saveUsers(users);
    return { success: true, message: 'Account created successfully!' };
  }

  function signIn(email, password) {
    const users = getUsers();
    
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    if (!users[email]) {
      return { success: false, message: 'Invalid email or password' };
    }

    if (users[email].password !== password) {
      return { success: false, message: 'Invalid email or password' };
    }

    const user = { ...users[email] };
    delete user.password;
    setCurrentUser(user);
    return { success: true, message: 'Login successful!', user: user };
  }

  function signOut() {
    setCurrentUser(null);
    return { success: true, message: 'Logged out successfully!' };
  }

  function saveRating(carName, rating) {
    const user = getCurrentUser();
    if (!user) {
      return { success: false, message: 'Please log in to rate cars' };
    }

    const users = getUsers();
    if (!users[user.email]) {
      return { success: false, message: 'User not found' };
    }

    if (!users[user.email].ratings) {
      users[user.email].ratings = {};
    }

    users[user.email].ratings[carName] = rating;
    saveUsers(users);

    const updatedUser = { ...users[user.email] };
    delete updatedUser.password;
    setCurrentUser(updatedUser);

    return { success: true, message: 'Rating saved!' };
  }

  function getRating(carName) {
    const user = getCurrentUser();
    if (!user || !user.ratings) {
      return null;
    }
    return user.ratings[carName] || null;
  }

  function saveSearchHistory(searchTerm, results) {
    const user = getCurrentUser();
    if (!user) {
      return;
    }

    const history = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '{}');
    if (!history[user.email]) {
      history[user.email] = [];
    }

    history[user.email].unshift({
      term: searchTerm,
      results: results,
      timestamp: new Date().toISOString()
    });

    if (history[user.email].length > 10) {
      history[user.email] = history[user.email].slice(0, 10);
    }

    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  }

  function getSearchHistory() {
    const user = getCurrentUser();
    if (!user) {
      return [];
    }

    const history = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '{}');
    return history[user.email] || [];
  }

  window.auth = {
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    getCurrentUser: getCurrentUser,
    validateEmail: validateEmail,
    validatePhone: validatePhone,
    validatePassword: validatePassword,
    saveRating: saveRating,
    getRating: getRating,
    saveSearchHistory: saveSearchHistory,
    getSearchHistory: getSearchHistory
  };
})();

