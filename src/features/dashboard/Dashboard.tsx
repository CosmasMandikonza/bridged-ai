// src/features/dashboard/Dashboard.tsx
import { useState } from 'react';
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { 
    Box, 
    CircularProgress, 
    Typography,
    Container
} from '@mui/material';
import { DocumentUpload } from '../../components/document/DocumentUpload';
import { DocumentList } from '../../components/document/DocumentList';
import { EnhancedAnalytics } from '../../components/dashboard/EnhancedAnalytics';
import { StudentProfile } from '../../components/student/StudentProfile';
import { ProgressTimeline } from '../../components/student/ProgressTimeline';
import { ChatWindow } from '../../components/chat/ChatWindow';
import { AIReportGenerator } from '../../components/reports/AIReportGenerator';
import { Settings } from '../../components/settings/Settings';
import { Route, Routes } from 'react-router-dom';

const ErrorComponent = ({error}: {error: any}) => {
    return <Typography color="error">An error occurred: {error.message}</Typography>;
};

const LoadingComponent = () => {
    return <CircularProgress />;
};

export const Dashboard = () => {
    const authRequest = {
        scopes: ["openid", "profile"]
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Popup}
            authenticationRequest={authRequest}
            errorComponent={ErrorComponent}
            loadingComponent={LoadingComponent}
        >
            <Box>
                <Routes>
                    <Route path="/" element={<EnhancedAnalytics />} />
                    <Route path="/profile" element={<StudentProfile />} />
                    <Route path="/progress" element={<ProgressTimeline />} />
                    <Route path="/chat" element={<ChatWindow />} />
                    <Route path="/documents" element={<DocumentList />} />
                    <Route path="/upload" element={<DocumentUpload />} />
                    <Route path="/reports" element={<AIReportGenerator />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Box>
        </MsalAuthenticationTemplate>
    );
};