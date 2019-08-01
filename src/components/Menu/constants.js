import React from 'react';
import FaceIcon from '@material-ui/icons/Face';
import PetsIcon from '@material-ui/icons/Pets';
import MovieIcon from '@material-ui/icons/Movie';
import FlightIcon from '@material-ui/icons/Flight';
import PublicIcon from '@material-ui/icons/Public';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';

export const menuItems = [
  { label: 'Films', icon: <MovieIcon />, link: '/films' },
  { label: 'Characters', icon: <FaceIcon />, link: '/characters' },
  { label: 'Species', icon: <PetsIcon />, link: '/species' },
  { label: 'Planets', icon: <PublicIcon />, link: '/planets' },
  { label: 'Vehicles', icon: <MotorcycleIcon />, link: '/vehicles' },
  { label: 'Starships', icon: <FlightIcon />, link: '/starships' },
];
