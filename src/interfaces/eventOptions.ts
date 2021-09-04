import { CustomBot } from './customBot'

export interface execute {
    (bot: CustomBot, logger: any, ...args: any): void
}

export interface EventOptions {
    name: any
    once?: boolean
    execute: execute
}
