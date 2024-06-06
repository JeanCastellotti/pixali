import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'app',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.session?.flashMessages.get('errors'),
    authenticated: (ctx) =>
      ctx.auth.user && {
        username: ctx.auth.user.username,
        avatar: ctx.auth.user.avatar,
        verified: !!ctx.auth.user.emailVerified,
      },
    flash: (ctx) => ({
      success: ctx.session.flashMessages.get('success') as string | undefined,
      error: ctx.session.flashMessages.get('error') as string | undefined,
      info: ctx.session.flashMessages.get('info') as string | undefined,
    }),
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
