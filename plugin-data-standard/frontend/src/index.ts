import { defineComponent, h } from 'vue'
import type { ToolboxAPI } from '@toolbox/frontend-sdk'
import DataStandardView from './DataStandardView.vue'

export function createView(api: ToolboxAPI, toolId: string) {
  return defineComponent({
    render() {
      return h(DataStandardView, { api, toolId })
    }
  })
}
