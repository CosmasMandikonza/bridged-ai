// src/components/settings/Settings.tsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Stack,
  Grid,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  NotificationsActive,
  Palette,
  AccessibilityNew,
  Language,
  Security,
  DeleteOutline,
  CloudDownload,
  Save,
} from '@mui/icons-material';

interface SettingsSection {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const settingsSections: SettingsSection[] = [
  {
    title: 'Notifications',
    icon: <NotificationsActive />,
    description: 'Configure how you receive updates and alerts'
  },
  {
    title: 'Appearance',
    icon: <Palette />,
    description: 'Customize the look and feel of your dashboard'
  },
  {
    title: 'Accessibility',
    icon: <AccessibilityNew />,
    description: 'Adjust settings for better accessibility'
  },
  {
    title: 'Language & Region',
    icon: <Language />,
    description: 'Set your preferred language and regional settings'
  },
  {
    title: 'Privacy & Security',
    icon: <Security />,
    description: 'Manage your security preferences and data'
  }
];

export const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    theme: 'light',
    fontSize: 'medium',
    language: 'english',
    highContrast: false,
    autoSave: true,
    dataSharing: false,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
    });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    // In production, this would save to backend
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Settings
        </Typography>
        <Typography color="text.secondary">
          Customize your experience and manage your preferences
        </Typography>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Main Settings */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Notifications */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotificationsActive sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Notifications</Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Email Notifications"
                      secondary="Receive updates via email"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={handleChange('emailNotifications')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Push Notifications"
                      secondary="Receive instant updates in browser"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.pushNotifications}
                        onChange={handleChange('pushNotifications')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Palette sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Appearance</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Theme</InputLabel>
                      <Select
                        value={settings.theme}
                        label="Theme"
                        onChange={handleChange('theme') as any}
                      >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                        <MenuItem value="system">System</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Font Size</InputLabel>
                      <Select
                        value={settings.fontSize}
                        label="Font Size"
                        onChange={handleChange('fontSize') as any}
                      >
                        <MenuItem value="small">Small</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="large">Large</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Language & Region */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Language sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Language & Region</Typography>
                </Box>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={settings.language}
                    label="Language"
                    onChange={handleChange('language') as any}
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="spanish">Spanish</MenuItem>
                    <MenuItem value="french">French</MenuItem>
                    <MenuItem value="german">German</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Security sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Privacy & Security</Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Data Sharing"
                      secondary="Share anonymous usage data to help improve our services"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.dataSharing}
                        onChange={handleChange('dataSharing')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Auto-save"
                      secondary="Automatically save changes and progress"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.autoSave}
                        onChange={handleChange('autoSave')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Save />}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CloudDownload />}
                >
                  Export Settings
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<DeleteOutline />}
                >
                  Reset to Default
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;