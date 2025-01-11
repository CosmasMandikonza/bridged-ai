// src/components/reports/AIReportGenerator.tsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
  Chip,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  AutoAwesome,
  Download,
  Share,
  Edit,
  Delete,
  Add,
  FormatListBulleted,
  Description,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';

const reportTypes = [
  { id: 'progress', label: 'Progress Report', icon: <AutoAwesome />, color: '#2196F3' },
  { id: 'assessment', label: 'Assessment Summary', icon: <FormatListBulleted />, color: '#4CAF50' },
  { id: 'plan', label: 'Education Plan', icon: <Description />, color: '#FF9800' },
];

const mockReports = [
  {
    id: '1',
    title: 'Monthly Progress Report - January 2024',
    type: 'progress',
    date: '2024-01-15',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Initial Assessment Summary',
    type: 'assessment',
    date: '2024-01-10',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Individual Education Plan Q1 2024',
    type: 'plan',
    date: '2024-01-05',
    status: 'draft',
  },
];

export const AIReportGenerator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [generating, setGenerating] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [reportData, setReportData] = useState({
    title: '',
    dateRange: '',
    notes: '',
  });

  const steps = [
    'Select Report Type',
    'Configure Parameters',
    'Generate Report',
  ];

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGenerating(false);
    setOpenPreview(true);
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {reportTypes.map((type) => (
              <Grid item xs={12} sm={4} key={type.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: selectedType === type.id ? `2px solid ${type.color}` : 'none',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s',
                    },
                  }}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        color: type.color,
                      }}
                    >
                      {type.icon}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {type.label}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      AI-powered {type.label.toLowerCase()} with detailed analysis and recommendations
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );

      case 1:
        return (
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Report Title"
              variant="outlined"
              value={reportData.title}
              onChange={(e) => setReportData({ ...reportData, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Date Range"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={reportData.dateRange}
              onChange={(e) => setReportData({ ...reportData, dateRange: e.target.value })}
            />
            <TextField
              fullWidth
              label="Additional Notes"
              multiline
              rows={4}
              variant="outlined"
              value={reportData.notes}
              onChange={(e) => setReportData({ ...reportData, notes: e.target.value })}
            />
          </Stack>
        );

      case 2:
        return generating ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <AutoAwesome sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Generating AI Report...
            </Typography>
            <LinearProgress sx={{ mx: 'auto', maxWidth: 400, mb: 2 }} />
            <Typography color="text.secondary">
              Our AI is analyzing data and generating insights
            </Typography>
          </Box>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AutoAwesome />}
              onClick={handleGenerate}
            >
              Generate Report
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          AI Report Generator
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Create comprehensive reports powered by AI analysis
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4, mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleGenerate : handleNext}
            endIcon={activeStep === steps.length - 1 ? <AutoAwesome /> : <ArrowForward />}
            disabled={
              (activeStep === 0 && !selectedType) ||
              (activeStep === 1 && (!reportData.title || !reportData.dateRange))
            }
          >
            {activeStep === steps.length - 1 ? 'Generate' : 'Next'}
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Recent Reports
      </Typography>

      <Grid container spacing={3}>
        {mockReports.map((report) => (
          <Grid item xs={12} md={4} key={report.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {report.date}
                  </Typography>
                  <Chip
                    label={report.status}
                    color={report.status === 'completed' ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {report.title}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <IconButton size="small">
                    <Download />
                  </IconButton>
                  <IconButton size="small">
                    <Share />
                  </IconButton>
                  <IconButton size="small">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openPreview}
        onClose={() => setOpenPreview(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Report Preview
            <IconButton onClick={() => setOpenPreview(false)} size="small">
              <Delete />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            {reportData.title}
          </Typography>
          <Typography paragraph>
            Generated report content will appear here...
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPreview(false)}>Close</Button>
          <Button variant="contained" startIcon={<Download />}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};