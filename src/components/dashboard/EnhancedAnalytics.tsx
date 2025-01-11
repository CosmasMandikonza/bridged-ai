// src/components/dashboard/EnhancedAnalytics.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';

// Your mockData objects here...
const mockProgressData = [
  { month: 'Jan', reading: 65, writing: 45, communication: 55 },
  { month: 'Feb', reading: 68, writing: 48, communication: 58 },
  { month: 'Mar', reading: 72, writing: 52, communication: 62 },
  { month: 'Apr', reading: 75, writing: 55, communication: 65 },
  { month: 'May', reading: 80, writing: 60, communication: 70 },
];

const mockGoalsData = [
  { name: 'Completed', value: 8, color: '#4CAF50' },
  { name: 'In Progress', value: 5, color: '#2196F3' },
  { name: 'Upcoming', value: 3, color: '#FFC107' },
];

const mockTeamMembers = [
  { id: 1, name: 'Sarah Wilson', role: 'Teacher', avatar: '/api/placeholder/40/40' },
  { id: 2, name: 'Mike Brown', role: 'Therapist', avatar: '/api/placeholder/40/40' },
  { id: 3, name: 'Jane Doe', role: 'Parent', avatar: '/api/placeholder/40/40' },
];

export const EnhancedAnalytics = () => {
  return (
    <Box sx={{ height: '100%', p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Student Progress Overview
            </Typography>
            <Typography color="text.secondary">
              Comprehensive analysis and insights for Alex's development
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ mr: 2 }}
            >
              Download Report
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Academic Growth</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                78%
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                +12% from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Add the rest of your Grid items here... */}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Progress Trends</Typography>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <Box sx={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={mockProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="reading" stroke="#2196F3" name="Reading" />
                    <Line type="monotone" dataKey="writing" stroke="#4CAF50" name="Writing" />
                    <Line type="monotone" dataKey="communication" stroke="#FF9800" name="Communication" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>Goals Distribution</Typography>
              <Box sx={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={mockGoalsData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockGoalsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                {mockGoalsData.map((item) => (
                  <Chip
                    key={item.name}
                    label={`${item.name}: ${item.value}`}
                    sx={{ bgcolor: item.color, color: 'white' }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Team Section */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>Team Collaboration</Typography>
          <Grid container spacing={3}>
            {mockTeamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={4} key={member.id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                  }}
                >
                  <Avatar
                    src={member.avatar}
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EnhancedAnalytics;