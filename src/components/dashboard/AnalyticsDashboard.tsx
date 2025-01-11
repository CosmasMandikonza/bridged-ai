// src/components/dashboard/AnalyticsDashboard.tsx
import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  TimelineOutlined as TimelineIcon,
} from '@mui/icons-material';
import { useDocuments } from '@/hooks/useDocuments';
import { aiService } from '@/services/ai/aiService';

interface InsightSummary {
  progress: string[];
  recommendations: string[];
  goals: string[];
  keyAreas: { area: string; strength: number }[];
}

export const AnalyticsDashboard = () => {
  const { documents, loading: documentsLoading } = useDocuments();
  const [insights, setInsights] = useState<InsightSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateInsights = async () => {
      if (documentsLoading || !documents.length) return;
      
      try {
        setLoading(true);
        // In production, this would call actual AI analysis
        // For hackathon demo, using mock insights
        const mockInsights: InsightSummary = {
          progress: [
            'Significant improvement in reading comprehension over last 3 months',
            'Increased participation in group activities',
            'Better emotional regulation in challenging situations'
          ],
          recommendations: [
            'Consider incorporating more visual learning materials',
            'Schedule short breaks between intensive learning sessions',
            'Implement positive reinforcement strategies'
          ],
          goals: [
            'Achieve grade-level reading proficiency by end of term',
            'Develop stronger social interaction skills',
            'Master basic mathematical concepts'
          ],
          keyAreas: [
            { area: 'Reading', strength: 75 },
            { area: 'Social Skills', strength: 60 },
            { area: 'Mathematics', strength: 45 },
            { area: 'Communication', strength: 80 }
          ]
        };

        setInsights(mockInsights);
      } catch (err) {
        console.error('Failed to generate insights:', err);
        setError('Failed to generate insights. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    generateInsights();
  }, [documents, documentsLoading]);

  if (loading || documentsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!insights) {
    return (
      <Alert severity="info">
        Upload documents to see AI-powered insights and recommendations.
      </Alert>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Student Progress Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Progress Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Recent Progress</Typography>
              </Box>
              <List>
                {insights.progress.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">AI Recommendations</Typography>
              </Box>
              <List>
                {insights.recommendations.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Educational Goals */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Educational Goals</Typography>
              </Box>
              <List>
                {insights.goals.map((goal, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={goal} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Areas */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimelineIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Key Areas of Focus</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {insights.keyAreas.map((area, index) => (
                  <Chip
                    key={index}
                    label={`${area.area}: ${area.strength}%`}
                    color={area.strength >= 70 ? 'success' : area.strength >= 50 ? 'warning' : 'error'}
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};