// src/components/document/DocumentList.tsx
import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemSecondaryAction,
    IconButton,
    Chip,
    CircularProgress,
  } from '@mui/material';
  import {
    Description as DocumentIcon,
    Delete as DeleteIcon,
    Download as DownloadIcon,
  } from '@mui/icons-material';
  import { formatDistanceToNow } from 'date-fns';
  import { useDocuments } from '@/hooks/useDocuments';
  
  export const DocumentList = () => {
    const { 
      documents, 
      loading, 
      error, 
      downloadDocument, 
      deleteDocument 
    } = useDocuments();
  
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box p={2}>
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }
  
    const handleDownload = async (documentId: string) => {
      try {
        await downloadDocument(documentId);
      } catch (err) {
        console.error('Download failed:', err);
      }
    };
  
    const handleDelete = async (documentId: string) => {
      try {
        await deleteDocument(documentId);
      } catch (err) {
        console.error('Delete failed:', err);
      }
    };
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Documents
          </Typography>
          
          {documents.length === 0 ? (
            <Typography color="textSecondary">
              No documents uploaded yet.
            </Typography>
          ) : (
            <List>
              {documents.map((doc) => (
                <ListItem key={doc.id} divider>
                  <ListItemIcon>
                    <DocumentIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.title}
                    secondary={`Uploaded ${formatDistanceToNow(doc.uploadedAt)} ago`}
                  />
                  <Chip
                    label={doc.type}
                    size="small"
                    sx={{ mr: 2 }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      aria-label="download"
                      onClick={() => handleDownload(doc.id)}
                      sx={{ mr: 1 }}
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    );
  };