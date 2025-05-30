import React from 'react';
import LoginForm from '../components/Login/LoginForm'; // Relative path from src/pages/ to src/components/

/**
 * Interface for the data passed to the onLoginSuccess callback.
 * This should ideally match the structure of data inferred from the Zod schema
 * within the LoginForm component (typically { username: string; password: string }).
 */
interface LoginSuccessData {
  username: string;
  password: string; // Based on common login form structures and Zod schema in LoginForm.tsx
}

/**
 * LoginPage component.
 * This page implements the 'CenteredLayout' template to display the LoginForm.
 * It provides the overall page structure, including the full-screen background
 * and centering container for the login form card.
 */
const LoginPage: React.FC = () => {
  /**
   * Callback function triggered upon successful login.
   * In a production application, this would handle redirection to a dashboard,
   * storing authentication tokens, or updating global application state.
   *
   * @param data The validated form data from LoginForm.
   */
  const handleLoginSuccess = (data: LoginSuccessData) => {
    console.log('Login successful. Data:', data);
    // Example: alert(`Login successful for user: ${data.username}`);
    // TODO: Implement actual post-login logic (e.g., navigation, state update)
  };

  // This div implements the 'overall' layout requirements:
  // - flex: Enables flexbox layout.
  // - items-center: Centers children vertically.
  // - justify-center: Centers children horizontally.
  // - h-screen: Makes the div take up the full viewport height.
  // - bg-background: Applies the application's primary background color.
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      {/* 
        The LoginForm component is rendered here. 
        It already contains its own card styling (width, padding, bg-card, shadow) 
        as per 'mainContent' layout requirements in the PRD.
      */}
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
