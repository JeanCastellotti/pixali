import env from '#start/env'
import edge from 'edge.js'

edge.global('env', (key: string) => env.get(key))
