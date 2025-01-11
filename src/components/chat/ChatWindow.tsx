// src/components/chat/ChatWindow.tsx
import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Chip,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Close as CloseIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { chatService, type ChatThread, type ChatMessage } from '@/services/chat/chatService';
import { useAuth } from '@/context/AuthContext';

export const ChatWindow = () => {
  const { user } = useAuth();
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [newThreadDialogOpen, setNewThreadDialogOpen] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = chatService.subscribe(setThreads);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threads, selectedThread]);

  const handleSendMessage = async () => {
    if (!selectedThread || !message.trim() || !user) return;

    await chatService.sendMessage(selectedThread, {
      senderId: user.id,
      senderName: user.name,
      content: message.trim(),
    });

    setMessage('');
  };

  const handleCreateThread = async () => {
    if (!newThreadTitle.trim() || !user) return;

    const threadId = await chatService.createThread(
      [{ userId: user.id, name: user.name, role: user.role }],
      newThreadTitle.trim()
    );

    setNewThreadTitle('');
    setNewThreadDialogOpen(false);
    setSelectedThread(threadId);
  };

  const currentThread = threads.find(t => t.id === selectedThread);

  return (
    <Paper sx={{ height: '600px', display: 'flex' }}>
      {/* Thread List */}
      <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNewThreadDialogOpen(true)}
          >
            New Discussion
          </Button>
        </Box>
        <List sx={{ overflow: 'auto', maxHeight: 'calc(100% - 64px)' }}>
          {threads.map((thread) => (
            <ListItem
              key={thread.id}
              button
              selected={thread.id === selectedThread}
              onClick={() => setSelectedThread(thread.id)}
            >
              <ListItemText
                primary={thread.title}
                secondary={`${thread.participants.length} participants • ${new Date(thread.lastActivity).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedThread && currentThread ? (
          <>
            {/* Chat Header */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">{currentThread.title}</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                {currentThread.participants.map((participant) => (
                  <Chip
                    key={participant.userId}
                    label={`${participant.name} (${participant.role})`}
                    size="small"
                  />
                ))}
              </Stack>
            </Box>

            {/* Messages */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              {currentThread.messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    mb: 2,
                    flexDirection: msg.senderId === user?.id ? 'row-reverse' : 'row',
                  }}
                >
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {msg.senderName[0]}
                  </Avatar>
                  <Box
                    sx={{
                      maxWidth: '70%',
                      bgcolor: msg.senderId === user?.id ? 'primary.light' : 'grey.100',
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color={msg.senderId === user?.id ? 'white' : 'text.primary'}
                    >
                      {msg.senderName}
                    </Typography>
                    <Typography
                      color={msg.senderId === user?.id ? 'white' : 'text.primary'}
                    >
                      {msg.content}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={msg.senderId === user?.id ? 'white' : 'text.secondary'}
                    >
                      {new Date(msg.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Stack direction="row" spacing={1}>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
                <TextField
                  fullWidth
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <SendIcon />
                </IconButton>
              </Stack>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography color="text.secondary">
              Select a discussion or create a new one
            </Typography>
          </Box>
        )}
      </Box>

      {/* New Thread Dialog */}
      <Dialog
        open={newThreadDialogOpen}
        onClose={() => setNewThreadDialogOpen(false)}
      >
        <DialogTitle>New Discussion</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Discussion Title"
            fullWidth
            value={newThreadTitle}
            onChange={(e) => setNewThreadTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewThreadDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateThread} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};