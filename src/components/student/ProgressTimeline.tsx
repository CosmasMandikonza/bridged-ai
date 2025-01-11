// src/components/student/ProgressTimeline.tsx
// src/components/student/ProgressTimeline.tsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  School as SchoolIcon,
  Psychology as PsychologyIcon,
  Groups as GroupsIcon,
  DirectionsRun as MotorIcon,
  Chat as ChatIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import type { ProgressEntry } from '@/types/student';

const getCategoryIcon = (category: ProgressEntry['category']) => {
  switch (category) {
    case 'academic':
      return <SchoolIcon />;
    case 'behavioral':
      return <PsychologyIcon />;
    case 'social':
      return <GroupsIcon />;
    case 'motor':
      return <MotorIcon />;
    case 'communication':
      return <ChatIcon />;
  }
};

const getCategoryColor = (category: ProgressEntry['category']) => {
  switch (category) {
    case 'academic':
      return 'primary';
    case 'behavioral':
      return 'secondary';
    case 'social':
      return 'success';
    case 'motor':
      return 'warning';
    case 'communication':
      return 'info';
  }
};

// Mock data
const mockEntries: ProgressEntry[] = [
  {
    id: '1',
    date: new Date('2024-01-05'),
    category: 'academic',
    description: 'Completed reading assessment with 85% accuracy',
    metrics: [
      { name: 'Reading Accuracy', value: 85, unit: '%' },
      { name: 'Words per Minute', value: 65, unit: 'wpm' },
    ],
  },
  {
    id: '2',
    date: new Date('2024-01-03'),
    category: 'social',
    description: 'Successfully participated in group activity for 30 minutes',
    metrics: [
      { name: 'Participation Duration', value: 30, unit: 'minutes' },
      { name: 'Peer Interactions', value: 12, unit: 'count' },
    ],
  },
  {
    id: '3',
    date: new Date('2024-01-01'),
    category: 'behavioral',
    description: 'Demonstrated improved focus during morning sessions',
    metrics: [
      { name: 'Focus Duration', value: 25, unit: 'minutes' },
      { name: 'Task Completion', value: 90, unit: '%' },
    ],
  },
];

export const ProgressTimeline = () => {
  const [entries, setEntries] = useState<ProgressEntry[]>(mockEntries);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<ProgressEntry>>({
    category: 'academic',
    date: new Date(),
  });

  const handleAddEntry = () => {
    if (newEntry.description && newEntry.category) {
      const entry: ProgressEntry = {
        id: Date.now().toString(),
        date: newEntry.date || new Date(),
        category: newEntry.category as ProgressEntry['category'],
        description: newEntry.description,
        metrics: newEntry.metrics || [],
      };

      setEntries([entry, ...entries]);
      setOpenDialog(false);
      setNewEntry({ category: 'academic', date: new Date() });
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Progress Timeline</Typography>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            variant="outlined"
          >
            Add Entry
          </Button>
        </Box>

        <Timeline position="alternate">
          {entries.map((entry) => (
            <TimelineItem key={entry.id}>
              <TimelineOppositeContent color="text.secondary">
                {entry.date.toLocaleDateString()}
              </TimelineOppositeContent>
              
              <TimelineSeparator>
                <TimelineDot color={getCategoryColor(entry.category)}>
                  {getCategoryIcon(entry.category)}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent>
                <Card variant="outlined">
                  <CardContent>
                    <Chip
                      label={entry.category}
                      color={getCategoryColor(entry.category)}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography>{entry.description}</Typography>
                    {entry.metrics && entry.metrics.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        {entry.metrics.map((metric, index) => (
                          <Typography
                            key={index}
                            variant="caption"
                            display="block"
                            color="text.secondary"
                          >
                            {metric.name}: {metric.value} {metric.unit}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        {/* Add Entry Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add Progress Entry</DialogTitle>
          <DialogContent>
            <TextField
              select
              margin="dense"
              label="Category"
              fullWidth
              value={newEntry.category || 'academic'}
              onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value as ProgressEntry['category'] })}
            >
              <MenuItem value="academic">Academic</MenuItem>
              <MenuItem value="behavioral">Behavioral</MenuItem>
              <MenuItem value="social">Social</MenuItem>
              <MenuItem value="motor">Motor</MenuItem>
              <MenuItem value="communication">Communication</MenuItem>
            </TextField>

            <TextField
              margin="dense"
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newEntry.date ? new Date(newEntry.date).toISOString().split('T')[0] : ''}
              onChange={(e) => setNewEntry({ ...newEntry, date: new Date(e.target.value) })}
            />

            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newEntry.description || ''}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleAddEntry} variant="contained">
              Add Entry
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};