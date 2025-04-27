import React from 'react';
import { Chip } from '@mui/material';
import {
  CardMembership as MembershipIcon,
  Work as WorkIcon,
  Whatshot as PremiumIcon
} from '@mui/icons-material';

export const MembershipBadge = ({ type }) => {
  const getBadgeProps = () => {
    switch (type) {
      case 'premium':
        return {
          icon: <PremiumIcon />,
          label: 'Premium',
          color: 'secondary',
          className: 'bg-purple-600'
        };
      case 'standard':
        return {
          icon: <MembershipIcon />,
          label: 'Standard',
          color: 'primary',
          className: 'bg-blue-600'
        };
      default:
        return {
          icon: <WorkIcon />,
          label: 'Free',
          color: 'default',
          className: 'bg-gray-200 text-gray-700'
        };
    }
  };

  const { icon, label, color, className } = getBadgeProps();
  
  return (
    <Chip
      icon={icon}
      label={label}
      color={color}
      size="medium"
      className={className}
    />
  );
};