import { client } from "./client";
import { ClientHandler } from './handler'

client.on('ready', () => console.log('Rodando...'))

const clientHandler = new ClientHandler(client)
clientHandler.execute()