// src/components/document/DocumentUpload.tsx
import { useRef, useState } from 'react';
import { 
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Alert,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import { useUpload } from '@/hooks/useUpload';
import { useDocuments } from '@/hooks/useDocuments';
import { aiService } from '@/services/ai/aiService';
import type { DocumentType } from '@/types/document';

export const DocumentUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<DocumentType>('report');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [processingAI, setProcessingAI] = useState(false);
  const { uploadDocument, uploading, progress, error } = useUpload();
  const { refreshDocuments } = useDocuments();

  const validateForm = (): boolean => {
    if (!title.trim()) {
      setValidationError('Document title is required');
      return false;
    }
    if (!selectedFile) {
      setValidationError('Please select a file to upload');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const extractTextFromFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          resolve(text);
        } else {
          reject(new Error('Failed to extract text from file'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setValidationError('File size must be less than 10MB');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Validate file type
    const validTypes = ['.txt', '.doc', '.docx', '.pdf'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!validTypes.includes(fileExtension)) {
      setValidationError('Invalid file type. Please upload a .txt, .doc, .docx, or .pdf file.');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setSelectedFile(file);
    // Auto-fill title if empty
    if (!title) {
      setTitle(file.name.split('.')[0].replace(/[_-]/g, ' '));
    }
    setValidationError(null);
  };

  const handleUpload = async () => {
    if (!validateForm()) return;
    if (!selectedFile) return;

    try {
      // Upload document
      const result = await uploadDocument({
        file: selectedFile,
        title: title.trim(),
        type: type
      });

      if (result.success) {
        setProcessingAI(true);
        
        try {
          // Extract text from document
          const text = await extractTextFromFile(selectedFile);
          
          // Process document for RAG
          await aiService.storeDocumentEmbedding(result.documentId, text);
          
          // Clear form
          setTitle('');
          setType('report');
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          
          // Refresh document list
          await refreshDocuments();
        } catch (aiError) {
          console.error('AI processing failed:', aiError);
          // Don't show this error to user since the upload succeeded
        } finally {
          setProcessingAI(false);
        }
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setValidationError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload Document
        </Typography>

        {(error || validationError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || validationError}
          </Alert>
        )}

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Document Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setValidationError(null);
            }}
            disabled={uploading || processingAI}
            required
            error={!title.trim() && Boolean(validationError)}
            helperText={!title.trim() && validationError ? 'Title is required' : ''}
          />

          <FormControl required error={!type && Boolean(validationError)}>
            <InputLabel>Document Type</InputLabel>
            <Select
              value={type}
              label="Document Type"
              onChange={(e) => {
                setType(e.target.value as DocumentType);
                setValidationError(null);
              }}
              disabled={uploading || processingAI}
            >
              <MenuItem value="report">Report</MenuItem>
              <MenuItem value="plan">Educational Plan</MenuItem>
              <MenuItem value="assessment">Assessment</MenuItem>
              <MenuItem value="note">Progress Note</MenuItem>
            </Select>
          </FormControl>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || processingAI}
              startIcon={<UploadIcon />}
            >
              Select File
            </Button>
            {selectedFile && (
              <Typography variant="body2" color="text.secondary">
                {selectedFile.name}
              </Typography>
            )}
          </Box>

          {selectedFile && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={uploading || processingAI || !title.trim()}
            >
              {uploading ? 'Uploading...' : processingAI ? 'Processing...' : 'Upload Document'}
            </Button>
          )}

          {(uploading || processingAI) && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress 
                variant="determinate" 
                value={processingAI ? 100 : progress} 
              />
              <Typography variant="body2" color="text.secondary" align="center">
                {processingAI ? 'Processing document...' : `${progress}% uploaded`}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};