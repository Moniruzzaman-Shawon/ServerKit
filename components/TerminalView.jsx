'use client'
import { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import { io } from 'socket.io-client'
import '@xterm/xterm/css/xterm.css'

export default function TerminalView() {
  const containerRef = useRef(null)
  const termRef = useRef(null)
  const socketRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const term = new Terminal({
      theme: {
        background:  '#010409',
        foreground:  '#e6edf3',
        cursor:      '#f97316',
        cursorAccent:'#0d1117',
        black:       '#0d1117',
        red:         '#f85149',
        green:       '#56d364',
        yellow:      '#d29922',
        blue:        '#388bfd',
        magenta:     '#bc8cff',
        cyan:        '#39d353',
        white:       '#8b949e',
        brightBlack: '#6e7681',
        brightWhite: '#e6edf3',
      },
      fontFamily: '"Geist Mono", "Cascadia Code", monospace',
      fontSize: 13,
      lineHeight: 1.55,
      cursorBlink: true,
      allowTransparency: true,
    })

    const fit = new FitAddon()
    const links = new WebLinksAddon()
    term.loadAddon(fit)
    term.loadAddon(links)
    term.open(containerRef.current)
    fit.fit()
    termRef.current = term

    const socket = io('/terminal')
    socketRef.current = socket

    socket.on('connect', () => {
      term.write('\x1b[32mConnected\x1b[0m to ServerKit terminal\r\n\r\n')
    })

    socket.on('data', data => term.write(data))

    socket.on('disconnect', () => {
      term.write('\r\n\x1b[31mDisconnected\x1b[0m\r\n')
    })

    term.onData(data => socket.emit('input', data))

    const observer = new ResizeObserver(() => {
      fit.fit()
      socket.emit('resize', { cols: term.cols, rows: term.rows })
    })
    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
      socket.disconnect()
      term.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: '#010409' }}
    />
  )
}
