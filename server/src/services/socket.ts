import http from 'http'
import socket, { Server } from 'socket.io'

export let io: Server

export const initSocket = (server: http.Server): void => {
    io = socket(server)
}
