// src/features/landing/Landing.tsx
import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  useTheme,
  Chip,
  Avatar,
  Paper,
  ChipProps,
  SxProps,
  Theme
} from '@mui/material';
import {
  Psychology,
  AutoAwesome,
  Groups,
  Analytics,
  School,
  Star,
  AssistantPhoto,
  SupervisorAccount,
  RecordVoiceOver,
} from '@mui/icons-material';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlightText: string;
  color: string;
}

interface ImpactArea {
  title: string;
  icon: React.ReactNode;
  points: string[];
}

export const Landing = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const innovations: Feature[] = [
    {
      icon: <Psychology fontSize="large" />,
      title: 'AI-Driven Personalization',
      description: "Our AI analyzes each student's learning patterns to create truly personalized education plans.",
      highlightText: 'Adapts in real-time',
      color: '#2196F3'
    },
    {
      icon: <Analytics fontSize="large" />,
      title: 'Behavioral Analytics',
      description: 'Advanced tracking of social, emotional, and academic progress with actionable insights.',
      highlightText: 'Evidence-based approach',
      color: '#4CAF50'
    },
    {
      icon: <Groups fontSize="large" />,
      title: 'Unified Team Collaboration',
      description: 'Connect parents, teachers, and therapists in one seamless platform for holistic support.',
      highlightText: 'Real-time communication',
      color: '#FF9800'
    },
    {
      icon: <AutoAwesome fontSize="large" />,
      title: 'Smart Goal Tracking',
      description: "AI-powered goal setting and tracking system that adapts to each student's progress.",
      highlightText: 'Dynamic adjustments',
      color: '#9C27B0'
    }
  ];

  const impactAreas: ImpactArea[] = [
    {
      title: 'For Teachers',
      icon: <School />,
      points: [
        'Reduced administrative burden',
        'Data-driven teaching insights',
        'Customizable lesson planning'
      ],
    },
    {
      title: 'For Parents',
      icon: <SupervisorAccount />,
      points: [
        'Real-time progress tracking',
        'Direct communication channel',
        'Home activity suggestions'
      ],
    },
    {
      title: 'For Therapists',
      icon: <RecordVoiceOver />,
      points: [
        'Integrated progress notes',
        'Collaborative goal setting',
        'Treatment plan tracking'
      ],
    },
  ];

  const heroChipStyles: SxProps<Theme> = {
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: '12px',
    paddingBottom: '12px',
    fontSize: '1rem',
    borderRadius: '20px',
    bgcolor: theme => theme.palette.secondary.main,
    '& .MuiChip-icon': {
      marginLeft: 1,
    },
  };

  const gradientText: SxProps<Theme> = {
    background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme => `linear-gradient(135deg, 
            ${theme.palette.primary.dark} 0%, 
            ${theme.palette.primary.main} 50%,
            ${theme.palette.secondary.dark} 100%)`,
          color: 'white',
          pt: { xs: 12, md: 20 },
          pb: { xs: 12, md: 20 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Stack spacing={3} alignItems="flex-start">
                  <Chip
                    label="Revolutionary Special Education Platform"
                    color="secondary"
                    size="medium"
                    icon={<Star />}
                    sx={heroChipStyles}
                  />
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                      fontWeight: 800,
                      lineHeight: 1.2,
                      letterSpacing: '-0.02em',
                      ...gradientText,
                    }}
                  >
                    Revolutionizing
                    <br />
                    Special Education
                    <br />
                    with AI
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                      fontWeight: 400,
                      color: 'rgba(255, 255, 255, 0.9)',
                      maxWidth: 600,
                      lineHeight: 1.6,
                    }}
                  >
                    BridgeEd AI seamlessly connects educators, parents, and therapists,
                    creating a collaborative ecosystem that transforms how we approach
                    special education.
                  </Typography>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{ width: '100%' }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => navigate('/signup')}
                      sx={{
                        py: 2,
                        px: 4,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        borderRadius: '30px',
                        background: 'linear-gradient(45deg, #9c27b0 30%, #d81b60 90%)',
                        boxShadow: '0 8px 25px rgba(156, 39, 176, 0.3)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 30px rgba(156, 39, 176, 0.4)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Transform Your Teaching
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => window.open('https://www.loom.com/share/ff40c062203d401e90d3c58c67b8ffd3?sid=44e695be-89ce-42b7-a0c4-e157a9a5f119', '_blank', 'noopener,noreferrer')}
                      sx={{
                        py: 2,
                        px: 4,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        borderRadius: '30px',
                        borderColor: 'white',
                        color: 'white',
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          borderWidth: 2,
                        },
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Innovation Showcase */}
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          {innovations.map((feature, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '20px',
                      bgcolor: `${feature.color}1a`,
                      color: feature.color,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {feature.description}
                  </Typography>
                  <Chip
                    label={feature.highlightText}
                    size="small"
                    sx={{
                      bgcolor: `${feature.color}1a`,
                      color: feature.color,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Impact Section */}
      <Box
        sx={{
          bgcolor: theme => theme.palette.primary.main + '0a',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    ...gradientText,
                  }}
                >
                  Making a Real Difference
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                  Our platform creates meaningful impact across the entire special education ecosystem
                </Typography>
                {impactAreas.map((area, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: theme => theme.palette.primary.main,
                          width: 48,
                          height: 48,
                        }}
                      >
                        {area.icon}
                      </Avatar>
                      <Typography variant="h6">{area.title}</Typography>
                    </Stack>
                    <Stack spacing={1}>
                      {area.points.map((point, i) => (
                        <Stack key={i} direction="row" spacing={1} alignItems="center">
                          <AssistantPhoto color="primary" />
                          <Typography>{point}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Paper>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: theme => `linear-gradient(135deg, 
            ${theme.palette.primary.dark} 0%, 
            ${theme.palette.primary.main} 50%,
            ${theme.palette.secondary.dark} 100%)`,
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 3,
              ...gradientText,
            }}
          >
            Join the Future of Special Education
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Experience how AI-powered collaboration can transform your approach to special education
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/signup')}
            sx={{
              py: 2,
              px: 6,
              fontSize: '1.2rem',
              textTransform: 'none',
              borderRadius: '30px',
              background: 'linear-gradient(45deg, #9c27b0 30%, #d81b60 90%)',
              boxShadow: '0 8px 25px rgba(156, 39, 176, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 30px rgba(156, 39, 176, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Start Your Journey
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;