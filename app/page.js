'use client'
 
import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '../actions/notification/notification'
 
export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
 
  console.log('base64:', base64)

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function HomePage() {
  return <h1>Welcome to AttendMe</h1>
}