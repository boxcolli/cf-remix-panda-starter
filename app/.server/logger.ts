import { Request } from '@cloudflare/workers-types'
import pino from 'pino'

const development = pino({
    level: 'trace',
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
        paths: [],
        remove: false,
    },
})

const preview = pino({
    level: 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
        paths: [],
        remove: true,
    },
})

const production = pino({
    level: 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
        paths: [
            '*.password',
            '*.passwordHash',
        ],
        remove: true,
    },
})

/**
 * logger.fatal('fatal')
 * logger.error('error')
 * logger.warn('warn')
 * logger.info('info')
 * logger.debug('debug')
 * logger.trace('trace')
 */
function getLogger(env: Env) {
    switch (env.WHICH_ENV) {
    case "development":        
        return development

    case "preview":
        return preview
    case "production":
    default:
        return production
    }
}

export function getLoaderLogger(env: Env, path: string) {
    // const logger = getLogger(env)
    // return logger.child({ path })

}

export function getActionLogger(env: Env, path: string) {
    const logger = getLogger(env)
    return logger.child({ path })
}

// Child logger
// 
// function getUser(userID) {
//     const childLogger = logger.child({ userID });
//     childLogger.trace('getUser called');
//     // retrieve user data and return it
//     childLogger.trace('getUser completed');
// }

// Error
//
// try {
//     alwaysThrowError();
// } catch (err) {
//     logger.error(err, 'An unexpected error occurred while processing the request');
// }
