import { Box, Chip, Divider, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { InfoContext } from "./InfoContext";

export default function ModalInfo() {
  const {current}=useContext(InfoContext);
  console.log(current);
    const locationText = current?.location ? `${current.location.i}, ${current.location.j}` : 'Unknown';
const statusText = current?.status === 1 ? 'Success' : 'Failure';
  const statusColor = current?.status === 1 ? 'success' : 'error';
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        position: 'absolute', 
        top: 10, 
        left: "-360px", 
        width: 280, 
        padding: 2,
        zIndex: 1000,
        opacity: 0.9
      }}
    >
      <Typography variant="h6" gutterBottom>
        Tile Information
      </Typography>
      <Divider sx={{ mb: 1 }} />
      
      <List dense>
        <ListItem>
          <ListItemText 
            primary="Type" 
            secondary={current?.type || 'N/A'} 
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Elevation" 
            secondary={current?.elevation !== undefined ? current?.elevation.toFixed(4) : 'N/A'} 
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Distance to Obstacle" 
            secondary={current?.distanceToObstacle !== undefined ? current?.distanceToObstacle?.toFixed(4) : 'N/A'} 
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Location" 
            secondary={locationText} 
          />
        </ListItem>
      </List>
      
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <Chip 
          label={`Test: ${current?.isTest ? 'Yes' : 'No'}`} 
          size="small" 
          color={current?.isTest ? 'info' : 'default'} 
          variant="outlined"
        />
        <Chip 
          label={`On Path: ${current?.onPath ? 'Yes' : 'No'}`} 
          size="small" 
          color={current?.onPath ? 'primary' : 'default'} 
          variant="outlined"
        />
        <Chip 
          label={statusText} 
          size="small" 
          color={statusColor} 
        />
      </Box>
    </Paper>
  )
}




