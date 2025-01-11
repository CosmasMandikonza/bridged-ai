import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from '@/config/config';
import { useAuth } from '@/context/AuthContext';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';

export const SignupForm = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const signupResult = await instance.loginPopup({
        ...loginRequest,
        authority: `https://${import.meta.env.VITE_AZURE_B2C_TENANT_NAME}.b2clogin.com/${import.meta.env.VITE_AZURE_B2C_DOMAIN}/B2C_1_signupsignin`
      });

      if (signupResult?.account) {
        await login();
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, px: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Create Your Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignup}
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                <span>Creating account...</span>
              </Box>
            ) : (
              'Sign up with Microsoft'
            )}
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button color="primary">Sign In</Button>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};