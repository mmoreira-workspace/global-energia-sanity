import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './schemaTypes'
import {structure} from './deckStructure'

const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'global-energia',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'j87m344w',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: previewUrl,
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
