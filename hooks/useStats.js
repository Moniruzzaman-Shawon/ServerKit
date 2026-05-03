'use client'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const HIST = 20

export function useStats() {
  const [stats, setStats] = useState(null)
  const [history, setHistory] = useState({
    cpu: Array(HIST).fill(0),
    ram: Array(HIST).fill(0),
  })
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const socket = io('/stats')
    socket.on('connect',    () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))

    socket.on('stats', data => {
      setStats(data)
      setHistory(prev => ({
        cpu: [...prev.cpu.slice(-(HIST - 1)), data.cpu.load],
        ram: [...prev.ram.slice(-(HIST - 1)), data.ram.pct],
      }))
    })

    return () => socket.disconnect()
  }, [])

  return { stats, history, connected }
}
