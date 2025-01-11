// src/components/student/StudentProfile.tsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import type { Student, EducationalGoal, Accommodation } from '@/types/student';

// Mock data for demonstration
const mockStudent: Student = {
  id: '1',
  name: 'Alex Johnson',
  dateOfBirth: new Date('2015-05-15'),
  grade: '3rd Grade',
  primaryDiagnosis: 'ADHD',
  accommodations: [
    {
      id: '1',
      type: 'environmental',
      description: 'Preferential seating near teacher',
      implementationDate: new Date('2023-09-01'),
    },
    {
      id: '2',
      type: 'instructional',
      description: 'Extended time for assignments',
      implementationDate: new Date('2023-09-01'),
    },
  ],
  goals: [
    {
      id: '1',
      title: 'Reading Comprehension',
      description: 'Improve reading comprehension to grade level',
      status: 'in-progress',
      targetDate: new Date('2024-06-30'),
      progress: 65,
    },
    {
      id: '2',
      title: 'Social Skills',
      description: 'Develop peer interaction skills',
      status: 'in-progress',
      targetDate: new Date('2024-06-30'),
      progress: 40,
    },
  ],
  teamMembers: [
    { role: 'Teacher', name: 'Sarah Wilson', email: 'swilson@school.edu' },
    { role: 'Speech Therapist', name: 'Mike Brown', email: 'mbrown@school.edu' },
  ],
};

export const StudentProfile = () => {
  const [student, setStudent] = useState<Student>(mockStudent);
  const [openGoalDialog, setOpenGoalDialog] = useState(false);
  const [openAccommodationDialog, setOpenAccommodationDialog] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<EducationalGoal>>({});
  const [newAccommodation, setNewAccommodation] = useState<Partial<Accommodation>>({});

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.description) {
      const goal: EducationalGoal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        status: 'not-started',
        targetDate: new Date(newGoal.targetDate || Date.now()),
        progress: 0,
      };
      setStudent(prev => ({
        ...prev,
        goals: [...prev.goals, goal],
      }));
      setOpenGoalDialog(false);
      setNewGoal({});
    }
  };

  const handleAddAccommodation = () => {
    if (newAccommodation.type && newAccommodation.description) {
      const accommodation: Accommodation = {
        id: Date.now().toString(),
        type: newAccommodation.type as any,
        description: newAccommodation.description,
        implementationDate: new Date(),
      };
      setStudent(prev => ({
        ...prev,
        accommodations: [...prev.accommodations, accommodation],
      }));
      setOpenAccommodationDialog(false);
      setNewAccommodation({});
    }
  };

  return (
    <Box>
      {/* Basic Information */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {student.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Grade: {student.grade}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                DOB: {student.dateOfBirth.toLocaleDateString()}
              </Typography>
              {student.primaryDiagnosis && (
                <Typography color="textSecondary">
                  Primary Diagnosis: {student.primaryDiagnosis}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Team Members
              </Typography>
              <List dense>
                {student.teamMembers.map((member, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={member.name}
                      secondary={`${member.role} - ${member.email}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Educational Goals */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Educational Goals</Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={() => setOpenGoalDialog(true)}
              variant="outlined"
              size="small"
            >
              Add Goal
            </Button>
          </Box>
          <Grid container spacing={2}>
            {student.goals.map((goal) => (
              <Grid item xs={12} key={goal.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1">{goal.title}</Typography>
                      <Chip
                        label={goal.status}
                        color={
                          goal.status === 'completed'
                            ? 'success'
                            : goal.status === 'in-progress'
                            ? 'primary'
                            : 'default'
                        }
                        size="small"
                      />
                    </Box>
                    <Typography color="textSecondary" gutterBottom>
                      {goal.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress variant="determinate" value={goal.progress} />
                      <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                        Progress: {goal.progress}%
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Accommodations */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Accommodations</Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={() => setOpenAccommodationDialog(true)}
              variant="outlined"
              size="small"
            >
              Add Accommodation
            </Button>
          </Box>
          <Grid container spacing={2}>
            {student.accommodations.map((accommodation) => (
              <Grid item xs={12} sm={6} key={accommodation.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Chip
                      label={accommodation.type}
                      color="primary"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography>{accommodation.description}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      Implemented: {accommodation.implementationDate.toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Add Goal Dialog */}
      <Dialog open={openGoalDialog} onClose={() => setOpenGoalDialog(false)}>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Goal Title"
            fullWidth
            value={newGoal.title || ''}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newGoal.description || ''}
            onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Target Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newGoal.targetDate || ''}
            onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGoalDialog(false)}>Cancel</Button>
          <Button onClick={handleAddGoal} variant="contained">
            Add Goal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Accommodation Dialog */}
      <Dialog open={openAccommodationDialog} onClose={() => setOpenAccommodationDialog(false)}>
        <DialogTitle>Add New Accommodation</DialogTitle>
        <DialogContent>
          <TextField
            select
            margin="dense"
            label="Type"
            fullWidth
            value={newAccommodation.type || ''}
            onChange={(e) => setNewAccommodation({ ...newAccommodation, type: e.target.value as any })}
          >
            <MenuItem value="environmental">Environmental</MenuItem>
            <MenuItem value="instructional">Instructional</MenuItem>
            <MenuItem value="testing">Testing</MenuItem>
            <MenuItem value="behavioral">Behavioral</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newAccommodation.description || ''}
            onChange={(e) => setNewAccommodation({ ...newAccommodation, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAccommodationDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAccommodation} variant="contained">
            Add Accommodation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};