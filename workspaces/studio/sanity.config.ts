import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './deckStructure'

export default defineConfig({
  name: 'default',
  title: 'global-energia',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'j87m344w',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
