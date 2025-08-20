import React from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";
import DashboardCard from "../src/components/shared/DashboardCard";
import { baselightTheme } from "../src/theme/DefaultColors";

type InfoCardProps = {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  reff: string;
};

const InfoCard = ({ title, value, icon: Icon, color, reff }: InfoCardProps) => {
  return (
    <Box sx={{ flex: 1 }}>
      <DashboardCard>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Divider 
            orientation="vertical" 
            variant="fullWidth" 
            flexItem
            sx={{ 
              borderColor: color,
              borderWidth: '3px',
              borderRadius: '12px',
            }} 
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: '100%' }}>            
            <Stack direction="row" justifyContent="space-between" spacing={3} sx={{ position: 'relative' }}>
              <Typography fontSize={16} color={color} fontWeight={400}>
                {title}
              </Typography>
              <Typography fontSize={13} color='white' backgroundColor={color} fontWeight={600} border={1} borderRadius={2} paddingLeft='8px' paddingRight='8px'>
                {reff}
              </Typography>
              {/* <Icon
                size={32}
                style={{ 
                  position: 'absolute', 
                  right: 0, 
                  top: 0,    
                  color: baselightTheme.palette.grey[300],
                }}
              /> */}
            </Stack>
            <Typography variant="h5" fontWeight={[700]} color={baselightTheme.palette.text.primary}>
              {value}
            </Typography>
          </Box>
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default InfoCard;