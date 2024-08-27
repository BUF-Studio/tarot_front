"use client"
import IconButton from "@mui/material/IconButton";
import React from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useRouter } from 'next/navigation'

const BackIcon = () => {
    const router = useRouter()
  return (
    <IconButton
    aria-label="Go to home"
    edge="end"
  >
    <ArrowBackRoundedIcon />
  </IconButton>
  )
}

export default BackIcon