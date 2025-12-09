import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'j87m344w',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Point CLI to the studio workspace
  studio: './workspaces/studio',
})
